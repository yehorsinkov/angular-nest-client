import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  ngOnInit() {
  }
  logout(){
    this.authService.logOut();
    this.router.navigateByUrl('/login');
  }

  public toUsers(): void  {
    // this.router.navigate(['/dashboard'], {})
    this.router.navigateByUrl('/dashboard', { state: { id:1 , name:'Angular' } });
  }
}
