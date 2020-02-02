import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-Terms_And_Condition',
  templateUrl: './Terms_And_Condition.component.html',
  styleUrls: ['./Terms_And_Condition.component.scss']
})
export class TermsAndConditionComponent implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit() {
  }

}
