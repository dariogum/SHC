import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar, MatBottomSheet } from '@angular/material';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map, filter, tap } from 'rxjs/operators';

import { User } from './../../classes/user';
import { UserService } from './../user.service';
import { NewUserDialogComponent } from './new-user-dialog.component';
import { StatsComponent } from './../../stats/stats.component';
import { StatsService } from './../../stats/stats.service';
import * as moment from 'moment';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

	lastUsers: Observable<User[]> = null;
	user: User;
	users: Observable<User[]>;
	searchTerms = new Subject<string>();
	today: Date = new Date();

	constructor(public dialog: MatDialog, private userService: UserService, public snackBar: MatSnackBar,
		private bottomSheet: MatBottomSheet, private statsService: StatsService) { }

	ngOnInit() {
		this.getUsers();

		this.users = this.searchTerms.pipe(
			debounceTime(300),
			filter(term => term.length > 2),
			distinctUntilChanged(),
			tap(_ => this.lastUsers = null),
			switchMap((term: string) => this.userService.searchUsers(term)),
		);
	}

	getUsers(): void {
		this.userService.getUsers()
			.subscribe(users => this.lastUsers = of(users));
	}

	search(term: string) {
		this.searchTerms.next(term);
	}

	openNewUserDialog(): void {
		const dialogRef = this.dialog.open(NewUserDialogComponent, {
			width: '240px'
		});
	}

  openBottomSheet(): void {
  	this.statsService.getStats(moment().format('YYYY-MM-01'), moment().format("YYYY-MM-DD")).subscribe(stats => {
  		this.bottomSheet.open(StatsComponent, {data: stats});
  	});
  }

}