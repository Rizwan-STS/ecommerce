import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AppService} from 'src/app/app.service';

declare var Swiper: any;
declare var $: any;

@Component({
    selector: 'app-Listing_Products',
    templateUrl: './Listing_Products.component.html',
    styleUrls: ['./Listing_Products.component.scss']
})
export class ListingProductsComponent implements OnInit, AfterViewInit {
    displaytype = 'box';
    swiper;
    products = [];

    constructor(private appService: AppService) {
        for (let i = 1 ; i<=12;i++) {
            this.products.push({
                image: 'assets/img/img-' + i + '.png',
                name: 'Berry Bar 30 gm',
                price: '30',
                ratings: 4.7,
                quantity: 0,
            })
        }
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

    AddtoCart() {
        $('#myModal1').modal("show")
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
