import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AppService} from 'src/app/app.service';
import {isNullOrUndefined} from "util";
import {BoxService} from "./box.service";
import {CartService} from "../cart.service";

declare var Swiper: any;
declare var $: any;

@Component({
    selector: 'app-Listing_Products',
    templateUrl: './Listing_Products.component.html',
    styleUrls: ['./Listing_Products.component.scss'],
    providers: [CartService, BoxService]
})
export class ListingProductsComponent implements OnInit, AfterViewInit {
    displaytype = 'box';
    swiper;
    products = [];
    productsArray: any;
    promocodes = null;
    boxNum = null;

    constructor(private appService: AppService, private boxService: BoxService, private cartService: CartService) {
        for (let i = 1; i <= 12; i++) {
            this.products.push({
                image: 'assets/img/img-' + i + '.png',
                name: 'Berry Bar 30 gm',
                price: '30',
                ratings: 4.7,
                quantity: 0,
            })
        }
    }

    getProducts() {
        if (isNullOrUndefined(localStorage.getItem("boxNumber"))) {
        } else {
            let id = localStorage.getItem("boxNumber");
            this.boxService.getProduct(id).subscribe((data: any) => {
                if (data != null && data.data != null) {
                    localStorage.removeItem('response');
                    // this.errorMessage = null;
                    this.productsArray = data.data.adminProductsResponseModels;
                    localStorage.setItem('maxFreeQuant', data.data.maxFree);
                    this.getPromocodes();
                    let allObjs: any[] = !isNullOrUndefined(localStorage.getItem('cart_item')) ? JSON.parse(localStorage.getItem('cart_item')) : [];
                    for (var i = 0; i < allObjs.length; i++) {
                        console.log(allObjs[i]);
                        let isExist: boolean = false;
                        for (var j = 0; j < this.productsArray.length; j++) {
                            if (this.productsArray[j].id == allObjs[i].id) {
                                isExist = true;
                                break;
                            }
                        }
                        if (!isExist) {
                            allObjs.splice(i, 1);
                        }
                    }
                    localStorage.setItem('cart_item', JSON.stringify(allObjs));
                    // this.embryoService.calculateLocalCartProdCounts();

                    // this.getBanner(id);
                }
            }, (error) => {
                localStorage.removeItem('promocode');
                localStorage.setItem('tip_amount', "0");
                localStorage.setItem('cart_item', "[]");
                // this.errorMessage = error.error.message;
                // this.successMessage = null;
                window.scrollTo(0, 0)
            });
        }

    }

    private getPromocodes() {
        this.promocodes = null;
        this.cartService.getPromocodes(this.boxNum).subscribe((data: any) => {
            this.promocodes = data.data;
        });
    }

    ngOnInit() {
        localStorage.setItem('boxNumber', '2633');
        this.getProducts();
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
