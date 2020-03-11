import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Constant } from '../../Constants';
import { CartService } from '../cart.service';
import { BoxService } from '../Listing_Products/box.service';
import { isNullOrUndefined } from 'util';
import { interval } from 'rxjs';
import { EmbryoService } from '../Embryo.service';
import { NotificationService } from 'wsuite-notification';
import { LoginService } from 'src/app/Login/login.service';
import { SignUpService } from 'src/app/Sign_Up/Signup.service';

declare var $: any;
declare var google: any;
declare var Razorpay: any;

@Component({
  selector: 'app-My_Cart_Payment',
  templateUrl: './My_Cart_Payment.component.html',
  styleUrls: ['./My_Cart_Payment.component.scss'],
  providers: [BoxService, CartService, EmbryoService, LoginService, SignUpService]
})
export class MyCartPaymentComponent implements OnInit {

  showPromoCode = 0;
  products: any;
  allProducts: any = [];
  productsArray: any;
  promoCodeEnt;
  carlistUpdated;
  isChanged = false;
  promoType;
  quantityArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  popupResponse: any;
  tipamount = 0;
  mobilenumber;
  promoDiscount = 0;
  discountAmount = 0;
  successMessage;
  errorMessage;
  imageWidth;
  imageHeight;
  screenWidth;
  boxNum = '';
  isCheckout = false;
  promocodes;
  usname;
  otp;
  showscreen = 5;
  navigations = {
    navigationUrl: '/home',
    navigationName: 'Home',
  }
  entireData;

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
  constructor(public embryoService: EmbryoService,
    public loginService: LoginService,
    public signupService: SignUpService,
    private cartService: CartService,
    public boxService: BoxService,
    private router: Router, private appService: AppService,
    private cdRef: ChangeDetectorRef, private activatedRoute: ActivatedRoute
    , private toastr: NotificationService) { }


  ngOnInit() {
    if (this.activatedRoute.snapshot.queryParams.callback) {
      if (this.activatedRoute.snapshot.queryParams.callback === 'login') {
        setTimeout(() => {
          this.checkout();
        }, 2000);
      }
    }
    setInterval(() => {
      this.HandLing();

    }, 1000);
    localStorage.setItem('checkoutClicked', "true");
    localStorage.removeItem('checkoutClicked');
    this.allProducts = this.embryoService.localStorageCartProducts;
    console.log(this.allProducts);
    this.tipamount = parseFloat(localStorage.getItem('tipamount'));
    this.promoCodeEnt = localStorage.getItem('promocode');
    if (!isNullOrUndefined(this.promoCodeEnt)) {
      this.checkPromoCode();
    }
    console.log(this.tipamount);
    if (isNullOrUndefined(this.tipamount) || isNaN(this.tipamount)) {
      this.tipamount = 0;
    }
    setTimeout(() => {
      this.getLocation();
    }, 500);
    console.log(localStorage.getItem('boxNumber'));
    if (isNullOrUndefined(localStorage.getItem('boxNumber')) || localStorage.getItem('boxNumber') === '') {
      localStorage.removeItem('cart_item');
      localStorage.setItem('cart_item', '[]');
    }
    if (localStorage.getItem('boxNumber') != null) {
      this.boxNum = localStorage.getItem('boxNumber');
      if (this.boxNum != null && this.boxNum !== '') {
        this.getProducts(false);
      }
    }
    interval(2 * 60).subscribe(x => {
      if (this.embryoService.productRemoved) {
        this.embryoService.productRemoved = false;
        this.allProducts = this.embryoService.localStorageCartProducts;
      }
    });
    this.getPromocodes();
  }

  error(errormessage) {
    // this.toastr.success('Error!', errormessage);
  }

  BackButton() {
    sessionStorage.setItem('doNotDisaplayDialog', 'true');
    this.router.navigate(['/home']);
  }

  showPromoCodeVal(val) {
    if(this.promocodes && this.promocodes.amount){
      this.showPromoCode = val;
    }
  }
  getPromocodes() {
    this.promocodes = [];
    this.cartService.getPromocodes(localStorage.getItem('boxNumber')).subscribe((data: any) => {
      this.promocodes = data.data;
      console.log('Promocdode is ', this.promocodes)
    });
  }

