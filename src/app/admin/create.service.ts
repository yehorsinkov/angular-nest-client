import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { User } from '../interface/user.interface';

@Injectable({
	providedIn: 'root'
})
export class CreateService {
	SERVER_URL = 'http://localhost:5000/';
	constructor(private http: HttpClient) { }

	public createAdmin(payload: User): Observable<User> {
		const API_URL =  'http://localhost:5000/';
		return this.http.post<any>(`${API_URL}registration/admin`, payload)
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
	}
}
