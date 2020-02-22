import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Constant } from 'src/Constants';
import { isNullOrUndefined } from 'util';
import { CartService } from '../cart.service';

declare var Swiper: any;

@Component({
    selector: 'app-Listing_Products_2',
    templateUrl: './Listing_Products_2.component.html',
    styleUrls: ['./Listing_Products_2.component.scss'],
    providers: [CartService]
})
export class ListingProducts2Component implements OnInit, AfterViewInit {
    swiper
    promocodes: any;
    successMessage;
    errorMessage;
    promoCodeEnt;
    promoDiscount;
    promoType;
    constructor(private appService: AppService, private cartService: CartService) {
    }

    ngOnInit() {
        this.getPromocodes();
    }

    checkPromoCode() {
        let boxNumber = localStorage.getItem('boxNumber');
        if (!isNullOrUndefined(boxNumber) || boxNumber != '') {
            this.cartService.addPromoCode(this.promocodes.name, boxNumber).subscribe((data: any) => {
                this.successMessage = 'Promo offer applied';
                this.errorMessage = null;
                this.promoCodeEnt = data.message.promocodename;
                localStorage.setItem('promocode', this.promoCodeEnt);
                this.promoDiscount = data.message.discountValue;
                this.promoType = data.message.type;
                // "Selected Promocode Applied"
                
            }, (error) => {
                localStorage.removeItem('promocode');
                this.errorMessage = error.error.message;
                this.successMessage = null;
                window.scrollTo(0, 0)
            });
        }
    }

    private getPromocodes() {
        this.cartService.getPromocodes(localStorage.getItem('boxNumber')).subscribe((data: any) => {
            setTimeout(() => {
            }, 500);
            this.promocodes = data.data;
        });
    }

    ngAfterViewInit(): void {
        try {
            if (Swiper) {
                this.InitSlider();
            }
        } catch (e) {
            setTimeout(() => {
                this.InitSlider();
            }, 200);
        }
    }

    InitSlider() {
        this.swiper = new Swiper('#product-slider', {
            slidesPerView: 4,
            spaceBetween: 30,

            navigation: {
                nextEl: '#next',
                prevEl: '#prev',
            },

            breakpoints: {
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
                640: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                },
                320: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                }
            }
        });
    }

}
