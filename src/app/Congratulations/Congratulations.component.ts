import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-Congratulations',
  templateUrl: './Congratulations.component.html',
  styleUrls: ['./Congratulations.component.scss']
})
export class CongratulationsComponent implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit() {
  }

}
