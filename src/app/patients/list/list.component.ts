import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar, MatBottomSheet } from '@angular/material';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map, filter, tap } from 'rxjs/operators';

import { Patient } from './../../classes/patient';
import { PatientService } from './../patient.service';
import { NewPatientDialogComponent } from './new-patient-dialog.component';
import { StatsComponent } from './../../stats/stats.component';
import { StatsService } from './../../stats/stats.service';
import { ConfigService } from './../../auth/config.service';
import * as moment from 'moment';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

	currentUser = JSON.parse(localStorage.getItem('currentUser')).id;
	lastPatients: Observable<Patient[]> = null;
	patient: Patient;
	patients: Observable<Patient[]>;
	searchTerms = new Subject<string>();
	today: Date = new Date();
	userRole: string;

	constructor(public dialog: MatDialog, private patientService: PatientService, public snackBar: MatSnackBar,
		private bottomSheet: MatBottomSheet, private statsService: StatsService, private configService: ConfigService) { }

	ngOnInit() {
		this.userRole = this.configService.getUserConfig(this.currentUser, 'role');

		this.getPatients();

		this.patients = this.searchTerms.pipe(
			debounceTime(300),
			filter(term => term.length > 2),
			distinctUntilChanged(),
			tap(_ => this.lastPatients = null),
			switchMap((term: string) => this.patientService.searchPatients(term)),
		);
	}

	getPatients(): void {
		this.patientService.getPatients()
			.subscribe(patients => this.lastPatients = of(patients));
	}

	search(term: string) {
		this.searchTerms.next(term);
	}

	openNewPatientDialog(): void {
		const dialogRef = this.dialog.open(NewPatientDialogComponent, {
			width: '240px'
		});
	}

  openBottomSheet(): void {
  	this.statsService.getStats(moment().format('YYYY-MM-01'), moment().format("YYYY-MM-DD")).subscribe(stats => {
  		this.bottomSheet.open(StatsComponent, {data: stats});
  	});
  }

}