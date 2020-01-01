import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpResponse, HttpEvent } from '@angular/common/http';
import { tap, share } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CacheRegistrationService {
  private cachedData: Map<string, HttpResponse<object> | Observable<HttpEvent<object>>>
  = new Map<string, HttpResponse<object> | Observable<HttpEvent<object>>>();
  private timer: number = 1000;
  private services: string[] = [];

  constructor() { }

  public addedToCache(serviceUri: string) {
    return this.services.indexOf(serviceUri) > -1;
  }

  public addToCache(serviceUri: string) {
    // Check if not already added to list
    if (!this.addedToCache(serviceUri)) {
      this.services.push(serviceUri);
    }
  }

  public createCache(req: HttpRequest<object>, next: HttpHandler) {
    const reqKey = JSON.stringify(req);
    const baseUrl: string = req.url.split('?')[0];

    if (req.method !== 'GET' || !this.addedToCache(baseUrl)) {
      return next.handle(req);
    }

    const lastResponse: HttpResponse<object> | Observable<HttpEvent<object>> = this.cachedData.get(reqKey);
    // Checked if there is cached data for this req
    // In case of parallel requests to same req,
    // return the request already in progress
    // otherwise return the last cached data
    if (lastResponse) {
      return (lastResponse instanceof Observable) ? lastResponse : of(lastResponse.clone());
    }

    const requestHandle: Observable<HttpEvent<object>> = next.handle(req).pipe(
      tap((stateEvent) => {
        if (stateEvent instanceof HttpResponse) {
          this.cachedData.set(reqKey, stateEvent.clone());
          this.scheduleCleanCache(reqKey, this.timer);
        }
      }),
      share()
    );

    // Meanwhile cache the request Observable to handle parallel request
    this.cachedData.set(reqKey, requestHandle);

    return requestHandle;
  }

  scheduleCleanCache(key: string, timer: number) {
    setTimeout(() => {
      this.cachedData.delete(key);
    }, timer);
  }
}
