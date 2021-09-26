import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { User } from '../interface/user.interface';
import { getLoggedUserSelector } from '../state/store';

@Injectable({
	providedIn: 'root'
})
export class AdminGuard implements CanActivate {
	private isAdmin: boolean = false;
	constructor(private store: Store) {}
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		this.getUser().subscribe(user => {
			const role = user.roles.find((r: { id: any; }) => r.id === 2);
			this.isAdmin = role ? true : false;
		});
		if (this.isAdmin) {
			return true;
		}
		alert('Доступ закрыт!');
		return false;
	}

	private getUser(): Observable<any> {
		return this.store.select(getLoggedUserSelector).pipe(map(res => res))
	}
}
