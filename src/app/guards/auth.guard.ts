import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { X_AUTH_TOKEN_EXPIRES_IN_LABEL, X_AUTH_TOKEN_LABEL } from '../constant';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanDeactivate<any> {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}
  canActivate(
    router: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
      const isLoggedIn = this.authService.isLoggedIn();
      if (isLoggedIn) {
        return true;
      }
      // not logged in so redirect to login page with the return url and return false
      this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
      return false;
  }

  canDeactivate(
    component: any,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return confirm('Вы уверены, что хотите перейти?')
  }
}