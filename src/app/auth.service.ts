import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { X_AUTH_TOKEN_EXPIRES_IN_LABEL, X_AUTH_TOKEN_LABEL, X_USER_ID } from './constant';
import { select, Store } from '@ngrx/store';
import { getApiUrl } from './state/store';
import { Router } from '@angular/router';
import { SetLoggedUser } from './state/actions/user.actions';


@Injectable({
	providedIn: 'root'
})
export class AuthService {
	public loading$: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
	constructor(
		private http: HttpClient,
		private store: Store,
		private router: Router,
	) { }

	private getApiUrl(): Observable<string> {
		return this.store.pipe(select(getApiUrl));
	}

	public registration(payload: any): Observable<any> {
		// return this.getApiUrl()
		// 	.pipe(switchMap(API_URL => 
		const API_URL =  'http://localhost:5000/';
				return this.http.post<any>(`${API_URL}auth/registration`, payload)
				.pipe(
					map(
						(response: any) => {
							if (response) {
								return response;
							} else {
								alert('Пользователь уже создан!');
								throw new Error('Пользователь уже создан!');
							}
						},
					)
				)
			// ));
	}

	public login(payload: any): void {
		// this.getApiUrl()
		// 	.pipe(switchMap(API_URL => 
				const API_URL =  'http://localhost:5000/';
		this.http.post<any>(`${API_URL}auth/login`, payload)
			.subscribe(res => {
				if (res) {
					const expireTime = 60;
					this.setToken(res.token);
					this.setTokenExpireTime(expireTime);
					this.store.dispatch(new SetLoggedUser(res.user));
					this.setUserId(res.user.id);
					// this.router.navigateByUrl('/admin');
					this.router.navigateByUrl('/dashboard');
				} else {
					alert('не правильный логгин и пароль');
				}
				this.loading$.next(false);
			});
				// this.http.post<any>(`${apiUrl}auth/login`, payload)
				// .pipe(
				// 	map(
				// 		(response: any) => {
				// 			if (response) {
				// 				debugger;
				// 				// this.setToken(response.token);
				// 				return response;
				// 			} else {
				// 				alert('Пользователь уже создан!');
				// 				throw new Error('Пользователь уже создан!');
				// 			}
				// 		},
				// 	)
				// )
			// ));
	}

	public checkLogin(): void {
		const isLoggedIn = this.isLoggedIn();
	}

	public logOut(): void {
		this.removeTokenInfo();
	}

	public isLoggedIn(): boolean {
		const token = this.getToken();
		return !this.isTokenExpired() && Boolean(token);
	}

	public getToken(): string | null {
		return localStorage.getItem(X_AUTH_TOKEN_LABEL);
	}

	public isTokenExpired(): boolean {
		const tokenExpireIn = localStorage.getItem(X_AUTH_TOKEN_EXPIRES_IN_LABEL);
		const isTokenExpired = new Date().getTime() > Number(tokenExpireIn);
		return isTokenExpired;
	}

	public setTokenExpireTime(expiresIn: number): void {
		const tokenExpireTime = new Date().getTime() + expiresIn * 1000;
		localStorage.setItem(X_AUTH_TOKEN_EXPIRES_IN_LABEL, tokenExpireTime.toString());
	}

	private setUserId(id: number): void {
		localStorage.setItem(X_USER_ID, id.toString());
	}

	public setToken(token: string): void {
		localStorage.setItem(X_AUTH_TOKEN_LABEL, token);
	}

	public removeTokenInfo(): void {
		localStorage.removeItem(X_AUTH_TOKEN_LABEL);
		localStorage.removeItem(X_AUTH_TOKEN_EXPIRES_IN_LABEL);
	}
}
