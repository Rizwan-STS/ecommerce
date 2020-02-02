import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../environments/environment";

@Injectable()
export class CartService {

  constructor(private httpClient: HttpClient) { }


  addPromoCode(val,boxid) {
    return this.httpClient.get(environment.baseUrl + '/auth/cart/promocodes/search/'+val + '/' + boxid);
  }

  checkout(val) {
    return this.httpClient.post(environment.baseUrl + '/auth/cart/checkout/', val);
  }

  checkoutConfirm(val,id) {
    return this.httpClient.post(environment.baseUrl + '/auth/cart/checkoutconfirm/'+id, val);
  }

  getPromocodes(id) {
    return this.httpClient.get(environment.baseUrl + '/auth/cart/promocodes/list/'+id);
  }

}
