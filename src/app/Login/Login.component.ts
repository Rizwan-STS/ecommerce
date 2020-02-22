import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Constant } from '../../Constants';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './login.service';
import { NotificationService } from 'wsuite-notification';

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
    name;
    otpcode;
    successMessage;
    errorMessage = '';
    isMobile() {
        const devices = [/Android/i, /BlackBerry/i, /iPhone|iPad|iPod/i, /Opera Mini/i, /IEMobile/i, /WPDesktop/i];
        let flag = false;
        for (const dev of devices) {
            if (navigator.userAgent.match(dev)) {
                flag = true;
            }
        }
        return flag;
        // if ()
    }
    constructor(private appService: AppService, private loginService: LoginService, private router: Router, private activatedRoute: ActivatedRoute
        , private toastr: NotificationService) {
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
            if (this.activatedRoute.snapshot.queryParams.phonenumber.trim().length > 10) {
                this.phonenumber = '+' + this.activatedRoute.snapshot.queryParams.phonenumber.trim();
            } else {
                this.phonenumber = this.activatedRoute.snapshot.queryParams.phonenumber.trim();
            }
            this.sendOtp();
        }
    }

    switchModal() {
        this.otpSent = !this.otpSent;
    }

    isNumberKey(evt, nxt, prv) {
        var charCode = (evt.which) ? evt.which : evt.keyCode
        // if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        //     return false;
        // }
        setTimeout(() => {
            $(`#${nxt}`).focus();
        }, 100)
        return true;
    }

    KeyDown(event, nxt, prv) {
        $(event.target).val('');
        if (event.key == 'Backspace' && prv) {
            setTimeout(() => {
                $('#' + prv).focus();
            }, 100);
            return true;
        } else {
            if (nxt === 'submit') {
                setTimeout(() => {
                    this.login();
                }, 1000);
            } else {
                setTimeout(() => {
                    $('#' + nxt).focus();
                }, 100);
            }
        }
    }

    ValidatePassKey(tb) {
        $(tb.target).val('');
        const id = tb.target.id.split('otp')[1]
        if (document.getElementById('otp' + (+id + 1))) {
            document.getElementById('otp' + (+id + 1)).focus();
        } else {
            setTimeout(() => {
                document.getElementById('confirm').focus();
            }, 100)
        }
    }

    login() {
        // if (this.loginForm.invalid || this.loginForm.status !== 'VALID') {
        //     return;
        // }
        // this.loginForm.patchValue({
        //     type: 'User'
        // });
        this.otpcode = this.otp1 + '' + this.otp2 + this.otp3 + this.otp4;
        let loginForm = {
            phonenumber: this.phonenumber,
            password: this.otpcode,
            type: 'User'
        }
        Constant.ROOT_LOADER = true;
        this.loginService.login(loginForm).subscribe((data: any) => {
            this.successMessage = data.message;
            this.errorMessage = '';
            this.toastr.success('Success!', data.message);
            const response = data;
            $('#myModal1').modal("hide");
            Constant.ROOT_LOADER = false;
            if (response && response.data.token) {
                $('.modal-backdrop').remove()
                response.data.userid = btoa(response.data.userid);
                response.data.userType = btoa(response.data.userType);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('login_data', JSON.stringify(response.data));
                sessionStorage.setItem('token', response.data.token);
                sessionStorage.setItem('login_data', JSON.stringify(response.data));
            }
            if (this.activatedRoute.snapshot.queryParams.callback) {
                if (this.activatedRoute.snapshot.queryParams.callback === 'cart') {
                    $('#myModal1').modal("hide");
                    this.router.navigate(['/cart'], { queryParams: { callback: 'login' }});
                } else {
                    $('#myModal1').modal("hide");
                    this.router.navigate(['/home']);
                }
            } else {
                $('#myModal1').modal("hide");
                this.router.navigate(['/home']);
            }
        }, (error) => {
            Constant.ROOT_LOADER = false;
            this.toastr.success('Error!', error.error.message);
            this.errorMessage = error.error.message;
            this.successMessage = '';
            // this.loginForm.get('password').setValue('');
        });
    }

    register() {
        $('#myModal1').modal("hide");
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
              this.successMessage = data.message;
              this.loginService.getDetail(datObj).subscribe((newDataV: any) => {
                const response = newDataV;
                this.name = newDataV.data;
            }, (error) => {
            });
              this.errorMessage = '';
            this.toastr.success('Success!', data.message);
            Constant.ROOT_LOADER = false;
        }, (error) => {
            Constant.ROOT_LOADER = false;
            this.otp1 = '';
            this.otp2 = '';
            this.otp3 = '';
            this.otp4 = '';
            this.toastr.success('Error!', error.error.message);
            this.successMessage = '';
              this.errorMessage = error.error.message;
        });
    }

}
