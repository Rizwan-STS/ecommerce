import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-About_Us',
  templateUrl: './About_Us.component.html',
  styleUrls: ['./About_Us.component.scss']
})
export class AboutUsComponent implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit() {
    
  }

}
