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

  constructor(private router: Router, public snackBar: MatSnackBar, private loginService: LoginService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.loginService.verifyByEmail(this.user)
      .subscribe(user => {
        if(user){
          this.user = user;
          this.router.navigate(['/patients']);
        } else {
          let snackBarRef = this.snackBar.open('Usuario y/o contraseña incorrectos', 'OK', {
            duration: 2500,
          });
        }
      }
    );
  }

}
