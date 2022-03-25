import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionTableComponent } from './transaction-table.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EMPTY, of, Subject } from 'rxjs';
import { TransactionsService } from '../../../services/transactions/transactions.service';
import { Transaction } from '../../../shared/Transaction';

describe('[TransactionTableComponent] Testing Suite', () => {
  let component: TransactionTableComponent;
  let fixture: ComponentFixture<TransactionTableComponent>;
  let transactionListMock = [
    {
      id: 1337,
      type: 'type',
      date: new Date('2022-06-22'),
      value: 100,
      cashflow: 100,
      security: 'CSAR',
      shares: 50,
    },
    {
      id: 1337,
      type: 'type',
      date: new Date('2022-06-22'),
      value: 100,
      cashflow: -500,
      security: 'CSAR',
      shares: 50,
    },
  ];
  const transactionServiceMock = {
    getTransactions$: () => of({ transactionListMock }),
    transactionSubject: new Subject<Transaction>(),
    deleteTransaction$: () => EMPTY,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionTableComponent],
      providers: [{ provide: TransactionsService, useValue: transactionServiceMock }],
      imports: [HttpClientTestingModule],
    }).compileComponents();
    TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('[HydrateTransactionsTable] should populate transactions variable with returned values from API', () => {
    expect(component.transactions).toEqual(transactionListMock);
  });

  it('[EditTransaction] should call transactionSubject with selected transaction state', () => {
    const spy = spyOn(transactionServiceMock.transactionSubject, 'next');
    component.editTransaction(transactionListMock[0]);
    expect(spy).toHaveBeenCalledWith(transactionListMock[0]);
  });

  it('[DeleteTransaction] should call the transactionService deleteTransaction method', () => {
    const spy = spyOn(transactionServiceMock, 'deleteTransaction$').and.returnValue(EMPTY);
    component.deleteTransaction(transactionListMock[0]);
    expect(spy).toHaveBeenCalled();
  });

  it('[CashFlowCumulativeTotal] should calculate total cashflow', () => {
    expect(component.transactionsCashFlowTotal).toEqual(-400);
  });
});
