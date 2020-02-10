import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Congratulations',
  templateUrl: './Congratulations.component.html',
  styleUrls: ['./Congratulations.component.scss']
})
export class CongratulationsComponent implements OnInit {

  constructor(private router: Router,private appService: AppService) { }

  ngOnInit() {
  }

  myOrders() {
    this.router.navigate(['MyOrders'])
  }
}
