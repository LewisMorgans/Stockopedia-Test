import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TransactionsService } from '../../../services/transactions/transactions.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-transaction-adder',
  templateUrl: './transaction-adder.component.html',
})
export class TransactionAdderComponent implements OnInit {
  // @ts-ignore
  public formData: FormGroup;
  public transactionTypes = ['buy', 'sell', 'withdrawal'];

  constructor(private readonly _fb: FormBuilder, private readonly transactionService: TransactionsService) {}

  ngOnInit(): void {
    this.hydrateForm();
    this.updateFormValues();
  }

  private updateFormValues(): void {
    this.transactionService.transactionSubject.subscribe(transaction => {
      for (const [key, value] of Object.entries(transaction)) {
        this.formData.controls[key]?.setValue(value);
      }
    });
  }

  private hydrateForm(): void {
    this.formData = this._fb.group({
      cashflow: new FormControl(),
      date: new FormControl(),
      id: new FormControl(),
      security: new FormControl(),
      type: new FormControl(),
      value: new FormControl(),
      shares: new FormControl(),
    });
  }

  public updateTransactionList(): void {
    const updatedTransaction = { ...this.formData.value };
    this.transactionService
      .updateTransaction$(updatedTransaction)
      .pipe(catchError(err => throwError(err)))
      .subscribe(_ => this.clearFormData());
  }

  public createNewTransaction(): void {
    this.transactionService
      .createTransaction$(this.formData.value)
      .pipe(catchError(err => throwError(err)))
      .subscribe();
  }

  public clearFormData(): void {
    this.formData.reset();
  }
}
