import { Component, OnInit } from '@angular/core';
import { CommonService } from './service/common.service';
import { forkJoin, of, interval, Subject, BehaviorSubject, combineLatest, zip, Observable, throwError } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { delay, debounce, debounceTime, takeUntil, take, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular8';
  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    // this.testObservable();

    this.commonService.getRequest().subscribe((value) => {
      console.log('sub 1 🤐');
    });

    // this.commonService.getRequest('2').subscribe(() => {
    //   // console.log('sub 2 😂');
    // });

    // this.commonService.getRequest(null, { body: 2 }).subscribe(() => {
    //   // console.log('sub 3 ヾ(≧▽≦*)oヾ');
    // });


  }

  getRequest(event): void {
    // console.log('event 📧', event);
    const body = { body: event };
    this.commonService.getRequest(event, body).subscribe();
  }

  testObservable(): void {
    const inter = interval(1000).pipe(
      take(6)
    );
    const ob1 = new BehaviorSubject(null);
    ob1.next('💔');



    const ob2 = of('❤').pipe(delay(5000));
    // ob1.subscribe(console.log);
    // ob2.subscribe(console.log);

    const errorOb = Observable.create(observer => {
      observer.next('⛔');
      observer.next('⚠');
      throw new Error('loi');
      observer.complete();

      // setTimeout(() => throwError('this is an error'), 2000);

    }).pipe(
      delay(2000),
      catchError(err => of(err)),
    //   catchError(err => {
    //     // console.log('caught mapping error and rethrowing', err);
    //     return throwError(err);
    // }),
    );

    // errorOb.subscribe(console.log);
    // inter.pipe(
    //   catchError( err => console.log)
    // );


    inter.subscribe((value) => {
      console.log('⌚', value);
      // ob1.next(3);
    });
    forkJoin(
      // as of RxJS 6.5+ we can use a dictionary of sources
      // {
      ob1, errorOb
      // google: ajax.getJSON('https://api.github.com/users/google'),
      // microsoft: ajax.getJSON('https://api.github.com/users/microsoft'),
      // users: ajax.getJSON('https://api.github.com/users')
      // }
    )
      // { google: object, microsoft: object, users: array }
      .subscribe(console.log);
    ob1.pipe(
      // throwError('lpo'),
      catchError(err => of(err))
    );
    // ob1.error('ahaha');
    // ob1.next(new Error('9999000'));
    ob1.complete();

    // Promise.all( [ob1.toPromise(), errorOb.toPromise()] ).then(console.log);
  }
}
