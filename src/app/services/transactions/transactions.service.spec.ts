import { TestBed } from '@angular/core/testing';
import { TransactionsService } from './transactions.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Transaction } from '../../shared/Transaction';
import { HttpHeaders } from '@angular/common/http';

describe('[TransactionService] Testing suite', () => {
  let service: TransactionsService;
  let _httpMock: HttpTestingController;
  let API: string;
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
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TransactionsService);
    _httpMock = TestBed.inject(HttpTestingController);
    API = 'https://transactions-challenge.test.stockopedia.com//api/v1/transactions';
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('[GetTransactions$] Should return an array of transaction objects', done => {
    service.getTransactions$().subscribe((transactions: Transaction[]) => {
      expect(transactions).toEqual(transactionListMock);
      done();
    });
    const _req = _httpMock
      .expectOne({
        url: API,
        method: 'GET',
      })
      .flush([
        {
          id: 1337,
          type: 'type',
          date: new Date('2022-06-22'),
          value: 100,
          cashflow: 100,
          security: 'CSAR',
          shares: 50,
        },
      ]);
  });

  it('[CreateTransaction$] Should return 200 HttpResponse header on successful request', done => {
    const headers = new HttpHeaders();
    headers.append('statusCode', '200');

    service.createTransaction$(transactionListMock[0]).subscribe(response => {
      expect(response).toEqual(headers as any);
      done();
    });

    const _req = _httpMock
      .expectOne({
        url: API,
        method: 'POST',
      })
      .flush(headers);
  });

  it('[UpdateTransaction$] Should return 200 HttpResponse header on successful request', done => {
    const headers = new HttpHeaders();
    headers.append('statusCode', '200');

    service.updateTransaction$(transactionListMock[0]).subscribe(response => {
      expect(response).toEqual(headers as any);
      done();
    });

    const _req = _httpMock
      .expectOne({
        url: `${API}/${transactionListMock[0].id}`,
        method: 'PUT',
      })
      .flush(headers);
  });

  it('[DeleteTransaction$] Should return 204 HttpResponse header on successful deletion', done => {
    const headers = new HttpHeaders();
    headers.append('statusCode', '204');

    service.deleteTransaction$(transactionListMock[0]).subscribe(response => {
      expect(response).toEqual(headers as any);
      done();
    });

    const _req = _httpMock
      .expectOne({
        url: `${API}/${transactionListMock[0].id}`,
        method: 'DELETE',
      })
      .flush(headers);
  });

  afterEach(() => _httpMock.verify());
});
