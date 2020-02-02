import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpErrorResponse, HttpResponse
} from '@angular/common/http';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/do';
import {Router} from '@angular/router';
import {map, catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

    constructor(private router: Router) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (localStorage.getItem('token')) {
            request = request.clone({
                setHeaders: {
                    authorization: localStorage.getItem('token')
                }
            });
        }
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                }
                return event;
            }),
            catchError((err: HttpErrorResponse) => {
                if (err.status === 401) {
                    localStorage.clear();
                    this.router.navigate(['/Login']);
                }
                return throwError(err);
            }));
    }
}
