import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'src/app/shared/expense.service';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ExpenseItemsComponent } from '../expense-items/expense-items.component';
import { Owner } from 'src/app/shared/owner.model';
import { OwnerService } from 'src/app/shared/owner.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styles: []
})
export class ExpenseComponent implements OnInit {
  ownerArray: Owner[];
  formValid: boolean = true;
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
    public ownerService: OwnerService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private router: Router,
    private currentRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    let expenseID = this.currentRoute.snapshot.paramMap.get('id');
    if (expenseID === null) {
      this.resetForm();
    } else {
      this.expenseService.getExpenseById(parseInt(expenseID)).then(res => {
        this.expenseService.formData = res.expense;
        this.expenseService.expenseItems = res.expenseItems;
        res.expenseItems.forEach(x => {
          this.pieChartLabels.push(x.CategoryName);
          this.pieChartData.push(x.Amount);
        });
      });
    }
    this.ownerService.getOwnerList().then(res => this.ownerArray = res as Owner[]);
  }

  resetForm(form?: NgForm) {
    if (form === null) {
      form.resetForm();
    }
    this.expenseService.formData = {
      ExpenseID: null,
      OwnerID: 0,
      Name: '',
      TotalAmount: 0,
      DeletedExpenseItemIDs: ''
    };
    this.expenseService.expenseItems = [];
  }

  AddOrEditExpenseItem(expenseItemIndex, ExpenseID) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '75%';
    dialogConfig.data = {expenseItemIndex, ExpenseID};
    this.dialog.open(ExpenseItemsComponent, dialogConfig).afterClosed().subscribe(res => {
      this.updateTotalAmount();
    });
  }

  onDeleteExpenseItem(expenseItemID: number, i: number) {
    if (expenseItemID != null) {
      this.expenseService.formData.DeletedExpenseItemIDs += expenseItemID + ',';
    }
    this.expenseService.expenseItems.splice(i, 1);

    this.updateTotalAmount();
  }

  updateTotalAmount() {
    this.expenseService.formData.TotalAmount = this.expenseService.expenseItems.reduce((previous, current) => {
      return previous + current.Amount;
    }, 0);

    this.expenseService.formData.TotalAmount = parseFloat(this.expenseService.formData.TotalAmount.toFixed(2));
  }

  validateForm() {
    this.formValid = true;
    if (this.expenseService.formData.OwnerID === 0) {
      this.formValid = false;
    } else if (this.expenseService.expenseItems.length === 0) {
      this.formValid = false;
    }
    return this.formValid;
  }

  onSubmit(form: NgForm) {
    if (this.validateForm()) {
      this.expenseService.saveOrUpdateExpense().subscribe(res => {
        this.resetForm();
        this.toastr.success('Išsaugota sėkmingai', 'EZExpenses App');
        this.router.navigate(['/expenses']);
      });
    }
  }
}
