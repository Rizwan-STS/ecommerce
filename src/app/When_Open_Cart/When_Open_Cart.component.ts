import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-When_Open_Cart',
  templateUrl: './When_Open_Cart.component.html',
  styleUrls: ['./When_Open_Cart.component.scss']
})
export class WhenOpenCartComponent implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit() {
  }

}
