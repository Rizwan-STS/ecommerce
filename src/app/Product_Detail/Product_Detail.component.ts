import {Component, OnInit} from '@angular/core';
import {AppService} from 'src/app/app.service';
import {ActivatedRoute, Router} from "@angular/router";
declare var $: any;

@Component({
    selector: 'app-Product_Detail',
    templateUrl: './Product_Detail.component.html',
    styleUrls: ['./Product_Detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
    productDetails = null;
    productYoMayLikeDetails= [];
    selectedProduct = null;

    constructor(private appService: AppService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.data.subscribe((data) => {
            this.productDetails = data.ProductDetails[0].data;
            this.productYoMayLikeDetails = data.ProductDetails[1].data.adminBoxProductsResponseModels;
            debugger
            this.selectImage(this.productDetails.adminProductsResponseModels.productsImagesResponseModel[0]);
        });
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

}
