import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AppService} from 'src/app/app.service';
import {isNullOrUndefined} from "util";
import {BoxService} from "./box.service";
import {CartService} from "../cart.service";
<<<<<<< HEAD
import { EmbryoService } from 'src/app/Embryo.service';
=======
import {ActivatedRoute} from "@angular/router";
>>>>>>> 1222a2c35e95cef58c2544dca403396eb465c501

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
    selectedProduct = null;
    products = [];
    productsArray = [];
    promocodes = null;
    boxNum = null;
    productsBanner = [];

    isMobile() {
        const devices = [/Android/i,/BlackBerry/i,/iPhone|iPad|iPod/i,/Opera Mini/i,/IEMobile/i,/WPDesktop/i];
        let flag = false;
        for (const dev of devices) {
            if (navigator.userAgent.match(dev)) {
                flag = true;
            }
        }
        return flag;
        // if ()
    }

<<<<<<< HEAD
    constructor(
        public embryoService: EmbryoService,private appService: AppService, private boxService: BoxService, private cartService: CartService) {
=======
    constructor(private appService: AppService, private boxService: BoxService, private cartService: CartService, private activatedRoute: ActivatedRoute) {
>>>>>>> 1222a2c35e95cef58c2544dca403396eb465c501
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

    AddProductQt(product) {
        if (product.adminProductsResponseModels.prQuantity ) {
            let qty = +(product.adminProductsResponseModels.prQuantity );
            qty += 1
            product.adminProductsResponseModels.prQuantity = qty;
        } else {
            product.adminProductsResponseModels.prQuantity = 1
        }
    }

    MinusProductQt(product) {
        if (product.adminProductsResponseModels.prQuantity ) {
            let qty = +(product.adminProductsResponseModels.prQuantity );
            qty -= 1
            qty = qty < 0 ? 0 : qty;
            product.adminProductsResponseModels.prQuantity = qty;
        } else {
            product.adminProductsResponseModels.prQuantity = 0
        }
    }

    getProducts() {
        if (isNullOrUndefined(localStorage.getItem("boxNumber"))) {
        } else {
            let id = localStorage.getItem("boxNumber");
            if (localStorage.getItem('boxValue')) {
                const data = JSON.parse(localStorage.getItem('boxValue'));
                if (data != null && data.data != null) {
                    localStorage.removeItem('response');
                    // this.errorMessage = null;
                    this.productsArray = data.data.adminProductsResponseModels;
                    for (var j = 0; j < this.productsArray.length; j++) {
                        const adminProductsResponseModels = this.productsArray[j].adminProductsResponseModels;
                        adminProductsResponseModels.prQuantity = 0
                        this.productsArray[j].adminProductsResponseModels = adminProductsResponseModels;
                    }
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
            }
            this.boxService.getProduct(id).subscribe((data: any) => {
                if (data != null && data.data != null) {
                    localStorage.removeItem('response');
                    // this.errorMessage = null;
                    this.productsArray = data.data.adminProductsResponseModels;
                    for (var j = 0; j < this.productsArray.length; j++) {
                        const adminProductsResponseModels = this.productsArray[j].adminProductsResponseModels;
                        adminProductsResponseModels.prQuantity = 0
                        this.productsArray[j].adminProductsResponseModels = adminProductsResponseModels;
                    }
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

<<<<<<< HEAD
    public addToCartVal(value) {
        debugger
        this.embryoService.addToCart(value);
      }
=======
    getBanner(id) {
        this.boxService.getBanners(id).subscribe((data: any) => {
            if (data != null && data.data != null) {
                this.productsBanner = data.data;
                setTimeout(() => {
                    this.InitSlider();
                }, 200);
            }
        });

    }
>>>>>>> 1222a2c35e95cef58c2544dca403396eb465c501

    GetImage(product) {
        debugger
        return (product.productsImagesResponseModel && product.productsImagesResponseModel.length > 0) ?  product.productsImagesResponseModel[0].idUrl : ''
    }

    private getPromocodes() {
        this.promocodes = null;
        this.cartService.getPromocodes(localStorage.getItem('boxNumber')).subscribe((data: any) => {
            this.promocodes = data.data;
        });
    }

    ngOnInit() {
        this.getProducts();
        this.getBanner(localStorage.getItem('boxNumber'));
    }

    ngAfterViewInit(): void {
        /*try {
            if (Swiper) {
                this.InitSlider();
            }
        } catch (e) {
            setTimeout(() => {
                this.InitSlider();
            }, 200);
        }*/
    }

    AddtoCart(p) {
        this.selectedProduct = p;
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
