import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar, MatBottomSheet } from '@angular/material';

import { Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map, filter, tap } from 'rxjs/operators';

import { Patient } from './../../classes/patient';
import { PatientService } from './../patient.service';

import { NewPatientDialogComponent } from './new-patient-dialog.component';
import { StatsComponent } from './../../stats/stats.component';
import { StatsService } from './../../stats/stats.service';
import * as moment from 'moment';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

	patient: Patient;
	patients: Observable<Patient[]>;
	lastPatients: Observable<Patient[]> = null;
	today: Date = new Date();

	startDate = moment().format('YYYY-MM-01');
	endDate = moment().format("YYYY-MM-DD");

	private searchTerms = new Subject<string>();

	constructor(public dialog: MatDialog, private patientService: PatientService, public snackBar: MatSnackBar, private bottomSheet: MatBottomSheet, private statsService: StatsService) { }

	ngOnInit() {
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

	openNewPatientDialog(): void {
		const dialogRef = this.dialog.open(NewPatientDialogComponent, {
			width: '240px'
		});
	}

	search(term: string) {
		this.searchTerms.next(term);
	}

  openBottomSheet(): void {
  	this.statsService.getStats(this.startDate, this.endDate).subscribe(stats => {
  		this.bottomSheet.open(StatsComponent, {data: stats});
  	});
  }

}