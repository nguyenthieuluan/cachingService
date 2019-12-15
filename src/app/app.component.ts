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
    this.commonService.getRequest();
    this.commonService.getRequest();
    this.commonService.getRequest();
  }
}
