import {NgModule} from '@angular/core';
import {AboutUsComponent} from './About_Us/About_Us.component'
import {CongratulationsComponent} from './Congratulations/Congratulations.component'
import {ContactUsComponent} from './Contact_Us/Contact_Us.component'
import {BoxNumberPageComponent} from './Box_Number_Page/Box_Number_Page.component'
import {FAQComponent} from './FAQ/FAQ.component'
import {ErrorPageComponent} from './Error_Page/Error_Page.component'
import {PrivacyPolicyComponent} from './Privacy_Policy/Privacy_Policy.component'
import {ProfileComponent} from './Profile/Profile.component'
import {LoginComponent} from './Login/Login.component'
import {SignUpComponent} from './Sign_Up/Signup.component'
import {TermsAndConditionComponent} from './Terms_And_Condition/Terms_And_Condition.component'
import {AddPaymentMethodComponent} from './Add_Payment_Method/Add_Payment_Method.component'
import {CartViewComponent} from './Cart_View/Cart_View.component'
import {ListingProductsComponent} from './Listing_Products/Listing_Products.component'
import {ListingProducts2Component} from './Listing_Products_2/Listing_Products_2.component'
import {MyCartComponent} from './My_Cart/My_Cart.component'
import {MyCartPaymentComponent} from './My_Cart_Payment/My_Cart_Payment.component'
import {MyOrdersComponent} from './My_Orders/My_Orders.component'
import {NavbarDesktopComponent} from './Navbar_Desktop/Navbar_Desktop.component'
import {NavbarMobileComponent} from './Navbar_Mobile/Navbar_Mobile.component'
import {PaymentMethodComponent} from './Payment_Method/Payment_Method.component'
import {ProductDetailComponent} from './Product_Detail/Product_Detail.component'
import {WhenOpenCartComponent} from './When_Open_Cart/When_Open_Cart.component'
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {ProductDetailsResolver} from './Product_Detail/product.details.resolver';

const routes: Routes = [
    {
        path: 'WhenOpenCart',
        component: WhenOpenCartComponent,
    },
    {
        path: 'ProductDetail/:id',
        component: ProductDetailComponent,
        resolve: {
            ProductDetails: ProductDetailsResolver
        }
    },
    {
        path: 'PaymentMethod',
        component: PaymentMethodComponent,
    },
    {
        path: 'NavbarMobile',
        component: NavbarMobileComponent,
    },
    {
        path: 'NavbarDesktop',
        component: NavbarDesktopComponent,
    },
    {
        path: 'MyOrders',
        component: MyOrdersComponent,
    },
    {
        path: 'MyCartPayment',
        component: MyCartPaymentComponent,
    },
    {
        path: 'cart',
        component: MyCartComponent,
    },
    {
        path: 'ListingProducts2',
        component: ListingProducts2Component,
    },
    {
        path: 'home',
        component: ListingProductsComponent,
    },
    {
        path: 'CartView',
        component: CartViewComponent,
    },
    {
        path: 'AddPaymentMethod',
        component: AddPaymentMethodComponent,
    },
    {
        path: 'TermsAndCondition',
        component: TermsAndConditionComponent,
    },
    {
        path: 'Login',
        component: LoginComponent,
    },
    {
        path: 'Register',
        component: SignUpComponent,
    },
    {
        path: 'Profile',
        component: ProfileComponent,
    },
    {
        path: 'PrivacyPolicy',
        component: PrivacyPolicyComponent,
    },
    {
        path: 'ErrorPage',
        component: ErrorPageComponent,
    },
    {
        path: 'FAQ',
        component: FAQComponent,
    },
    {
        path: 'BoxNumberPage',
        component: BoxNumberPageComponent,
    },
    {
        path: 'ContactUs',
        component: ContactUsComponent,
    },
    {
        path: 'Congratulations',
        component: CongratulationsComponent,
    },
    {
        path: 'AboutUs',
        component: AboutUsComponent,
    },
    {
        path: '', redirectTo: '/Login', pathMatch: 'full'
    },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
