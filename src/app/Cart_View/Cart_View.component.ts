import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
declare var $: any;

@Component({
  selector: 'app-Cart_View',
  templateUrl: './Cart_View.component.html',
  styleUrls: ['./Cart_View.component.scss']
})
export class CartViewComponent implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit() {
    setTimeout(() => {
      $('#myModal1').modal("show")
    },1000)
  }

}
