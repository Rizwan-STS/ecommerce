import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../Constants';

@Injectable()
export class SignUpService {
  constructor(private httpClient: HttpClient) { }

  signup(data) {
    return this.httpClient.post(Constants.BASE_API_URL + '/auth/signup', data);
  }
  
}
