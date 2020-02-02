import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-My_Orders',
  templateUrl: './My_Orders.component.html',
  styleUrls: ['./My_Orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit() {
  }

}
