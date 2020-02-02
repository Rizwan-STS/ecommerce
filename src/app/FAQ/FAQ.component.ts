import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-FAQ',
  templateUrl: './FAQ.component.html',
  styleUrls: ['./FAQ.component.scss']
})
export class FAQComponent implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit() {
  }

}
