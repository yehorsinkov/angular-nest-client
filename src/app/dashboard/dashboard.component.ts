import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from '../auth.service';
import { LoadUsers } from '../state/actions/user.actions';
import { getLoggedUserSelector, getUsersSelector } from '../state/store';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  public users$ = this.store.select(getUsersSelector);
  public loading$ = this.authService.loading$;
  constructor(
    private ds: DashboardService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store,
    private location: Location
  ) {
    
  }

  ngOnInit(): void {
    console.log(this.router.getCurrentNavigation());
    console.log(this.location.getState());
    this.activatedRoute.data.subscribe(v => console.log(v));
    this.ds.getUsers();
  }
}
