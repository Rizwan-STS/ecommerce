import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AppService} from 'src/app/app.service';

declare var Swiper: any;

@Component({
    selector: 'app-Listing_Products_2',
    templateUrl: './Listing_Products_2.component.html',
    styleUrls: ['./Listing_Products_2.component.scss']
})
export class ListingProducts2Component implements OnInit, AfterViewInit {
    swiper

    constructor(private appService: AppService) {
    }

    ngOnInit() {
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
