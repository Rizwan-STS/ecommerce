import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { isNullOrUndefined } from "util";
import { BoxService } from "./box.service";
import { CartService } from "../cart.service";
import { EmbryoService } from 'src/app/Embryo.service';
import {ActivatedRoute, Router} from "@angular/router";
import { NotificationService } from 'wsuite-notification';

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
    promoCodeEnt;
    successMessagePromo;
    promoDiscount;
    promoType;
    navigations = {
        navigationUrl : '/BoxNumberPage',
        navigationName : 'Box number',
    }
    allProducts= [];
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

    constructor(public embryoService: EmbryoService
        , private toastr: NotificationService, private appService: AppService,private route: Router, private boxService: BoxService, private cartService: CartService, private activatedRoute: ActivatedRoute) {
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
        if (product.adminProductsResponseModels.prQuantity) {
            let qty = +(product.adminProductsResponseModels.prQuantity);
            qty += 1
            product.adminProductsResponseModels.prQuantity = qty;
        } else {
            product.adminProductsResponseModels.prQuantity = 1
        }
    }

    MinusProductQt(product) {
        if (product.adminProductsResponseModels.prQuantity) {
            let qty = +(product.adminProductsResponseModels.prQuantity);
            qty -= 1
            qty = qty < 0 ? 0 : qty;
            product.adminProductsResponseModels.prQuantity = qty;
        } else {
            product.adminProductsResponseModels.prQuantity = 0
        }
    }

    checkPromoCode() {
        let boxNumber = localStorage.getItem('boxNumber');
        if (!isNullOrUndefined(boxNumber) || boxNumber != '') {
            this.cartService.addPromoCode(this.promocodes.name, boxNumber).subscribe((data: any) => {
                this.successMessagePromo = 'Promo offer applied';
                this.errorMessage = null;
                this.promoCodeEnt = data.message.promocodename;
                localStorage.setItem('promocode', this.promoCodeEnt);
                this.promoDiscount = data.message.discountValue;
                this.promoType = data.message.type;
                // "Selected Promocode Applied"

            }, (error) => {
                localStorage.removeItem('promocode');
                this.errorMessage = error.error.message;
                this.successMessagePromo = null;
                window.scrollTo(0, 0)
            });
        }
    }

    public fetchQunt(data: any) {
        if (data) {
            let products: any;
            products = JSON.parse(localStorage.getItem('cart_item')) || [];
            let qnt = 0;
            for (let i = 0; i < products.length; i++) {
                if (products[i].id === data.id) {
                    /*qnt = qnt + 1;*/
                    qnt = products[i].adminProductsResponseModels.selectedquantity;
                }
            }
            if (qnt > 0) {
                return qnt;
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    }


    public addToCartProduct(value: any) {
        this.embryoService.addToCart(value);
        this.allProducts = this.embryoService.localStorageCartProducts;
    }

    public removeTCart(value: any) {
        this.embryoService.removeToCart(value);
        this.allProducts = this.embryoService.localStorageCartProducts;
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
                this.toastr.success('Error!', error.error.message);
                this.successMessage = '';
                this.errorMessage = error.error.message;
                // this.successMessage = null;
                window.scrollTo(0, 0)
            });
        }

    }

    public addToCartVal(value) {
        debugger
        if (!value.addquantity) {
            value.addquantity = 1;
        } else {
            value.addquantity += 1;
        }
        this.embryoService.addToCart(value);
        // this.AddtoCart(value);
    }
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

    GetImage(product) {
        debugger
        return (product.productsImagesResponseModel && product.productsImagesResponseModel.length > 0) ? product.productsImagesResponseModel[0].idUrl : ''
    }

    private getPromocodes() {
        this.promocodes = null;
        this.cartService.getPromocodes(localStorage.getItem('boxNumber')).subscribe((data: any) => {
            this.promocodes = data.data;
        });
    }

    ngOnInit() {
        this.promoCodeEnt = localStorage.getItem('promocode');
        if (!localStorage.getItem('boxNumber')) {
            this.route.navigate(['/BoxNumberPage'])
        }
        this.getProducts();
        this.getBanner(localStorage.getItem('boxNumber'));
        this.allProducts = this.embryoService.localStorageCartProducts;
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
        this.allProducts = this.embryoService.localStorageCartProducts;
        $('#myModal1').modal("show")
    }

    HideModal() {
        $('#myModal1').modal("hide")
    }

    InitSlider() {
        this.swiper = new Swiper('#product-slider', {
            slidesPerView: 1,
            spaceBetween: 30,

            navigation: {
                nextEl: '#next',
                prevEl: '#prev',
            },

            breakpoints: {
                1024: {
                    slidesPerView: 1,
                    spaceBetween: 30,
                },
                768: {
                    slidesPerView: 1,
                    spaceBetween: 30,
                },
                640: {
                    slidesPerView: 1,
                    spaceBetween: 15,
                },
                320: {
                    slidesPerView: 1,
                    spaceBetween: 15,
                }
            }
        });
    }

}
