import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-Box_Number_Page',
  templateUrl: './Box_Number_Page.component.html',
  styleUrls: ['./Box_Number_Page.component.scss']
})
export class BoxNumberPageComponent implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit() {
  }

}