  public getProducts(isFromCheckout) {
    let isUpdated = false;
    if (!isNullOrUndefined(this.boxNum)) {
      Constant.ROOT_LOADER = true;
      this.boxService.getProduct(this.boxNum).subscribe((data: any) => {
        setTimeout(() => {
          Constant.ROOT_LOADER = false;
        }, 500);
        if (data != null && data.data != null) {
          this.entireData = data.data;
          localStorage.removeItem('response');
          this.productsArray = data.data.adminProductsResponseModels;
          localStorage.setItem('maxFreeQuant', data.data.maxFree);
          const allObjs: any[] = !isNullOrUndefined(localStorage.getItem('cart_item')) ? JSON.parse(localStorage.getItem('cart_item')) : [];
          for (let i = 0; i < allObjs.length; i++) {
            console.log(allObjs[i]);
            let isExist = false;
            for (let j = 0; j < this.productsArray.length; j++) {
              if (this.productsArray[j].id === allObjs[i].id) {
                isExist = true;
                break;
              }
            }
            if (!isExist) {
              this.carlistUpdated = 'Your cart list is updated please recheck your cart list and continue to checkout.!';
              isUpdated = true;
              document.body.scrollTop = 0;
              allObjs.splice(i, 1);
            }
          }
          if (isUpdated) {
            this.allProducts = allObjs;
            localStorage.setItem('cart_item', JSON.stringify(allObjs));
            this.embryoService.calculateLocalCartProdCounts();
          }
          if (isFromCheckout && !isUpdated) {
            this.checkout();
          }
        }
      });
    }

  }

  ngAfterViewChecked(): void {
    this.imageWidth = 556;
    this.imageHeight = 700;
    this.screenWidth = screen.availWidth;
    if (screen.availWidth < 500) {
      this.imageWidth = 85;
      this.imageHeight = 150;
    }
    this.cdRef.detectChanges();
    /*this.LoadJS('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js');*/
    this.LoadJS('https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.2/jquery-confirm.min.js');
  }

  public removeProduct(value: any) {
    this.getPopupResponse(this.popupResponse, value)
  }

  public getPopupResponse(response, value) {
    this.embryoService.removeLocalCartProduct(value);
  }

  public clearAll() {
    localStorage.removeItem("cart_item");
    this.allProducts = [];
  }

  checkQuantity(prod) {
    console.log(prod);
    if (prod.quantity < prod.adminProductsResponseModels.selectedquantity) {
      prod.adminProductsResponseModels.selectedquantity = prod.quantity;
    }
  }

  getLocation() {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        // Success function
        showPosition,
        // Error function
        errorCallback,
        // Options. See MDN for details.
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }

    function errorCallback(error) {
      localStorage.setItem('locationerror', JSON.stringify(error));
    }

