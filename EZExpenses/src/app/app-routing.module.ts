import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpensesComponent } from './expenses/expenses.component';
import { ExpenseComponent } from './expenses/expense/expense.component';
import { CategoyComponent } from './categoy/categoy.component';
import { OwnerComponent } from './owner/owner.component';

const routes: Routes = [
  {path: '', redirectTo: 'expenses', pathMatch: 'full'},
  {path: 'expenses', component: ExpensesComponent},
  {path: 'expense', children: [
    {path: '', component: ExpenseComponent},
    {path: 'edit/:id', component: ExpenseComponent}
  ]},
  {path: 'category', component: CategoyComponent},
  {path: 'owner', component: OwnerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
