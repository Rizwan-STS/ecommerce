import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AppService} from 'src/app/app.service';
import {ActivatedRoute, Router} from "@angular/router";
import { EmbryoService } from 'src/app/Embryo.service';
declare var $: any;

@Component({
    selector: 'app-Product_Detail',
    templateUrl: './Product_Detail.component.html',
    styleUrls: ['./Product_Detail.component.scss']
})
export class ProductDetailComponent implements OnInit, AfterViewInit {
    productDetails = null;
    productYoMayLikeDetails= [];
    selectedProduct = null;
    navigations = {
        navigationUrl : '/home',
        navigationName : 'Home',
    }
    constructor(private appService: AppService, private route: ActivatedRoute, private embryoService: EmbryoService) {
    }

    ngOnInit() {
        this.route.data.subscribe((data) => {
            this.productDetails = data.ProductDetails[0].data;
            this.productYoMayLikeDetails = data.ProductDetails[1].data.adminBoxProductsResponseModels;
            setTimeout(() => {
                $("html, body").animate({ scrollTop: 0 }, 600);
            }, 250);
            this.selectImage(this.productDetails.adminProductsResponseModels.productsImagesResponseModel[0]);
        });
    }

    public addToCartVal(value) {
        debugger
        this.embryoService.addToCart(value);
        // this.AddtoCart(value);
    }

    public addToCartProduct(value: any) {
        this.embryoService.addToCart(value);
    }

    public removeTCart(value: any) {
        this.embryoService.removeToCart(value);
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

    selectImage(img) {
        for (let image of this.productDetails.adminProductsResponseModels.productsImagesResponseModel) {
            image.selected = false;
        }
        img.selected = true;
    }

    AddtoCart(p) {
        this.selectedProduct = p;
        $('#myModal1').modal("show")
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            $("html, body").animate({ scrollTop: 0 }, 600);
        }, 250);
    }

}
