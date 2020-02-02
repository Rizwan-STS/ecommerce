import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Constants } from '../../Constants';

@Injectable()
export class CustomerOrderService {

  constructor (private http: HttpClient) {}

  listing() {
    return this.http.get(Constants.BASE_API_URL + '/auth/cart/customerorders');
  }

  cancel(id) {
    return this.http.get(Constants.BASE_API_URL + '/auth/cart/cancelOrder/'+id);
  }

  orderById(id) {
    return this.http.get(Constants.BASE_API_URL + '/auth/cart/orderdetails/' + id);
  }
  ratingAdd(data){

    return this.http.get(Constants.BASE_API_URL + '/auth/cart/raitingadd/' + data);

  }

  saveRating(data,id) {
    return this.http.post(Constants.BASE_API_URL + '/auth/cart/rating/'+id, data);
  }
}
