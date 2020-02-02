import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-Navbar_Desktop',
  templateUrl: './Navbar_Desktop.component.html',
  styleUrls: ['./Navbar_Desktop.component.scss']
})
export class NavbarDesktopComponent implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit() {
  }

}
