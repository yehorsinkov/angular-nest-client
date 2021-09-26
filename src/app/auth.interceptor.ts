import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BEARER_LABEL, X_AUTH_TOKEN_LABEL } from './constant';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const token = localStorage.getItem(`${X_AUTH_TOKEN_LABEL}`) || null;
    const reqWithAuth = req.clone({
      setHeaders: {
        Authorization: `${BEARER_LABEL} ${token}`,
      }
    });
    return next.handle(reqWithAuth);
  }
}
