import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoadUsers } from '../state/actions/user.actions';

@Injectable({
	providedIn: 'root'
})
export class DashboardService {
	SERVER_URL = 'http://localhost:5000/';
	constructor(
		private http: HttpClient,
		private store: Store,
	) { }

	public getUsers(): void {
		this.http.get<any>(`${this.SERVER_URL}users`)
			.subscribe(
				(response: any) => {
					if (response) {
						this.store.dispatch(new LoadUsers(response));
					} else {
						alert('Доступ запрещен!');
						throw new Error('Пользователь уже создан!');
					}
				},
				() => {
					throw new Error('Нет доступа');
				},
			)

	}

	public getUserById(id: number ): Observable<any> {
		return this.http.get<any>(`${this.SERVER_URL}users/${id}`)
		.pipe(
			map(response => {
				if (response) {
					return response
				} else {
					alert('Не найден пользователь!')
				}
			})
		)
	}
}	
