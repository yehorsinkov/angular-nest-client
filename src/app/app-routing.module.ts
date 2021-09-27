import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResolverUserComponent } from './resolver-user/resolver-user.component';
import { DataResolverService } from './resolver-user/data-resolver.service';
import { FormArrayComponent } from './form-array/form-array.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data : { id : null } },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    canDeactivate: [AuthGuard],
  },
  {
    path: 'form-array',
    component: FormArrayComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'resolver',
    component: ResolverUserComponent,
    canActivate: [AuthGuard],
    canDeactivate: [AuthGuard],
    resolve: {
      users: DataResolverService
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
