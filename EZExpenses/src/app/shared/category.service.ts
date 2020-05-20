import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Category } from './category.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient
  ) { }

  getCategoryList() {
    return this.http.get(environment.apiURL + '/Category').toPromise();
  }

  addCategory(category: Category): Observable<any> {
    return this.http.post(environment.apiURL + '/Category', category);
  }
}
