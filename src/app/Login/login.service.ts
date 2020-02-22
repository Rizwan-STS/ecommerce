import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../Constants';

@Injectable()
export class LoginService {
  constructor(private httpClient: HttpClient) { }

  loginOTP(data) {
    return this.httpClient.post(Constants.BASE_API_URL + '/auth/login', data);
  }

  getDetail(data) {
    return this.httpClient.post(Constants.BASE_API_URL + '/auth/getname', data);
  }

  login(data) {
    return this.httpClient.post(Constants.BASE_API_URL + '/auth/loginpost', data);
  }

  logoutUser() {
    return this.httpClient.get(Constants.BASE_API_URL + '/auth/logout');
  }

  checkSession(id) {
    return this.httpClient.post(Constants.BASE_API_URL + '/auth/checkSession', id);
  }
}
