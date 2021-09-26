import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from '../auth.service';
import { getLoggedUserSelector } from '../state/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  public loggedUser$ = this.store.select(getLoggedUserSelector);
  public name: string = 'user';
  constructor(
    private route: Router,
    private store: Store,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.loggedUser$.subscribe(res => this.name = res.name);
  }

  public logout(): void {
    this.authService.logOut();
    this.route.navigate(['/login']);
  }

}
