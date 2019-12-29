import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  getRequest(): Observable<object> {
    const url = 'http://localhost:3000/get';
    return this.http.get(url);
  }

  getRequestWithQuery() {

  }

}
