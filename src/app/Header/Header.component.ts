import {Component, Input, OnInit} from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-Header',
  templateUrl: './Header.component.html',
  styleUrls: ['./Header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input()
  webTool: boolean;
  addShowCart = false

  constructor(private appService: AppService) { }

  ngOnInit() {
  }

  hoverMouse() {
    this.addShowCart = true
  }
}
