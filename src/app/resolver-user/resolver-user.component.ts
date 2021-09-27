import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resolver-user',
  templateUrl: './resolver-user.component.html',
  styleUrls: ['./resolver-user.component.sass']
})
export class ResolverUserComponent implements OnInit {

  users: any[] = [];

  constructor(private _routes: ActivatedRoute) { }

  ngOnInit(): void {
    this._routes.data.subscribe((response: any) => {
      this.users = response.users;
    })
  }
}
