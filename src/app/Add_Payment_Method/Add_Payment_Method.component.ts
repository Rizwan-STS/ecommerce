import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-Add_Payment_Method',
  templateUrl: './Add_Payment_Method.component.html',
  styleUrls: ['./Add_Payment_Method.component.scss']
})
export class AddPaymentMethodComponent implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit() {
  }

}
