import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-Error_Page',
  templateUrl: './Error_Page.component.html',
  styleUrls: ['./Error_Page.component.scss']
})
export class ErrorPageComponent implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit() {
  }

}
