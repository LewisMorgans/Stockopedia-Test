interface TransactionTypes {
  buy: string;
  sell: string;
  deposit: string;
  withdrawal: string;
}

export const enum TransactionTypesEnum {
  buy = 'Buy',
  sell = 'Sell',
  deposit = 'Deposit',
  withdrawal = 'Withdrawal',
}

export interface Transaction {
  id: number;
  type: string;
  date: Date;
  value: number;
  cashflow: number;
  security: any;
  shares: number;
}
