import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router, NavigationExtras } from '@angular/router';

import { User } from './../../classes/user';
import { UserService } from './../user.service';

@Component({
  selector: 'new-user-dialog',
  templateUrl: 'new-user-dialog.html',
})
export class NewUserDialogComponent {

	user: User = new User();

  constructor(public dialogRef: MatDialogRef<NewUserDialogComponent>, private router: Router,
    private userService: UserService) { }

  addUser() {
    this.userService.addUser(this.user)
      .subscribe(user => {
        this.dialogRef.close();
        this.router.navigate(['users/' + user.id]);
      }
    );
  }

}