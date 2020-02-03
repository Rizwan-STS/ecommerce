import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
// import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';


interface Response {
  data: any;
}

@Injectable()
export class EmbryoService {

  sidenavOpen: boolean = false;
  paymentSidenavOpen: boolean = false;
  isDirectionRtl: boolean = false;
  featuredProductsSelectedTab: any = 0;
  newArrivalSelectedTab: any = 0;

  /**** Get currency code:- https://en.wikipedia.org/wiki/ISO_4217 *****/
  currency: string = 'INR';
  language: string = 'english';
 
  shipping: number = 12.95;
  tax: number = 27.95;

  products: any;

  localStorageCartProducts: any;
  productRemoved: any = false;
  localStorageWishlist: any;
  navbarCartCount: number = 0;
  navbarWishlistProdCount = 0;
  buyUserCartProducts: any;

  constructor(private http: HttpClient,
    // private toastyService: ToastyService,
    // private toastyConfig: ToastyConfig
  ) {

      // this.toastyConfig.position = "top-right";
      // this.toastyConfig.theme = "material";
    this.calculateLocalWishlistProdCounts();
    this.calculateLocalCartProdCounts();
  }

  public setCartItemDefaultValue(setCartItemDefaultValue) {
    let products: any;
    products = JSON.parse(localStorage.getItem("cart_item")) || [];

    localStorage.setItem("cart_item", JSON.stringify(products));
    this.calculateLocalCartProdCounts();
  }

  public reviewPopup(singleProductDetails, reviews) {
  }

  public confirmationPopup(message: string) {
   
  }

  public getProducts() {
    return this.products;
  }

  /*
     ----------  Cart Product Function  ----------
  */

  // Adding new Product to cart in localStorage
  public addToCart(data: any) {
    let products: any;
    let exhaustedProduct: boolean = false;
    products = JSON.parse(localStorage.getItem("cart_item")) || [];
    let productsLength = products.length;

    // let toastOption: ToastOptions = {
    //   title: "Adding Product To Cart",
    //   msg: "Product adding to the cart",
    //   showClose: true,
    //   timeout: 1000,
    //   theme: "material"
    // };
    let totalSampleQuant: number = 0;
    let toCheckSample = false;
    if (data.productType == 'Sample') {
      toCheckSample = true;
    }
    let checkSampleQuant: boolean = true;
    if (products.length > 0) {
      let found1 = products.some(function (el, index) {
        if (el.id == data.id) {
          if (toCheckSample) {
            if (el.adminProductsResponseModels.selectedquantity != null) {
              totalSampleQuant = totalSampleQuant + el.adminProductsResponseModels.selectedquantity;
            }
          } else {
            checkSampleQuant = false
          }
        }
      });
    } else {
      if (toCheckSample) {
        if (data.adminProductsResponseModels.selectedquantity != null) {
          totalSampleQuant = totalSampleQuant + data.adminProductsResponseModels.selectedquantity;
        }
      } else {
        checkSampleQuant = false
      }
    }
    if (checkSampleQuant && toCheckSample) {
      // let maxFre: number = parseInt(localStorage.getItem('maxFreeQuant'));
      let maxFre: number = data.maxFree + data.paidQuantity;
      if (totalSampleQuant > maxFre) {
        checkSampleQuant = true;
      } else {
        checkSampleQuant = false;
      }
    }
    // if (checkSampleQuant) {
    //   if (data.paidId != null && data.paidId != 0) {
    //     if (data.bpm != null) {
    //       this.addToCart(data.bpm);
    //     }else{

    //     }
    //   }
    // }
    if (checkSampleQuant && toCheckSample) {
      // toastOption.title = "Product Already Added";
      // toastOption.msg = "You have already added max available quantity";
      // this.toastyService.wait(toastOption);
    }
    else {
      let found = products.some(function (el, index) {
        if (el.id == data.id && el.adminProductsResponseModels) {
          let maxFre: number = data.maxFree + data.paidQuantity;
          if (el.adminProductsResponseModels && el.adminProductsResponseModels.selectedquantity && el.adminProductsResponseModels.selectedquantity >= maxFre) {
            exhaustedProduct = true;
            return false;
          }
          if (el.adminProductsResponseModels && !el.adminProductsResponseModels.selectedquantity) { el.adminProductsResponseModels.selectedquantity = 1 }
          products[index].adminProductsResponseModels['selectedquantity'] = el.adminProductsResponseModels.selectedquantity + 1;
          return true;
        }
      });
      if (!found && !exhaustedProduct) {
        data.adminProductsResponseModels.selectedquantity = 1;
        products.push(data);
      }

      if (productsLength == products.length) {
        if (exhaustedProduct) {
          // toastOption.title = "Product Already Added";
          // toastOption.msg = "You have already added max available quantity";
          // this.toastyService.wait(toastOption);
        } else {
          // toastOption.title = "Product Already Added";
          // toastOption.msg = "You have already added this product to cart list";
        }
      }
    }

    localStorage.setItem("cart_item", JSON.stringify(products));
    
    setTimeout(() => {
      this.calculateLocalCartProdCounts();
    }, 500);
  }

