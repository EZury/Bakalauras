import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../shared/category.service';
import { Category } from '../shared/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categoy',
  templateUrl: './categoy.component.html',
  styles: []
})
export class CategoyComponent implements OnInit {
  categoryArray: Category[];
  formValid: boolean = true;

  constructor(
    public categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit() {
    this.categoryService.getCategoryList().then(res => this.categoryArray = res as Category[]);
  }

  addCategory(Name: string) {
    if (this.validateForm(Name)) {
      Name = Name.trim();
      this.categoryService.addCategory({Name} as Category).subscribe(category => {
          this.router.navigate(['/category']);
          this.categoryArray.push(category);
        }
      );
    }
  }

  validateForm(Name: string) {
    Name = Name.trim();
    this.formValid = true;
    if (Name === '' || this.categoryArray.find(category => category.Name === Name)) {
      this.formValid = false;
    }

    return this.formValid;
  }
}
