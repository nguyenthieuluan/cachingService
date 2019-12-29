import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CacheRegistrationService } from './cache-registration.service';
import { tap, map, share } from 'rxjs/operators';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {

    constructor(private cacheRegistrationService: CacheRegistrationService) {
        this.cacheRegistrationService.addToCache('http://localhost:3000/get');
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.cacheRegistrationService.createCache(req, next);
    }

}
