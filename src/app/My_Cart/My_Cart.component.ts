import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-My_Cart',
  templateUrl: './My_Cart.component.html',
  styleUrls: ['./My_Cart.component.scss']
})
export class MyCartComponent implements OnInit {

  constructor(private appService: AppService, private router: Router) {
    this.router.navigate(['/MyCartPayment'], { queryParams: { callback: 'login' }});
  }

  ngOnInit() {
  }

}
