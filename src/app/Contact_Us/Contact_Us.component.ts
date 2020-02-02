import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-Contact_Us',
  templateUrl: './Contact_Us.component.html',
  styleUrls: ['./Contact_Us.component.scss']
})
export class ContactUsComponent implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit() {
  }

}
