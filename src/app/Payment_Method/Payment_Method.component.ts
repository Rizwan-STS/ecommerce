import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-Payment_Method',
  templateUrl: './Payment_Method.component.html',
  styleUrls: ['./Payment_Method.component.scss']
})
export class PaymentMethodComponent implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit() {
  }

}
