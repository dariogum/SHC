import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NgForm } from '@angular/forms';
import { MatAccordion, MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { ConfirmationUserDialogComponent } from './confirmation-user-dialog.component';
import { environment } from './../../../environments/environment';
import { User } from './../../classes/user';
import { UserService } from './../user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']

})
export class FormComponent implements OnInit {

  folded = false;
  formClass = 'wide';
  user: User;

  @ViewChild(MatAccordion) accordion: MatAccordion;
  @ViewChild('userDataForm') public userDataForm: NgForm;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    public snackBar: MatSnackBar,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.breakpointObserver.observe([
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      if (result.matches) {
        this.formClass = 'handset';
      }
    });

    this.breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.TabletPortrait,
    ]).subscribe(result => {
      if (result.matches) {
        this.formClass = 'tablet';
      }
    });

    this.breakpointObserver.observe([
      Breakpoints.TabletLandscape,
      Breakpoints.WebPortrait,
      Breakpoints.WebLandscape,
    ]).subscribe(result => {
      if (result.matches) {
        this.formClass = 'wide';
      }
    });
  this.getUser();
  }

  toggleAccordion() {
    if (this.folded) {
      this.accordion.openAll();
    } else {
      this.accordion.closeAll();
    }
    this.folded = !this.folded;
  }

  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id)
      .subscribe(user => {
        this.user = user;
      });
  }

  updateUser(event) {
    let controlName: string;
    if (event.value !== undefined && event.source) {
      controlName = event.source.ngControl.name;
    } else if (event.value !== undefined) {
      controlName = event.targetElement.name;
    } else {
      controlName = event.target.name;
    }
    const isDataControl = this.userDataForm.controls[controlName] && !this.userDataForm.controls[controlName].pristine;
    if (isDataControl) {
      this.userService.updateUser(this.user).subscribe();
    }
  }

  deleteUser() {
    this.userService.deleteUser(this.user.id).subscribe(confirmation => {
      const snackBarRef = this.snackBar.open('Usuario eliminado correctamente', 'OK', {
        duration: 2500,
      });
      this.router.navigate(['users']);
    });
  }

  openConfirmationUserDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationUserDialogComponent, {
      width: '240px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser();
      }
    });
  }

}
