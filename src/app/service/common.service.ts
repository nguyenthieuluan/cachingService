import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  getRequest(): Observable<object> {
    const url: string = 'http://localhost:3001/get';
    return this.http.get(url);
  }

  getRequestWithQuery() {

  }

}
