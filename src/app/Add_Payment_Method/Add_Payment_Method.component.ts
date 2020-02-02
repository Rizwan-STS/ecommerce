import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

declare var $: any;

@Component({
  selector: 'app-Add_Payment_Method',
  templateUrl: './Add_Payment_Method.component.html',
  styleUrls: ['./Add_Payment_Method.component.scss']
})
export class AddPaymentMethodComponent implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit() {
    setTimeout(() => {
      $('#myModal1').modal("show")
  }, 1000)
  }

}
