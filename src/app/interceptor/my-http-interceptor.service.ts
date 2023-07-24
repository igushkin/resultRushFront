import {Inject, Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {tap} from 'rxjs';
import {Router} from "@angular/router";
import {TOKEN_KEY} from "../service/impl/AuthService";

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {

  constructor(@Inject(TOKEN_KEY) private tokenKey: string, private router: Router) {


  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {

    if (localStorage.getItem(this.tokenKey)) {

      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + localStorage.getItem(this.tokenKey)
        }
      });
    }

    return next.handle(request).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            if (event.status == 401) {
              alert('Unauthorized access!');
              this.router.navigateByUrl('/login');
            }
          }
          return event;
        },
        error: (error) => {
          if (error.status === 401) {
            alert(error);
            this.router.navigateByUrl('/login');
          } else if (error.status === 404) {
            alert('Page Not Found!');
          }
        }
      }));

  }
}
