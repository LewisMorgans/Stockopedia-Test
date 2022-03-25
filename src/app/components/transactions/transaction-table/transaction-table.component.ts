import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../../services/transactions/transactions.service';
import { Transaction } from '../../../shared/Transaction';
import { catchError, map, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
})
export class TransactionTableComponent implements OnInit {
  public transactions: Transaction[] = [];
  public transactionsCashFlowTotal: number = 0;

  constructor(private readonly transactionsService: TransactionsService) {}

  ngOnInit(): void {
    this.hydrateTransactionsTable();
  }

  private hydrateTransactionsTable(): void {
    this.transactionsService
      .getTransactions$()
      .pipe(
        map((transaction: Transaction[]) => {
          Object.values(transaction).map(dataSet => {
            for (let result in dataSet) {
              // @ts-ignore
              this.transactions.push(dataSet[result]);
            }
          });
        }),
        tap(() => this.cashFlowCumulativeTotal()),
        catchError(err => throwError(err))
      )
      .subscribe();
  }

  public editTransaction(transaction: Transaction): void {
    this.transactionsService.transactionSubject.next(transaction);
  }

  public deleteTransaction(transaction: Transaction): void {
    this.transactionsService
      .deleteTransaction$(transaction)
      .pipe(catchError(err => throwError(err)))
      .subscribe();
  }

  private cashFlowCumulativeTotal(): void {
    let posTotal = 0;
    let negTotal = 0;
    this.transactions.map(el => {
      el.cashflow > 0 ? (posTotal += el.cashflow) : (negTotal -= el.cashflow);
    });
    this.transactionsCashFlowTotal = posTotal - negTotal;
  }
}
