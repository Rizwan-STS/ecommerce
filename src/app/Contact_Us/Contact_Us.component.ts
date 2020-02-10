import {Component, OnInit} from '@angular/core';
import {AppService} from 'src/app/app.service';
import {environment} from "../../environments/environment";
import { NotificationService } from 'wsuite-notification';
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

    successMessage;
    errorMessage = '';
    constructor(private appService: AppService
        , private toastr: NotificationService) {
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
                // alert('You have entered an invalid email address.')
                this.successMessage = '';
                  this.errorMessage = 'You have entered an invalid email address.';
                $('#email').focus();
                return;
            }
            this.appService.postMethod(environment.baseUrl + '/contact-us', [], [], [], {
                email: this.email,
                title: this.title,
                comment: this.message
            }).subscribe((data: any) => {
                // alert(data.message);
                this.toastr.success('Success!', data.message);
                this.successMessage = data.message;
                this.errorMessage = '';
                this.title = '';
                this.email = '';
                this.message = '';
            }, err => {
                console.log(err);
                this.toastr.success('Error!', err); 
                this.successMessage = '';
                this.errorMessage = err;
                this.title = '';
                this.email = '';
                this.message = '';
            });
        } else {
            // alert('All fields are required.')
            this.successMessage = '';
              this.errorMessage = 'All fields are required.';
        }
    }

}
