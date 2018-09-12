import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { User } from './../classes/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginForm') public loginForm: NgForm;

  user: User = new User();

  constructor(private router: Router, public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  onSubmit() {
    let user1 = this.user.email == 'dariogum@hotmail.com' && this.user.password == 'admin';
    let user2 = this.user.email == 'ruben.pedicino@hotmail.com' && this.user.password == 'suegrocrack';
    if (user1 || user2) {
      this.router.navigate(['/patients']);
    } else {
      let snackBarRef = this.snackBar.open('Usuario y/o contraseña incorrectos', 'OK', {
        duration: 2500,
      });
    }
  }

}
