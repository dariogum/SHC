import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { User } from './../classes/user';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginForm') public loginForm: NgForm;

  handset = false;
  user: User = new User();

  constructor(
    private breakpointObserver: BreakpointObserver,
    private loginService: LoginService,
    private router: Router,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.breakpointObserver.observe([
      Breakpoints.Handset
    ]).subscribe(result => {
      if (result.matches) {
        this.handset = true;
      } else {
        this.handset = false;
      }
    });

    localStorage.removeItem('currentUser');
  }

  onSubmit() {
    this.loginService.verifyByEmail(this.user)
      .subscribe(user => {
        if (user) {
          this.user = user;
          localStorage.setItem('currentUser', JSON.stringify(this.user));
          this.router.navigate(['/patients']);
        } else {
          const snackBarRef = this.snackBar.open('Usuario y/o contraseña incorrectos', 'OK', {
            duration: 2500,
          });
        }
      }
      );
  }

}
