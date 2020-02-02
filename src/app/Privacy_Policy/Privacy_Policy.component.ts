import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-Privacy_Policy',
  templateUrl: './Privacy_Policy.component.html',
  styleUrls: ['./Privacy_Policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit() {
  }

}
