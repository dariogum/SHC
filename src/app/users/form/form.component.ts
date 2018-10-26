import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatAccordion, MatDialog, MatSnackBar } from '@angular/material';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { User } from './../../classes/user';
import { USERSCONFIG } from './../../patients/mock-data';
import { UserService } from './../user.service';
import { environment } from './../../../environments/environment';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.css']

})
export class FormComponent implements OnInit {

	addressData;
	apiVersionUrl: string = environment.url + '/v1';
	bolder: boolean = false;
	folded: Boolean = false;
	formClass: string = 'wide';
	user: User;

	@ViewChild(MatAccordion) accordion: MatAccordion;
	@ViewChild('userDataForm') public userDataForm: NgForm;

	constructor(private breakpointObserver: BreakpointObserver, private route: ActivatedRoute, private router: Router,
		public dialog: MatDialog, private userService: UserService, public snackBar: MatSnackBar) {
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

		this.bolder = this.findInUserConfig(true, 'bolder');
	}

	ngOnInit() {
		this.getUser();
	}

	findInUserConfig(needle, haystack) {
		let user = JSON.parse(localStorage.getItem('currentUser')).id;

		for (var i = USERSCONFIG.length - 1; i >= 0; i--) {
			if (USERSCONFIG[i].user === user) {
				for (var j = USERSCONFIG[i][haystack].length - 1; j >= 0; j--) {
					if (USERSCONFIG[i][haystack][j] === needle || USERSCONFIG[i][haystack][j] === 'all') {
						return needle;
					}
				}
				break;
			}
		}

		return null;
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
		let isDataControl = this.userDataForm.controls[controlName] && !this.userDataForm.controls[controlName].pristine;
		if (isDataControl) {
			this.userService.updateUser(this.user).subscribe();
		}
	}

	deleteUser() {
		this.userService.deleteUser(this.user.id).subscribe(confirmation => {
			let snackBarRef = this.snackBar.open('Usuario eliminado correctamente', 'OK', {
				duration: 2500,
			});
			this.router.navigate(['users']);
		});
	}

}
