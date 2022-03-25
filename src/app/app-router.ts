import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { AppPaths } from './shared/AppPaths';

const appRoutes: Routes = [
  {
    path: AppPaths.Root,
    component: TransactionsComponent,
  },
];

appRoutes.push({ path: '**', redirectTo: AppPaths.Root });

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      onSameUrlNavigation: 'reload',
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
