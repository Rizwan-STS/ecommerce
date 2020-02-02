import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-Listing_Products',
  templateUrl: './Listing_Products.component.html',
  styleUrls: ['./Listing_Products.component.scss']
})
export class ListingProductsComponent implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit() {
  }

}
