import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Constant } from '../../Constants';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './login.service';

declare var $: any;

@Component({
    selector: 'app-Login',
    templateUrl: './Login.component.html',
    styleUrls: ['./Login.component.scss'],
    providers: [LoginService]
})
export class LoginComponent implements OnInit {

    otpSent = false;
    phonenumber;
    otp1;
    otp2;
    otp3;
    otp4;
    otpcode;
    constructor(private appService: AppService, private loginService: LoginService, private router: Router, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        setTimeout(() => {
            $('#myModal1').modal("show")
        }, 1000);
        this.checkSession();
        this.activatedRoute.queryParams.subscribe(params => {
            console.log(params);
        });
        console.log('this.activatedRoute.snapshot.queryParams.phonenumber is ', this.activatedRoute.snapshot.queryParamMap.get('phonenumber'));
        if (this.activatedRoute.snapshot.queryParams.phonenumber) {
            this.phonenumber = this.activatedRoute.snapshot.queryParams.phonenumber;
            this.sendOtp();
        } 
    }

    switchModal() {
        this.otpSent = !this.otpSent;
    }

    login() {
        // if (this.loginForm.invalid || this.loginForm.status !== 'VALID') {
        //     return;
        // }
        // this.loginForm.patchValue({
        //     type: 'User'
        // });
        this.otpcode = this.otp1 + this.otp2 + this.otp3 + this.otp4;
        let loginForm = {
            phonenumber: this.phonenumber,
            password: this.otpcode,
            type: 'User'
        }
        Constant.ROOT_LOADER = true;
        this.loginService.login(loginForm).subscribe((data: any) => {
            // this.successMessage = data.message;
            const response = data;
            Constant.ROOT_LOADER = false;
            if (response && response.data.token) {
                response.data.userid = btoa(response.data.userid);
                response.data.userType = btoa(response.data.userType);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('login_data', JSON.stringify(response.data));
                sessionStorage.setItem('token', response.data.token);
                sessionStorage.setItem('login_data', JSON.stringify(response.data));
            }
            if (this.activatedRoute.snapshot.queryParams.callback) {
                if (this.activatedRoute.snapshot.queryParams.callback === 'cart') {
                    this.router.navigate(['/cart']);
                } else {
                    this.router.navigate(['/home']);
                }
            } else {
                this.router.navigate(['/home']);
            }
        }, (error) => {
            Constant.ROOT_LOADER = false;
            // this.errorMessage = error.error.message;
            // this.loginForm.get('password').setValue('');
        });
    }

    register(){
        this.router.navigate(['Register']);
    }

    checkSession() {
        if (localStorage.getItem('token') == null) {

        } else {
            // Constant.ROOT_LOADER = true;
            // let token = localStorage.getItem('token');
            // if (token != null) {
            //     this.loginService.checkSession(token).subscribe((data: any) => {
            //         const response = data;
            //         this.router.navigate(['/home']);
            //     }, (error) => {
            //         Constant.ROOT_LOADER = false;
            //     });
            // }
        }

    }

    sendOtp() {
        Constant.ROOT_LOADER = true;
        let datObj: object = {
            'phonenumber': this.phonenumber
        };
        this.loginService.loginOTP(datObj).subscribe((data: any) => {
            this.switchModal();
            //   this.successMessage = data.message;
            const response = data;
            Constant.ROOT_LOADER = false;
        }, (error) => {
            Constant.ROOT_LOADER = false;
            //   this.errorMessage = error.error.message;
        });
    }
}
