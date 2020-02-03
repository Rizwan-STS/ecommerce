import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../Constants';

@Injectable()
export class CartService {

  constructor(private httpClient: HttpClient) { }


  addPromoCode(val,boxid) {
    return this.httpClient.get(Constants.BASE_API_URL + '/auth/cart/promocodes/search/'+val + '/' + boxid);
  }

  checkout(val) {
    return this.httpClient.post(Constants.BASE_API_URL + '/auth/cart/checkout/', val);
  }

  checkoutConfirm(val,id) {
    return this.httpClient.post(Constants.BASE_API_URL + '/auth/cart/checkoutconfirm/'+id, val);
  }

  getPromocodes(id) {
    return this.httpClient.get(Constants.BASE_API_URL + '/auth/cart/promocodes/list/'+id);
  }

}
