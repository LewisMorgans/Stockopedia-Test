import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TransactionTableComponent } from './components/transactions/transaction-table/transaction-table.component';
import { TransactionAdderComponent } from './components/transactions/transaction-adder/transaction-adder.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { AppRoutingModule } from './app-router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, TransactionTableComponent, TransactionAdderComponent, TransactionsComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