    function showPosition(position) {

      const isMobile = {
        Android: () => {
          return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: () => {
          return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: () => {
          return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: () => {
          return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: () => {
          return navigator.userAgent.match(/IEMobile/i);
        },
        any: () => {
          return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
      };
      const pos = {};
      pos['accuracy'] = position.coords.accuracy;
      pos['altitude'] = position.coords.altitude;
      pos['altitudeAccuracy'] = position.coords.altitudeAccuracy;
      pos['heading'] = position.coords.heading;
      pos['latitude'] = position.coords.latitude;
      pos['longitude'] = position.coords.longitude;
      pos['speed'] = position.coords.speed;
      pos['platform'] = (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) ? 'Mac' : ((navigator.platform.indexOf('Win') > -1) ? 'Windows' : '');
      pos['platform_javascript'] = isMobile.any() ? isMobile.any()[0] : pos['platform'];
      const geocoder = new google.maps.Geocoder;
      const latlng = { lat: position.coords.latitude, lng: position.coords.longitude };
      geocoder.geocode({ 'location': latlng }, function (results, status) {
        if (status === 'OK') {
          if (results[0]) {
            pos['location_name'] = results[0].formatted_address;
            localStorage.setItem('myposition', JSON.stringify(pos));
          } else {
            console.log('No results found');
          }
        } else {
          console.log('Geocoder failed due to: ' + status);
        }
      });
      localStorage.setItem('myposition', JSON.stringify(pos));
    }
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

  public calculatBuyQuant(product: any, value: any) {

    let price = 0;
    product.adminProductsResponseModels.selectedquantity = value;
    value = parseInt(value);
    let tbQ = 0;
    if (product.adminProductsResponseModels.buyQuant === 0 || product.adminProductsResponseModels.discountQuant === 0 || product.adminProductsResponseModels.discountPercent === 0) {
      price = product.adminProductsResponseModels.mainprice * value;
      tbQ = tbQ + value - product.maxFree;
    } else {
      let totPQ = value - product.maxFree;
      if (totPQ > 0) {
        if (product.adminProductsResponseModels.buyQuant !== 0) {
          while (totPQ !== 0) {
            let mp = 0;
            let dp = 0;
            const mpQ = totPQ - product.adminProductsResponseModels.buyQuant;
            if (mpQ > 0) {
              mp = product.adminProductsResponseModels.mainprice * product.adminProductsResponseModels.buyQuant;
              tbQ = tbQ + product.adminProductsResponseModels.buyQuant;
              const dpQ = mpQ - product.adminProductsResponseModels.discountQuant;
              if (dpQ > 0) {
                dp = (product.adminProductsResponseModels.mainprice * (100 - product.adminProductsResponseModels.discountPercent) / 100) * product.adminProductsResponseModels.discountQuant;
                totPQ = dpQ;
              } else {
                dp = (product.adminProductsResponseModels.mainprice * (100 - product.adminProductsResponseModels.discountPercent) / 100) * mpQ;
                totPQ = 0;
              }

            } else {
              mp = product.adminProductsResponseModels.mainprice * totPQ;
              tbQ = tbQ + totPQ;
              totPQ = 0;
            }
            price = price + mp + dp;
          }
        } else {
          price = price + product.adminProductsResponseModels.mainprice * totPQ;
        }
      }
    }
    return tbQ;
  }

  public calculatBuyPrice(product: any, value: any) {

    let price = 0;
    product.adminProductsResponseModels.selectedquantity = value;
    value = parseInt(value);
    let tbQ = 0;
    if (product.adminProductsResponseModels.buyQuant === 0 || product.adminProductsResponseModels.discountQuant === 0 || product.adminProductsResponseModels.discountPercent === 0) {
      let totPQ = value - product.maxFree;
      if (totPQ > 0) {
        if (product.adminProductsResponseModels.buyQuant !== 0) {
          while (totPQ !== 0) {
            let mp = 0;
            let dp = 0;
            const mpQ = totPQ - product.adminProductsResponseModels.buyQuant;
            if (mpQ > 0) {
              mp = product.adminProductsResponseModels.mainprice * product.adminProductsResponseModels.buyQuant;
              tbQ = tbQ + product.adminProductsResponseModels.buyQuant;
              const dpQ = mpQ - product.adminProductsResponseModels.discountQuant;
              if (dpQ > 0) {
                dp = (product.adminProductsResponseModels.mainprice * (100 - product.adminProductsResponseModels.discountPercent) / 100) * product.adminProductsResponseModels.discountQuant;
                totPQ = dpQ;
              } else {
                dp = (product.adminProductsResponseModels.mainprice * (100 - product.adminProductsResponseModels.discountPercent) / 100) * mpQ;
                totPQ = 0;
              }

            } else {
              mp = product.adminProductsResponseModels.mainprice * totPQ;
              tbQ = tbQ + totPQ;
              totPQ = 0;
            }
            price = price + mp + dp;
          }
        } else {
          price = price + product.adminProductsResponseModels.mainprice * totPQ;
        }
      }
    } else {
      let totPQ = value - product.maxFree;
      if (totPQ > 0) {
        if (product.adminProductsResponseModels.buyQuant !== 0) {
          while (totPQ !== 0) {
            let mp = 0;
            let dp = 0;
            const mpQ = totPQ - product.adminProductsResponseModels.buyQuant;
            if (mpQ > 0) {
              mp = product.adminProductsResponseModels.mainprice * product.adminProductsResponseModels.buyQuant;
              tbQ = tbQ + product.adminProductsResponseModels.buyQuant;
              const dpQ = mpQ - product.adminProductsResponseModels.discountQuant;
              if (dpQ > 0) {
                dp = (product.adminProductsResponseModels.mainprice * (100 - product.adminProductsResponseModels.discountPercent) / 100) * product.adminProductsResponseModels.discountQuant;
                totPQ = dpQ;
              } else {
                dp = (product.adminProductsResponseModels.mainprice * (100 - product.adminProductsResponseModels.discountPercent) / 100) * mpQ;
                totPQ = 0;
              }

            } else {
              mp = product.adminProductsResponseModels.mainprice * totPQ;
              tbQ = tbQ + totPQ;
              totPQ = 0;
            }
            price = price + mp;
          }
        } else {
          price = price + product.adminProductsResponseModels.mainprice * totPQ;
        }
      }
    }
    return price;
  }

  public calculatFreeQuant(product: any, value: any) {
    let price = 0;
    product.adminProductsResponseModels.selectedquantity = value;
    value = parseInt(value);
    let tbQ = 0;
    if (product.adminProductsResponseModels.buyQuant == 0 || product.adminProductsResponseModels.discountQuant == 0 || product.adminProductsResponseModels.discountPercent == 0) {
      price = product.adminProductsResponseModels.mainprice * value;
    } else {
      let totPQ = value - product.maxFree;
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
                tbQ = tbQ + product.adminProductsResponseModels.discountQuant;
              } else {
                dp = (product.adminProductsResponseModels.mainprice * (100 - product.adminProductsResponseModels.discountPercent) / 100) * mpQ;
                totPQ = 0;
                tbQ = tbQ + mpQ;
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
    }
    return tbQ;
  }

  public calculateTotalPrice() {
    let subtotal = 0;
    let quant = 0;
    let cartOb: any = JSON.parse(localStorage.getItem('cart_item')) || [];
    if (cartOb && cartOb.length > 0) {
      for (let product of cartOb) {
        if (product.productType == 'Sample') {
          if (product.adminProductsResponseModels.selectedquantity > product.maxFree) {
            quant = product.adminProductsResponseModels.selectedquantity - product.maxFree;
          } else {
            quant = 0;
          }
        } else {
          quant = product.adminProductsResponseModels.selectedquantity;
        }
        subtotal = this.getPricingSingle(quant, product, subtotal);
      }
      return subtotal;
    }
    return subtotal;

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

  public checkout() {
    this.isCheckout = true;
    if (!localStorage.getItem('token')) {
      // this.router.navigate(['./Login'], { queryParams: { callback: 'cart' } });
      this.errorMessage = 'Login to Continue';
      this.showscreen = 1;
      this.successMessage = '';
      return;
    }
    // this.getLocation();
    let position: any = null;
    if (localStorage.getItem('myposition')) {
      position = JSON.parse(localStorage.getItem('myposition'));
      console.log('latitude ==>' + position.latitude);
      console.log('longitude ==>' + position.longitude);
    }
    const subtotal = 0;
    const selectedCheckoutProduct: any = [];
    const cartOb: any = JSON.parse(localStorage.getItem('cart_item')) || [];
    if (cartOb && cartOb.length > 0) {
      for (const product of cartOb) {
        if (product.productType === 'Sample') {
          product.adminProductsResponseModels.selectedquantity = parseInt(product.adminProductsResponseModels.selectedquantity);
          let hasMore = false;
          const boxId = product.id;
          const prodId = product.adminProductsResponseModels.id;
          const productType = product.productType;
          let selQuant = 0;
          if (isNullOrUndefined(product.maxFree)) {
            product.maxFree = 0;
          }
          if (product.adminProductsResponseModels.selectedquantity > product.maxFree) {
            selQuant = product.maxFree;
            hasMore = true;
          } else {
            selQuant = product.adminProductsResponseModels.selectedquantity;
          }
          const boxProductId = product.id;
          const prod: any = {
            'prodId': prodId,
            'productType': productType,
            'selQuant': selQuant,
            'boxProductId': boxProductId
          };
          if (product.maxFree !== 0) {
            selectedCheckoutProduct.push(prod);
          }
          if (hasMore) {
            const boxId1 = product.id;
            const prodId1 = product.adminProductsResponseModels.id;
            const productType1 = 'Paid';
            let selQuant1 = 0;
            selQuant1 = product.adminProductsResponseModels.selectedquantity - product.maxFree;
            const boxProductId1 = product.paidId;
            const prod1: any = {
              'prodId': prodId,
              'productType': productType1,
              'selQuant': selQuant1,
              'boxProductId': boxProductId1
            };
            selectedCheckoutProduct.push(prod1);
          }
        } else {
          product.adminProductsResponseModels.selectedquantity = parseInt(product.adminProductsResponseModels.selectedquantity);
          const boxId = product.id;
          const prodId = product.adminProductsResponseModels.id;
          const productType = product.productType;
          let selQuant = 0;
          selQuant = product.adminProductsResponseModels.selectedquantity;
          const boxProductId = product.id;
          const prod: any = {
            'prodId': prodId,
            'productType': productType,
            'selQuant': selQuant,
            'boxProductId': boxProductId
          };
          selectedCheckoutProduct.push(prod);
        }
      }
      if (isNaN(this.tipamount)) {
        this.tipamount = 0;
      }
      const requestObj: any = {
        'tipAmount': this.tipamount,
        'boxId': localStorage.getItem('boxNumber'),
        'promoDiscount': this.promoDiscount,
        'promoCode': this.promoCodeEnt,
        'selectedProducts': selectedCheckoutProduct,
        'position': position
      };
      console.log(requestObj);
      this.PayThisAmount(requestObj);
    }
  }

  PayThisAmount(modal) {
    const profile = JSON.parse(localStorage.getItem('login_data'));
    const totAmnt = this.getTotalPrice() * 100;
    if (totAmnt === 0) {
      modal['paymentId'] = 'FREE_PRODUCT';
      localStorage.setItem('response', JSON.stringify(modal));
      const response = JSON.parse(localStorage.getItem('response'));
      this.cartService.checkout(response).subscribe((data: any) => {
        localStorage.setItem('mainOrderId', data.data);
        this.HandLing();
        this.errorMessage = null;
        this.isCheckout = false;
        Constant.ROOT_LOADER = false;
      }, (error) => {
        this.isCheckout = false;
        Constant.ROOT_LOADER = false;
        this.error(error.error.message);
        this.errorMessage = error.error.message;
        this.successMessage = null;
        window.scrollTo(0, 0);
      });
    } else {
      const options = {
        'key': 'rzp_live_BDhgtvdfBGLtPs',
        // 'key': 'rzp_test_I8Vwds9E8OTG1d',
        // 'key': 'rzp_test_vkOkSpit7MKCcD',
        // 'key': 'rzp_live_KBRcQhpDi7EcNy',
        'amount': totAmnt, // 1000 paise = INR 10
        'name': 'RIDE KART',
        'description': 'Order Payment',
        'image': 'https://ridekaart.com/assets/images/logo1.png',
        'handler': function (response) {
          modal['paymentId'] = response.razorpay_payment_id;
          localStorage.setItem('response', JSON.stringify(modal));
        },
        'prefill': {
          'name': (profile && profile.name) ? profile.name : 'RideKart Customer',
          'contact': (profile && profile.name) ? profile.phonenumber : '9999999999'
        },
        'notes': {
          'address': 'Ridekart Customer Address'
        },
        'theme': {
          'color': '#528FF0'
        }
      };
      localStorage.setItem('response', JSON.stringify(modal));
      const response = JSON.parse(localStorage.getItem('response'));
      this.cartService.checkout(modal).subscribe((data: any) => {
        localStorage.setItem('mainOrderId', data.data);
        this.errorMessage = null;
        const rzp1 = new Razorpay(options);
        rzp1.open();
        this.isCheckout = false;
        Constant.ROOT_LOADER = false;
      }, (error) => {
        this.isCheckout = false;
        Constant.ROOT_LOADER = false;
        this.error(error.error.message);
        this.errorMessage = error.error.message;
        this.successMessage = null;
        window.scrollTo(0, 0);
      });
    }
  }

  HandLing() {
    const response = JSON.parse(localStorage.getItem('response'));
    if (response) {
      if (response.paymentId) {
        console.log(localStorage.getItem('mainOrderId'));
        this.cartService.checkoutConfirm(response.paymentId, localStorage.getItem('mainOrderId')).subscribe((data: any) => {
          const cartOb: any = JSON.parse(localStorage.getItem('cart_item')) || [];
          if (cartOb && cartOb.length > 0) {
            for (const product of cartOb) {
              product.adminProductsResponseModels.selectedquantity = 0;
            }
          }
          localStorage.removeItem('cart_item');
          localStorage.removeItem('cart_item');
          localStorage.removeItem('tipamount');
          localStorage.removeItem('promocode');
          this.embryoService.calculateLocalCartProdCounts();

          this.errorMessage = null;
          Constant.ROOT_LOADER = false;
          localStorage.removeItem('response');
          localStorage.removeItem('cart_item');
          // $.confirm({
          //   title: 'Success',
          //   content: 'Your order has been placed successfully. The driver will handover your order when it is safe to do so.<br/><br/> For support contact 9742046886.',
          //   type: 'green',
          //   typeAnimated: true,
          //   buttons: {
          //     thankYou: {
          //       text: 'Thank You!',
          //       btnClass: 'btn-green',
          //       action: function () {
          //       }
          //     }/*,
          //   close: function () {
          //   }*/
          //   }
          // });
          this.router.navigate(['/Congratulations']);
        }, (error) => {
          Constant.ROOT_LOADER = false;
          this.error(error.error.message);
          this.errorMessage = error.error.message;
          this.successMessage = null;
          window.scrollTo(0, 0);
        });
      }
      localStorage.removeItem('response');
    } else {
    }
  }

  LoadJS(file) {
    // DOM: Create the script element
    const jsElm = document.createElement('script');
    // set the type attribute
    jsElm.type = 'application/javascript';
    // make the script element load file
    jsElm.src = file;
    // finally insert the element to the body element in order to load the script
    document.body.appendChild(jsElm);
  }

  tipPrice(event) {

    this.tipamount = parseFloat(event.target.value);
    if (isNaN(this.tipamount)) {
      this.tipamount = 0;
    } else {
      console.log(event);
      console.log(this.tipamount);
    }
    localStorage.setItem('tipamount', this.tipamount + '');
  }

  public getTotalPrice() {
    let total = 0;
    let quant = 0;

    const cartOb: any = JSON.parse(localStorage.getItem('cart_item')) || [];
    if (cartOb && cartOb.length > 0) {
      for (const product of cartOb) {
        if (product.productType == 'Sample') {
          quant = product.adminProductsResponseModels.selectedquantity - product.maxFree;
          if (quant < 0) {
            quant = 0;
          }
        } else {
          quant = product.adminProductsResponseModels.selectedquantity;
        }
        total = this.getPricingSingle(quant, product, total);
      }
      if (this.promoDiscount != null) {
        if (this.promoType != null) {
          if (this.promoType === 'Percent') {
            this.discountAmount = (total * this.promoDiscount) / 100;
          } else {
            this.discountAmount = this.promoDiscount;
          }
          if (this.discountAmount > 15) {
            this.discountAmount = 15;
          }
        }
      }
      total = total - this.discountAmount;
      total = total + (parseFloat(this.tipamount + ''));
      if (total < 0) {
        return 0;
      }
      return total;
    }
    if (total < 0) {
      return 0;
    } else {
      return total;
    }

  }

  selectPromo() {
    this.promoCodeEnt = this.promocodes.name;
  }

  changePromoVal() {
    this.promoCodeEnt = this.promocodes.name;
  }

  removePromoCode() {
    localStorage.removeItem('promocode');
    this.promoCodeEnt = '';
    this.showPromoCode = 0;
  }
  checkPromoCode() {
    const boxNumber = localStorage.getItem('boxNumber');
    if (this.promoCodeEnt === '') {
      this.promoDiscount = 0;
      this.successMessage = '';
    } else {
      this.cartService.addPromoCode(this.promoCodeEnt, boxNumber).subscribe((data: any) => {
        this.successMessage = 'Promo offer applied';
        this.showPromoCode = 2;
        this.errorMessage = null;
        localStorage.setItem('promocode', this.promoCodeEnt);
        this.promoDiscount = data.message.discountValue;
        this.promoType = data.message.type;
        this.showPromoCode = 2;
        Constant.ROOT_LOADER = false;
      }, (error) => {
        Constant.ROOT_LOADER = false;
        localStorage.removeItem('promocode');
        this.errorMessage = error.error.message;
        this.toastr.success('Error!', error.error.message);
        this.successMessage = null;
      });
    }
  }

  public updateLocalCartProduct() {
    const cartOb: any = JSON.parse(localStorage.getItem('cart_item')) || [];
    this.embryoService.updateAllLocalCartProduct(cartOb);
    this.router.navigate(['/checkout']);
  }

  public getQuantityValue(product) {
    if (product.selectedquantity) {
      return product.selectedquantity;
    } else {
      return 1;
    }
  }

  performAuth() {
    if (this.showscreen === 1) {
      this.sendOtp();
    } else if (this.showscreen === 2) {
      this.login();
    } else if (this.showscreen === 3) {
      this.Signup();
    }
  }

  login() {
    let loginForm = {
      phonenumber: this.mobilenumber,
      password: this.otp,
      type: 'User'
    }
    Constant.ROOT_LOADER = true;
    this.loginService.login(loginForm).subscribe((data: any) => {
      this.successMessage = data.message;
      this.errorMessage = '';
      const response = data;
      Constant.ROOT_LOADER = false;
      if (response && response.data.token) {
        response.data.userid = btoa(response.data.userid);
        response.data.userType = btoa(response.data.userType);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('login_data', JSON.stringify(response.data));
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('login_data', JSON.stringify(response.data));
        this.checkout();
        this.showscreen = 5;
      }
    }, (error) => {
      Constant.ROOT_LOADER = false;
      this.toastr.success('Error!', error.error.message);
      this.errorMessage = error.error.message;
      this.successMessage = '';
      // this.loginForm.get('password').setValue('');
    });
  }

  registerWithUs(){
    this.showscreen = 3;
  }

  loginW(){
    this.showscreen = 1;
  }

  sendOtp() {
    Constant.ROOT_LOADER = true;
    let datObj: object = {
      'phonenumber': this.mobilenumber
    };
    this.loginService.loginOTP(datObj).subscribe((data: any) => {
      this.successMessage = 'OTP Sent';
      this.errorMessage = '';
      this.showscreen = 2;
      this.toastr.success('Success!', data.message);
      Constant.ROOT_LOADER = false;
    }, (error) => {
      Constant.ROOT_LOADER = false;
      this.otp = '';
      this.toastr.success('Error!', error.error.message);
      this.successMessage = '';
      this.errorMessage = error.error.message;
    });
  }

  Signup() {

    let signupForm = {
      phonenumber: this.mobilenumber,
      name: this.usname
    }
    Constant.ROOT_LOADER = true;
    this.signupService.signup(signupForm).subscribe((data: any) => {
      this.successMessage = data.message;
      this.errorMessage = '';
      const response = data;
      this.sendOtp();
      Constant.ROOT_LOADER = false;
    }, (error) => {
      Constant.ROOT_LOADER = false;
      this.toastr.success('Error!', error.error.message);

      this.successMessage = '';
      this.errorMessage = error.error.message;
    });
  }
}
