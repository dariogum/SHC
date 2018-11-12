import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'patients',
    canActivate: [AuthGuard],
    loadChildren: './patients/patients.module#PatientsModule'
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    loadChildren: './users/users.module#UsersModule'
  },
  {
    path: 'schedules',
    canActivate: [AuthGuard],
    loadChildren: './schedules/schedules.module#SchedulesModule'
  },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
