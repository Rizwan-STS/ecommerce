import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Constant } from '../../Constants';
import { ActivatedRoute, Router } from '@angular/router';
import { SignUpService } from './Signup.service';
import { NotificationService } from 'wsuite-notification';

declare var $: any;

@Component({
    selector: 'app-Login',
    templateUrl: './Signup.component.html',
    styleUrls: ['./Signup.component.scss'],
    providers: [SignUpService]
})
export class SignUpComponent implements OnInit {

    otpSent = false;
    phonenumber;
    name;
    successMessage;
    errorMessage = '';
    constructor(private appService: AppService, private signupService: SignUpService, private router: Router, private activatedRoute: ActivatedRoute
        ,private toastr: NotificationService) {
    }

    ngOnInit() {
        setInterval(() => {
            $('#myModal1').modal("show") 
        }, 1000)
    }

    login(){
        this.router.navigate(['Login']);
    }

    switchModal() {
        this.otpSent = !this.otpSent;
    }

    Signup() {
        // if (this.signupForm.invalid || this.signupForm.status !== 'VALID') {
        //   return;
        // }
        // let phone = this.signupForm.value.phonenumber;
        let signupForm = {
            phonenumber: this.phonenumber,
            name: this.name
        }
        Constant.ROOT_LOADER = true;
        this.signupService.signup(signupForm).subscribe((data: any) => {
            //   this.successMessage = data.message;
            this.toastr.success('Success!', data.message);
            
            this.successMessage = data.message;
            this.errorMessage = '';
            const response = data;
            Constant.ROOT_LOADER = false;
            //   this.signupForm.reset();
            //   this.snackBar.open(this.successMessage, '', Constant.SNACKBAR_DURATION);
            this.router.navigate(['/Login', { 'phonenumber': this.phonenumber }]);
        }, (error) => {
            Constant.ROOT_LOADER = false;
            this.toastr.success('Error!', error.error.message);

            this.successMessage = '';
              this.errorMessage = error.error.message;
        });
    }

} 
