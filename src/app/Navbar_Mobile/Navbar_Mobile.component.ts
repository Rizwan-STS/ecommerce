import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-Navbar_Mobile',
  templateUrl: './Navbar_Mobile.component.html',
  styleUrls: ['./Navbar_Mobile.component.scss']
})
export class NavbarMobileComponent implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit() {
  }

}
