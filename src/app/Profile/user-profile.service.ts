import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../Constants';

@Injectable()
export class UserProfileService {
  constructor(private httpClient: HttpClient) { }

  getDetails() {
    return this.httpClient.get(Constants.BASE_API_URL + '/users/profile/view');
  }

  updateDetails(data) {
    return this.httpClient.post(Constants.BASE_API_URL + '/users/profile/update', data);
  }

  saveImage(data) {
    return this.httpClient.post(Constants.BASE_API_URL + '/users/profile/saveImage', data);
  }
}
