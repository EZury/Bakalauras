import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ExpenseItem } from 'src/app/shared/expense-item.model';
import { CategoryService } from 'src/app/shared/category.service';
import { Category } from 'src/app/shared/category.model';
import { NgForm } from '@angular/forms';
import { ExpenseService } from 'src/app/shared/expense.service';

@Component({
  selector: 'app-expense-items',
  templateUrl: './expense-items.component.html',
  styles: []
})
export class ExpenseItemsComponent implements OnInit {
  formData: ExpenseItem;
  categoryArray: Category[];
  formValid: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public categoryService: CategoryService,
    public expenseService: ExpenseService,
    public dialogRef: MatDialogRef<ExpenseItemsComponent>
  ) { }

  ngOnInit() {
    this.categoryService.getCategoryList().then(res => this.categoryArray = res as Category[]);

    if (this.data.expenseItemIndex === null) {
      this.formData = {
        ExpenseItemID: null,
        ExpenseID: this.data.ExpenseID,
        CategoryID: 0,
        Name: '',
        Amount: 0,
        CategoryName: ''
      };
    } else {
      this.formData = Object.assign([], this.expenseService.expenseItems[this.data.expenseItemIndex]);
    }
  }

  updateFormData(option) {
    if (option.selectedIndex === 0) {
      this.formData.Amount = 0;
      this.formData.CategoryName = '';
    } else {
      this.formData.CategoryName = this.categoryArray[option.selectedIndex - 1].Name;
    }
    this.updateAmount();
  }

  onSubmit(form: NgForm) {
    if (this.validateForm(form.value)) {
      if (this.data.expenseItemIndex === null) {
        this.expenseService.expenseItems.push(form.value);
      } else {
        this.expenseService.expenseItems[this.data.expenseItemIndex] = form.value;
      }
      this.dialogRef.close();
    }
    //console.log(form.value);
  }

  validateForm(formData: ExpenseItem) {
    this.formValid = true;
    if (formData.ExpenseID === 0) {
      this.formValid = false;
    } else if (formData.Name === '' || formData.Amount === 0) {
      this.formValid = false;
    }

    return this.formValid;
  }

  updateAmount() {
    this.formData.Amount = parseFloat((this.formData.Amount).toFixed(2));
  }
}
