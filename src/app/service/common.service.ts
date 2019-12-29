import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  getRequest(param?: string, body?: any): Observable<object> {
    let baseUrl = `http://localhost:3000/get`;
    if (param) {
      baseUrl = `${baseUrl}?param1=${param}`;
    }
    const url = baseUrl;
    console.log('body', body);
    
    return this.http.get(url, body);
  }

  getRequestWithQuery() {

  }

}
