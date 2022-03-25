import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsComponent } from './transactions.component';
import { TransactionAdderComponent } from './transaction-adder/transaction-adder.component';
import { TransactionTableComponent } from './transaction-table/transaction-table.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

xdescribe('TransactionsComponent', () => {
  let component: TransactionsComponent;
  let fixture: ComponentFixture<TransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionsComponent, TransactionAdderComponent, TransactionTableComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();
    TestBed.inject(HttpClientTestingModule);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
