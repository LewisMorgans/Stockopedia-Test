import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionAdderComponent } from './transaction-adder.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TransactionsService } from '../../../services/transactions/transactions.service';
import { Transaction } from '../../../shared/Transaction';
import { EMPTY, of, Subject } from 'rxjs';

describe('[TransactionAdderComponent] Testing suite', () => {
  let component: TransactionAdderComponent;
  let fixture: ComponentFixture<TransactionAdderComponent>;

  let mockTransactionService = {
    transactionSubject: new Subject<Transaction>(),
    updateTransaction$: (formValue: any) => of(EMPTY),
  };

  const mockFormBuilder = new FormBuilder();
  let mockForm = new FormGroup({});

  const dummyData = {
    id: 1337,
    type: 'type',
    date: new Date('2022-06-22'),
    value: 100,
    cashflow: 100,
    security: 'CSAR',
    shares: 50,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionAdderComponent],
      providers: [FormBuilder, { provide: TransactionsService, useValue: mockTransactionService }],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
    }).compileComponents();

    TestBed.inject(HttpTestingController);

    mockForm = mockFormBuilder.group({
      cashflow: new FormControl(),
      date: new FormControl(),
      id: new FormControl(),
      security: new FormControl(),
      type: new FormControl(),
      value: new FormControl(),
      shares: new FormControl(),
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionAdderComponent);
    component = fixture.componentInstance;
    component.formData = mockForm;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('[HydrateForm] Should build the form group instance with empty formcontrol values matching data model', () => {
    component.ngOnInit();
    expect(component.formData.value).toEqual(mockForm.value);
  });

  it('[updateFormValues] should populate the form control values with the data from the subject', () => {
    expect(component.formData.value).toEqual(mockForm.value);
    mockTransactionService.transactionSubject.next({
      ...mockForm,
      ...dummyData,
    });
    expect(component.formData.value).toEqual({
      ...dummyData,
    });
  });

  it('[ClearFormData] should clear form control value data', () => {
    mockTransactionService.transactionSubject.next({
      ...mockForm,
      ...dummyData,
    });
    component.clearFormData();
    expect(component.formData.value).toEqual(mockForm.value);
  });

  it('[UpdateTransactionList] should call the transactionService with the current form state', done => {
    mockTransactionService.transactionSubject.next({
      ...mockForm,
      ...dummyData,
    });
    const spy = spyOn(mockTransactionService, 'updateTransaction$').and.returnValue(EMPTY);
    component.updateTransactionList();
    mockTransactionService.updateTransaction$(component.formData.value).subscribe(resp => {
      expect(spy).toHaveBeenCalledWith(component.formData.value);
      expect(component.clearFormData).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
