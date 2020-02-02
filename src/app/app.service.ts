import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) {

  }


  postMethod(url: string, urlParams: any[], queryParams: object, headerParams: object, data: any): Observable<any> {
    let newUrl = url + this.parseUrlParams(urlParams) + this.parseQueryParams(queryParams);
    console.log('post url is ', newUrl);
    return this.http.post(newUrl, data, {headers: this.parseHeaderParams(headerParams)});
  }

  getMethod(url: string, urlParams: any[], queryParams: object, headerParams: object): Observable<any> {
    let newUrl = url + this.parseUrlParams(urlParams) + this.parseQueryParams(queryParams);
    console.log('get url is ', newUrl);
    return this.http.get(newUrl, {headers: this.parseHeaderParams(headerParams)});
  }

  putMethod(url: string, urlParams: any[], queryParams: object, headerParams: object, data: any): Observable<any> {
    let newUrl = url + this.parseUrlParams(urlParams) + this.parseQueryParams(queryParams);
    console.log('put url is ', newUrl);
    return this.http.put(newUrl, data, {headers: this.parseHeaderParams(headerParams)});
  }

  deleteMethod(url: string, urlParams: any[], queryParams: object, headerParams: object): Observable<any> {
    let newUrl = url + this.parseUrlParams(urlParams) + this.parseQueryParams(queryParams);
    console.log('delete url is ', newUrl);
    return this.http.delete(newUrl, {headers: this.parseHeaderParams(headerParams)});
  }

  parseUrlParams(urlParams) {
    let urlParam: any = ''
    if (urlParams.length === 0) {
      return "";
    }
    for (let i = 0; i < urlParams.length; i++) {
      urlParam = urlParam + '/' + urlParams[i];
      if ((i + 1) === urlParams.length) {
        console.log(urlParam);
        return urlParam;
      }
    }
  }

  parseQueryParams(queryParams) {
    console.log(queryParams);
    let queryParam: any = ''
    let keys = Object.keys(queryParams);
    console.log(keys);
    if (keys.length === 0) {
      return "";
    }
    for (let i = 0; i < keys.length; i++) {
      if (i == 0) {
        queryParam = queryParam + '?';
      }
      queryParam = queryParam + keys[i] + "=" + queryParams[keys[i]] + "";
      if ((i + 1) < keys.length) {
        queryParam = queryParam + "&";
      }

      if ((i + 1) === keys.length) {
        console.log(queryParam)
        return queryParam;
      }
    }
  }

  parseHeaderParams(headerParams) {
    console.log(headerParams);
    let keys = Object.keys(headerParams);
    console.log(keys);
    let headers = new HttpHeaders();
    if (keys.length === 0) {
      return headers;
    }
    for (let i = 0; i < keys.length; i++) {
      headers = headers.set(keys[i], headerParams[keys[i]]);
      if ((i + 1) === keys.length) {
        console.log(headers)
        return headers;
      }
    }
  }
}
