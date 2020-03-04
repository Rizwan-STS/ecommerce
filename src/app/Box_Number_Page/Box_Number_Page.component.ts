import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router } from "@angular/router";
import { CartService } from "../cart.service";
import { BoxService } from "../Listing_Products/box.service";
import { NotificationService } from 'wsuite-notification';

declare var $: any;

@Component({
    selector: 'app-Box_Number_Page',
    templateUrl: './Box_Number_Page.component.html',
    styleUrls: ['./Box_Number_Page.component.scss'],
    providers: [BoxService]
})
export class BoxNumberPageComponent implements OnInit {
    nums = new Array(4);
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
    successMessage;
    errorMessage = '';
    constructor(private router: Router, private boxService: BoxService
        , private toastr: NotificationService) {
    }

    ngOnInit() {
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
        if (event.key === 'Backspace' && prv) {
            setTimeout(() => {
                $('#' + prv).focus();
            }, 100);
            return true;
        } else if (event.key !== 'Backspace') {
            if (nxt === 'submit') {
                setTimeout(() => {
                    this.submitBoxNUmber();
                }, 1000);
            } else {
                setTimeout(() => {
                    $('#' + nxt).focus();
                }, 100);
            }
        }
    }

    logoutUser() {
        console.log('called');
        //   this.loginService.logoutUser().subscribe((data: any) => {
        localStorage.removeItem('token');
        localStorage.removeItem('login_data');
        this.router.navigateByUrl('/Login');
        //   });
      }

    submitBoxNUmber() {
        const boxNumber = this.nums[0] + '' + this.nums[1] + this.nums[2] + this.nums[3];
        // if (boxNumber.length === 4) {
        this.boxService.getProduct(boxNumber).subscribe((data: any) => {
            debugger //2633
            localStorage.setItem('boxNumber', boxNumber);
            localStorage.setItem('boxValue', JSON.stringify(data));
            this.router.navigate(['/home']);
        }, (err) => {
            // alert(err.error.message);
                this.nums[0] = '';
                this.nums[1] = '';
                this.nums[2] = '';
                this.nums[3] = '';
                this.toastr.success('Error!', err.error.message);
                this.successMessage = '';
                this.errorMessage = err.error.message;
        });
        // }
    }
}
