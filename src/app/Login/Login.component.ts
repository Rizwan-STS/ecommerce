import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {AppService} from 'src/app/app.service';

declare var $: any;

@Component({
    selector: 'app-Login',
    templateUrl: './Login.component.html',
    styleUrls: ['./Login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(private appService: AppService) {
    }

    ngOnInit() {
        setTimeout(() => {
            $('#myModal1').modal("show")
        }, 1000)
    }

}
