import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AboutUsComponent } from './About_Us/About_Us.component'
import { CongratulationsComponent } from './Congratulations/Congratulations.component'
import { ContactUsComponent } from './Contact_Us/Contact_Us.component'
import { BoxNumberPageComponent } from './Box_Number_Page/Box_Number_Page.component'
import { FAQComponent } from './FAQ/FAQ.component'
import { ErrorPageComponent } from './Error_Page/Error_Page.component'
import { PrivacyPolicyComponent } from './Privacy_Policy/Privacy_Policy.component'
import { ProfileComponent } from './Profile/Profile.component'
import { LoginComponent } from './Login/Login.component'
import { TermsAndConditionComponent } from './Terms_And_Condition/Terms_And_Condition.component'
import { AddPaymentMethodComponent } from './Add_Payment_Method/Add_Payment_Method.component'
import { CartViewComponent } from './Cart_View/Cart_View.component'
import { ListingProductsComponent } from './Listing_Products/Listing_Products.component'
import { ListingProducts2Component } from './Listing_Products_2/Listing_Products_2.component'
import { MyCartComponent } from './My_Cart/My_Cart.component'
import { MyCartPaymentComponent } from './My_Cart_Payment/My_Cart_Payment.component'
import { MyOrdersComponent } from './My_Orders/My_Orders.component'
import { NavbarDesktopComponent } from './Navbar_Desktop/Navbar_Desktop.component'
import { NavbarMobileComponent } from './Navbar_Mobile/Navbar_Mobile.component'
import { PaymentMethodComponent } from './Payment_Method/Payment_Method.component'
import { ProductDetailComponent } from './Product_Detail/Product_Detail.component'
import { WhenOpenCartComponent } from './When_Open_Cart/When_Open_Cart.component'
import { AppComponent } from './app.component';
import { APP_BASE_HREF, Location } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FooterComponent } from './Footer/Footer.component';
import { HeaderComponent } from './Header/Header.component';
import { FormsModule } from '@angular/forms';
import { SignUpComponent } from './Sign_Up/Signup.component';
import { LoaderService } from "./loader.service";
import { LoaderInterceptor } from "./loader.interceptor";
import { HttpConfigInterceptor } from "./httpconfig.interceptor";
import { LoaderComponent } from "./Loader/loader.component";

@NgModule({
  declarations: [
    WhenOpenCartComponent,
    ProductDetailComponent,
    PaymentMethodComponent,
    NavbarMobileComponent,
    NavbarDesktopComponent,
    MyOrdersComponent,
    MyCartPaymentComponent,
    MyCartComponent,
    ListingProducts2Component,
    ListingProductsComponent,
    CartViewComponent,
    AddPaymentMethodComponent,
    TermsAndConditionComponent,
    LoginComponent,
    ProfileComponent,
    PrivacyPolicyComponent,
    ErrorPageComponent,
    FAQComponent,
    BoxNumberPageComponent,
    ContactUsComponent,
    CongratulationsComponent,
    AboutUsComponent,
    AppComponent,
    FooterComponent,
    HeaderComponent,
    SignUpComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]

})
export class AppModule {
}
