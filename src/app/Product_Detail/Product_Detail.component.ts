import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-Product_Detail',
  templateUrl: './Product_Detail.component.html',
  styleUrls: ['./Product_Detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit() {
  }

}
