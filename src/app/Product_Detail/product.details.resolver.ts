import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable, of, forkJoin} from 'rxjs';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
// import * as qs from 'qs';
import {mergeMap, map, switchMap} from 'rxjs/operators';
import {AppService} from "../app.service";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ProductDetailsResolver implements Resolve<any> {
    constructor(private appService: AppService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return forkJoin(
            this.appService.getMethod(environment.baseUrl + '/auth/products/view/'+localStorage.getItem('boxNumber') + '/' + route.params.id , [],[],[]),
            this.appService.getMethod(environment.baseUrl + '/auth/products/boxNumber/'+localStorage.getItem('boxNumber') , [],[],[])
        );
    }
}
