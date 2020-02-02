import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-Listing_Products_2',
  templateUrl: './Listing_Products_2.component.html',
  styleUrls: ['./Listing_Products_2.component.scss']
})
export class ListingProducts2Component implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit() {
  }

}
