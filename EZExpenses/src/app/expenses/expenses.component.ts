import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../shared/expense.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styles: []
})
export class ExpensesComponent implements OnInit {
  expenseList;
  pieChartLabels = [];
  pieChartData = [];
  pieChartType = 'pie';
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)',
      'rgba(255, 208, 107)', 'rgba(0, 214, 121)', 'rgba(247, 107, 255)', 'rgba(247, 255, 107)',
      'rgba(107, 255, 176)', 'rgba(107, 218, 255)', 'rgba(149, 107, 255)', 'rgba(255, 107, 205)'],
    },
  ];

  constructor(
    public expenseService: ExpenseService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.refreshExpenses();
  }

  refreshExpenses() {
    this.expenseService.getExpenseList().then(res => {
      this.expenseList = res;
      this.pieChartLabels = [];
      this.pieChartData = [];
      this.expenseList.forEach(x => {
        this.pieChartLabels.push(x.Name);
        this.pieChartData.push(x.TotalAmount);
      })
    });
  }

  openForEdit(ExpenseID: number) {
    this.router.navigate(['/expense/edit/' + ExpenseID]);
  }

  onExpenseDelete(ExpenseID: number) {
    if (confirm('Ar tikrai norite tai ištrinti?')) {
      this.expenseService.deleteExpense(ExpenseID).then(res => {
        this.refreshExpenses();
        this.toastr.warning('Ištrinta sėkmingai', 'EZExpenses App');
      });
    }
  }
}
