import { Injectable } from '@angular/core';
import { ExpenseItem } from './expense-item.model';
import { Expense } from './expense.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  formData: Expense;
  expenseItems: ExpenseItem[];

  constructor(
    private http: HttpClient
  ) { }

  saveOrUpdateExpense() {
    var body = {
      ...this.formData,
      ExpenseItems: this.expenseItems
    };

    return this.http.post(environment.apiURL + '/Expense', body);
  }

  getExpenseList() {
    return this.http.get(environment.apiURL + '/Expense').toPromise();
  }

  getExpenseById(id: number): any {
    return this.http.get(environment.apiURL + '/Expense/' + id).toPromise();
  }

  deleteExpense(id: number) {
    return this.http.delete(environment.apiURL + '/Expense/' + id).toPromise();
  }
}
