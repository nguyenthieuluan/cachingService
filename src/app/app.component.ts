import { Component, OnInit } from '@angular/core';
import { CommonService } from './service/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular8';
  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.commonService.getRequest().subscribe(() => {
      // console.log('sub 1 🤐');
    });

    this.commonService.getRequest('2').subscribe(() => {
      // console.log('sub 2 😂');
    });

    this.commonService.getRequest(null, { body: 2 }).subscribe(() => {
      // console.log('sub 3 ヾ(≧▽≦*)oヾ');
    });

  }

  getRequest(event): void {
    // console.log('event 📧', event);
    const body = { body: event };
    this.commonService.getRequest(event, body).subscribe();
  }
}
