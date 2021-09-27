import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './auth.service';
import { X_USER_ID } from './constant';
import { DashboardService } from './dashboard/dashboard.service';
import { SetLoggedUser } from './state/actions/user.actions';
import { getLoggedState } from './state/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  public isLogged$ = this.store.select(getLoggedState);
  constructor(
    private authService: AuthService,
    private ds: DashboardService,
    private store: Store
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
			this.setUsersSetting();
		}
  }

  private setUsersSetting(): void {
    const userId = localStorage.getItem(X_USER_ID) || 0;
    this.ds.getUserById(+userId).subscribe(res => {
      const { password, ...user } = res;
      this.store.dispatch(new SetLoggedUser(user));
    })
  }
}
