import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { EmbryoService } from 'src/app/Embryo.service';
declare var $: any;

@Component({
  selector: 'app-Header',
  templateUrl: './Header.component.html',
  styleUrls: ['./Header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Input()
  webTool: boolean;
  addShowCart = false
  allProducts: any = [];
  @Input()
  navigations = {
    navigationUrl : '',
    navigationName : '',
  }
  isLogin = false;
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
  headerLinks = [
      {
        name: 'My Profile',
        routerLink: '/Profile',
          // image: 'assets/img/user-pro.png'
      },
      {
        name: 'Orders',
        routerLink: '/MyOrders',
          // image: 'assets/img/box-nav-pro.png'
      },
      {
        name: 'My Cart',
        routerLink: '/MyCartPayment',
          // image: 'assets/img/cart-white-pro.png'
      },
      {
        name: 'About',
        routerLink: '/AboutUs',
          // image: 'assets/img/info-pro.png'
      },
      // {
      //   name: 'Terms & Condition',
      //   routerLink: '/TermsAndCondition',
      //     // image: 'assets/img/file-text-pro.png'
      // },
      // {
      //   name: 'Privacy Policy',
      //   routerLink: '/PrivacyPolicy',
      //     // image: 'assets/img/info-pro.png'
      // },
      // {
      //   name: 'FAQ',
      //   routerLink: '/FAQ',
      //     // image: 'assets/img/infod-pro.png'
      // },
      {
        name: 'Contact Us',
        routerLink: '/ContactUs',
          // image: 'assets/img/user-pro.png'
      },
      {
        name: 'Logout',
        click: 'logoutUser',
          // image: 'assets/img/user-pro.png'
      }
  ];
  intervals = null;

  constructor(public embryoService: EmbryoService,private router: Router,private appService: AppService) { }

  ngOnInit() {
    this.allProducts = this.embryoService.localStorageCartProducts;
    console.log(this.allProducts[0]);
    this.isLogin = !!localStorage.getItem('token');
    if (!this.isLogin) {
      this.headerLinks = [
          {
            name: 'Login',
            routerLink: '/Login',
          },
          {
            name: 'Register',
            routerLink: '/Register',
          },
      ]
    }
    this.intervals = setInterval(() => {
      this.allProducts = JSON.parse(localStorage.getItem("cart_item")) || [];
      // console.log('this.allProducts ', this.allProducts)
    }, 1000);
  }

  ngOnDestroy() {
        clearInterval(this.intervals);
  }

  hoverMouse() {
    this.addShowCart = true
  }

  viewCart(){
    this.router.navigate(['/MyCartPayment']);
  }

  public addToCartProduct(value: any) {
    this.embryoService.addToCart(value);

  }

  public removeTCart(value: any) {
    this.embryoService.removeToCart(value);
    this.allProducts = this.embryoService.localStorageCartProducts;
  }

  logoutUser() {
    console.log('called');
    //   this.loginService.logoutUser().subscribe((data: any) => {
    localStorage.removeItem('token');
    localStorage.removeItem('login_data');
    this.router.navigateByUrl('/Login');
    //   });
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
          // console.log('selectedquantity is ', qnt);
        }
      }
      if (qnt > 0) {
        // console.log('qnt is ', qnt);
        return qnt;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }

  toggelId() {
    $('#navbarSupportedContent1').slideToggle()
  }

  public calculateProductSinglePrice(product: any, value: any) {
    let price = 0;
    product.adminProductsResponseModels.selectedquantity = value;
    value = parseInt(value);
    if (product.productType === 'Paid') {
      if (product.adminProductsResponseModels.buyQuant === 0 || product.adminProductsResponseModels.discountQuant === 0 || product.adminProductsResponseModels.discountPercent == 0) {
        price = product.adminProductsResponseModels.mainprice * value;
      } else {
        price = this.getPricingSingle(value, product, price);
      }
      // var totQuant: number = product.adminProductsResponseModels.buyQuant + product.adminProductsResponseModels.discountQuant;
      // var multiplier: number = Math.floor(value / totQuant);
      // if (multiplier == 0) {
      //   price = product.adminProductsResponseModels.mainprice * value;
      // } else {
      //   let mainprice = product.adminProductsResponseModels.mainprice * multiplier * product.adminProductsResponseModels.buyQuant;
      //   let discountprice = (product.adminProductsResponseModels.mainprice * (100 - product.adminProductsResponseModels.discountPercent) / 100) * multiplier * product.adminProductsResponseModels.discountQuant;
      //   price = mainprice + discountprice;
      // }
    } else {
      if (value > product.maxFree) {
        const totalPaidProds = value - product.maxFree;
        if (product.adminProductsResponseModels.buyQuant === 0 || product.adminProductsResponseModels.discountQuant === 0 || product.adminProductsResponseModels.discountPercent === 0) {
          price = product.adminProductsResponseModels.mainprice * totalPaidProds;
        } else {
          price = this.getPricingSingle(totalPaidProds, product, price);
        }
      } else {
        price = 0;
      }
    }

    return price;
  }

  getPricingSingle(value, product, price) {
    let totPQ = value;
    if (totPQ > 0) {
      if (product.adminProductsResponseModels.buyQuant != 0) {
        while (totPQ != 0) {
          let mp = 0;
          let dp = 0;
          let mpQ = totPQ - product.adminProductsResponseModels.buyQuant;
          if (mpQ > 0) {
            mp = product.adminProductsResponseModels.mainprice * product.adminProductsResponseModels.buyQuant;
            let dpQ = mpQ - product.adminProductsResponseModels.discountQuant;
            if (dpQ > 0) {
              dp = (product.adminProductsResponseModels.mainprice * (100 - product.adminProductsResponseModels.discountPercent) / 100) * product.adminProductsResponseModels.discountQuant;
              totPQ = dpQ;
            } else {
              dp = (product.adminProductsResponseModels.mainprice * (100 - product.adminProductsResponseModels.discountPercent) / 100) * mpQ;
              totPQ = 0;
            }
          } else {
            mp = product.adminProductsResponseModels.mainprice * totPQ;
            totPQ = 0;
          }
          price = price + mp + dp;
        }
      } else {
        price = price + product.adminProductsResponseModels.mainprice * totPQ;
      }
    }
    return price;
  }

}
