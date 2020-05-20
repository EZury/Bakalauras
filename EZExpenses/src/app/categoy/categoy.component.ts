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

  constructor(
    public categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit() {
    this.categoryService.getCategoryList().then(res => this.categoryArray = res as Category[]);
  }

  addCategory(Name: string) {
    Name = Name.trim();
    if (!Name ) { return; }
    this.categoryService.addCategory({Name} as Category).subscribe(category => {
        this.router.navigate(['/category']);
        this.categoryArray.push(category);
      }
    );
  }
}
