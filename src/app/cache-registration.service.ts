import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CacheRegistrationService {
  private cachedData = new Map<string, any>();
  private timer = 2000;
  constructor() { }

  private services = [];

  public addedToCache(serviceUri: string) {
    return this.services.indexOf(serviceUri) > -1;
  }

  public addToCache(serviceUri: string) {
    // Check if not already added to list
    if (!this.addedToCache(serviceUri)) {
      this.services.push(serviceUri);
    }
  }

  public createCache(req: HttpRequest<any>, next: HttpHandler) {
    console.log((req));
    const URL_KEY = JSON.stringify(req);
    if (
        req.method !== 'GET' ||
        !this.addedToCache(req.url.split('?')[0])) {
        return next.handle(req);
    }

    // Also leave scope of resetting already cached data for a URI
    if (req.headers.get('reset-cache')) {
        this.cachedData.delete(URL_KEY);
    }

    // Checked if there is cached data for this URI
    const lastResponse = this.cachedData.get(URL_KEY);
    if (lastResponse) {
        // In case of parallel requests to same URI,
        // return the request already in progress
        // otherwise return the last cached data
        return (lastResponse instanceof Observable)
            ? lastResponse : of(lastResponse.clone());
    }

    // If the request of going through for first time
    // then let the request proceed and cache the response
    const requestHandle = next.handle(req).pipe(
        tap((stateEvent) => {
            if (stateEvent instanceof HttpResponse) {
                this.cachedData.set(
                    URL_KEY,
                    stateEvent.clone()
                );
                this.scheduleCleanCache(URL_KEY, this.timer);
            }
        }),
        share()
    );


    // Meanwhile cache the request Observable to handle parallel request
    this.cachedData.set(req.urlWithParams, requestHandle);

    return requestHandle;
  }

  scheduleCleanCache(key: string, timer: number) {
    // console.log('key ☠', key);

    setTimeout(() => {
        this.cachedData.delete(key);
    }, timer);
}
}
