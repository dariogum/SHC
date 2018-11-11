import { Component, OnInit, ViewChild } from '@angular/core';
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

  user: User = new User();

  constructor(
    private loginService: LoginService,
    private router: Router,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
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
