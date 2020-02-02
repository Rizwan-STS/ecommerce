import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-My_Cart_Payment',
  templateUrl: './My_Cart_Payment.component.html',
  styleUrls: ['./My_Cart_Payment.component.scss']
})
export class MyCartPaymentComponent implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit() {
  }

}
