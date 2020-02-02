import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-My_Cart',
  templateUrl: './My_Cart.component.html',
  styleUrls: ['./My_Cart.component.scss']
})
export class MyCartComponent implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit() {
  }

}
