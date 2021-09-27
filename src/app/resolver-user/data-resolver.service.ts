import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataResolverService implements Resolve<any> {
  SERVER_URL = 'http://localhost:5000/';
  constructor(private http: HttpClient) { }
  resolve() {
      return this.http.get<any>(`${this.SERVER_URL}users`)
  }
}