  // Adding new Product to cart in localStorage
  public removeToCart(data: any) {
    let products: any;
    let exhaustedProduct: boolean = false;
    products = JSON.parse(localStorage.getItem("cart_item")) || [];
    let productsLength = products.length;

    // let toastOption: ToastOptions = {
    //   title: "Adding Product To Cart",
    //   msg: "Product adding to the cart",
    //   showClose: true,
    //   timeout: 1000,
    //   theme: "material"
    // };
    debugger;
    let totalSampleQuant: number = 0;

    let found = products.some(function (el, index) {
      if (el.id == data.id && el.adminProductsResponseModels) {
        if (el.adminProductsResponseModels && el.adminProductsResponseModels.selectedquantity && el.adminProductsResponseModels.selectedquantity <= 0) {
          exhaustedProduct = true;
          return false;
        }
        if (el.adminProductsResponseModels && !el.adminProductsResponseModels.selectedquantity) {
          el.adminProductsResponseModels.selectedquantity = 1
        }
        products[index].adminProductsResponseModels['selectedquantity'] = el.adminProductsResponseModels.selectedquantity - 1;
        if(products[index].adminProductsResponseModels['selectedquantity'] == 0){
          products.splice(index, 1);
        }
        return true;
      }
    });
    if (!found && !exhaustedProduct) {
      products.push(data);
    }

    if (productsLength == products.length) {
      if (exhaustedProduct) {
        // toastOption.title = "Product Already Added";
        // toastOption.msg = "You have already added max available quantity";
      } else {
        // toastOption.title = "Product Quantity Reduced";
        // toastOption.msg = "Your cart quantity is reduced";
      }
    }

    // this.toastyService.wait(toastOption);
    setTimeout(() => {
      localStorage.setItem("cart_item", JSON.stringify(products));
      this.productRemoved = true; 
      this.calculateLocalCartProdCounts();
    }, 500);
  }

  public buyNow(data: any) {
    let products: any;
    products = JSON.parse(localStorage.getItem("cart_item")) || [];

    let found = products.some(function (el, index) {
      if (el.name == data.name) {
        if (!data.quantity) { data.quantity = 1 }
        products[index]['quantity'] = data.quantity;
        return true;
      }
    });
    if (!found) { products.push(data); }

    localStorage.setItem("cart_item", JSON.stringify(products));
    this.calculateLocalCartProdCounts();
  }

  public updateAllLocalCartProduct(products: any) {
    localStorage.removeItem('cart_item');

    localStorage.setItem("cart_item", JSON.stringify(products))
  }

  // returning LocalCarts Product Count
  public calculateLocalCartProdCounts() {
    this.localStorageCartProducts = null;
    this.localStorageCartProducts = JSON.parse(localStorage.getItem("cart_item")) || [];
    this.navbarCartCount = ((this.localStorageCartProducts).length);
  }

  // Removing cart from local
  public removeLocalCartProduct(product: any) {
    let products: any = JSON.parse(localStorage.getItem("cart_item"));

    for (let i = 0; i < products.length; i++) {
      if (products[i].id === product.id) {
        products.splice(i, 1);
        break;
      }
    }

    // let toastOption: ToastOptions = {
    //   title: "Remove Product From Cart",
    //   msg: "Product removing from cart",
    //   showClose: true,
    //   timeout: 1000,
    //   theme: "material"
    // };

    // this.toastyService.wait(toastOption);
    setTimeout(() => {
      // ReAdding the products after remove
      localStorage.setItem("cart_item", JSON.stringify(products));
      this.productRemoved = true;
      this.calculateLocalCartProdCounts();
    }, 500);
  }

  /*
     ----------  Wishlist Product Function  ----------
  */

