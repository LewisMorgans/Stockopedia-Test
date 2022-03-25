import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Transaction } from '../../shared/Transaction';
import { HttpClient } from '@angular/common/http';
import { AppPaths } from '../../shared/AppPaths';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  // @ts-ignore
  public transactionSubject = new Subject<Transaction>();

  constructor(private readonly httpClient: HttpClient) {}

  public getTransactions$(): Observable<Transaction[]> {
    return this.httpClient.get<Transaction[]>(AppPaths.API);
  }

  /**
   * The API is returning an error stating a value for ID was not given. Although in the README.md it instructs that the server would provide this ID not the client.
   * @param transaction
   */
  public createTransaction$(transaction: Transaction): Observable<Transaction[]> {
    return this.httpClient.post<Transaction[]>(AppPaths.API, transaction);
  }

  public updateTransaction$(transaction: Transaction): Observable<{}> {
    return this.httpClient.put(`${AppPaths.API}/${transaction.id}`, transaction);
  }

  public deleteTransaction$(transaction: Transaction): Observable<{}> {
    return this.httpClient.delete(`${AppPaths.API}/${transaction.id}`);
  }
}
