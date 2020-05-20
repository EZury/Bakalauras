import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Owner } from './owner.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  constructor(
    private http: HttpClient
  ) { }

  getOwnerList() {
    return this.http.get(environment.apiURL + '/Owner').toPromise();
  }

  addOwner(owner: Owner): Observable<any> {
    return this.http.post(environment.apiURL + '/Owner', owner);
  }
}
