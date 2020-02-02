import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";

@Injectable()
export class BoxService {
  constructor (private httpClient: HttpClient) {}

  signup(data) {
    return this.httpClient.post(environment.baseUrl + '/auth/signup', data);
  }

  checkSession() {
    return this.httpClient.get(environment.baseUrl + '/auth/products/');
  }

  getCategories() {
    return this.httpClient.get(environment.baseUrl + '/auth/products/categories');
  }

  getPromocodes() {
    return this.httpClient.get(environment.baseUrl + '/auth/products/categories');
  }

  getProductDetail(boxid,productid) {
    return this.httpClient.get(environment.baseUrl + '/auth/products/view/'+boxid+'/'+productid);
  }

  searchBoxNumber(data) {
    return this.httpClient.get(environment.baseUrl + '/auth/products/boxNumber/'+ data);
  }

  getBrands() {
    return this.httpClient.get(environment.baseUrl + '/auth/products/brands');
  }
  getProduct(data) {
    return this.httpClient.get(environment.baseUrl + '/auth/products/boxNumber/'+ data);
  }
  getBanners(data) {
    return this.httpClient.get(environment.baseUrl + '/auth/products/listBanners/'+ data);
  }
}
