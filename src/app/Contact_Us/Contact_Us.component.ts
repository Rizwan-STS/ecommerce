import {Component, OnInit} from '@angular/core';
import {AppService} from 'src/app/app.service';
import {environment} from "../../environments/environment";
declare var $: any;

@Component({
    selector: 'app-Contact_Us',
    templateUrl: './Contact_Us.component.html',
    styleUrls: ['./Contact_Us.component.scss']
})
export class ContactUsComponent implements OnInit {
    email = '';
    title = '';
    message = '';

    constructor(private appService: AppService) {
    }

    ngOnInit() {
    }

    ValidateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (true)
        }
        return (false)
    }

    SendInquiry() {
        if (this.email && this.title && this.message) {
            if (!this.ValidateEmail(this.email)) {
                alert('You have entered an invalid email address.')
                $('#email').focus();
                return;
            }
            this.appService.postMethod(environment.baseUrl + '/contact-us', [], [], [], {
                email: this.email,
                title: this.title,
                comment: this.message
            }).subscribe((data: any) => {
                alert(data.message);
                this.title = '';
                this.email = '';
                this.message = '';
            }, err => {
                console.log(err);
                this.title = '';
                this.email = '';
                this.message = '';
            });
        } else {
            alert('All fields are required.')
        }
    }

}