  // Adding new Product to Wishlist in localStorage
  public addToWishlist(data: any) {

    // let toastOption: ToastOptions = {
    //   title: "Adding Product To Wishlist",
    //   msg: "Product adding to the wishlist",
    //   showClose: true,
    //   timeout: 1000,
    //   theme: "material"
    // };

    let products: any;
    products = JSON.parse(localStorage.getItem("wishlist_item")) || [];
    let productsLength = products.length;

    let found = products.some(function (el, index) {
      if (el.name == data.name) {
        if (!data.quantity) { data.quantity = 1 }
        products[index]['quantity'] = data.quantity;
        return true;
      }
    });
    if (!found) { products.push(data); }

    if (productsLength == products.length) {
      // toastOption.title = "Product Already Added";
      // toastOption.msg = "You have already added this product to wishlist";
    }

    // this.toastyService.wait(toastOption);
    setTimeout(() => {
      localStorage.setItem("wishlist_item", JSON.stringify(products));
      this.calculateLocalWishlistProdCounts();
    }, 500);

  }

  // returning LocalWishlist Product Count
  public calculateLocalWishlistProdCounts() {

    this.localStorageWishlist = null;
    this.localStorageWishlist = JSON.parse(localStorage.getItem("wishlist_item")) || [];
    this.navbarWishlistProdCount = +((this.localStorageWishlist).length);
  }

  // Removing Wishlist from local
  public removeLocalWishlistProduct(product: any) {
    let products: any = JSON.parse(localStorage.getItem("wishlist_item"));

    for (let i = 0; i < products.length; i++) {
      if (products[i].productId === product.productId) {
        products.splice(i, 1);
        break;
      }
    }

    // const toastOption: ToastOptions = {
    //   title: "Remove Product From Wishlist",
    //   msg: "Product removing from wishlist",
    //   showClose: true,
    //   timeout: 1000,
    //   theme: "material"
    // };


    // this.toastyService.wait(toastOption);
    setTimeout(() => {
      // ReAdding the products after remove
      localStorage.setItem("wishlist_item", JSON.stringify(products));
      this.calculateLocalWishlistProdCounts();
    }, 500);

  }

  public addAllWishListToCart(dataArray: any) {
    let a: any;
    a = JSON.parse(localStorage.getItem("cart_item")) || [];

    for (let singleData of dataArray) {
      a.push(singleData);
    }

    // let toastOption: ToastOptions = {
    //   title: "Adding All Product To Cart",
    //   msg: "Products adding to the cart",
    //   showClose: true,
    //   timeout: 1000,
    //   theme: "material"
    // };

    // this.toastyService.wait(toastOption);
    setTimeout(() => {
      localStorage.removeItem('wishlist_item');
      localStorage.setItem("cart_item", JSON.stringify(a));
      this.calculateLocalCartProdCounts();
      this.calculateLocalWishlistProdCounts();
    }, 500);

  }

  /**
   * getBlogList used to get the blog list.
   */
  public getBlogList() {
    let blogs: any;
    return blogs;
  }

  /**
   * getContactInfo used to get the contact infomation.
   */
  public getContactInfo() {
    let contact: any;
    return contact;
  }

  /**
   * getTermCondition used to get the term and condition.
   */
  public getTermCondition() {
    let termCondition: any;
    return termCondition;
  }

  /**
   * getPrivacyPolicy used to get the privacy policy.
   */
  public getPrivacyPolicy() {
    let privacyPolicy: any;
    return privacyPolicy;
  }

  /**
   * getFaq used to get the faq.
   */
  public getFaq() {
    let faq: any;
    return faq;
  }

  /**
   * getProductReviews used to get the product review.
   */
  public getProductReviews() {
    let review: any;
    return review;
  }

  /**
   * Buy Product functions
   */
  public addBuyUserDetails(formdata) {
    localStorage.setItem("user", JSON.stringify(formdata));

    let product = JSON.parse(localStorage.getItem("cart_item"))
    localStorage.setItem("byProductDetails", JSON.stringify(product));
    this.buyUserCartProducts = JSON.parse(localStorage.getItem("byProductDetails"))

    localStorage.removeItem("cart_item");
    this.calculateLocalCartProdCounts();
  }

  public removeBuyProducts() {
    localStorage.removeItem("byProductDetails");
    this.buyUserCartProducts = JSON.parse(localStorage.getItem("byProductDetails"))
  }

  /**
   * getTeam used to get the team data.
   */
  public getTeam() {
    let team: any;
    return team;
  }

  /**
   * getTestimonial used to get the testimonial data.
   */
  public getTestimonial() {
    let testimonial: any;
    return testimonial;
  }

  /**
   * getMissionVision used to get the Mission and Vision data.
   */
  public getMissionVision() {
    let mission_vision: any;
    return mission_vision;
  }

  /**
   * getAboutInfo used to get the about info data.
   */
  public getAboutInfo() {
    let about_info: any;
    return about_info;
  }

}
