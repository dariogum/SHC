import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';

import { Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map, filter, tap } from 'rxjs/operators';

import { Patient } from './../../classes/patient';
import { PatientService } from './../patient.service';

import { NewPatientDialogComponent } from './new-patient-dialog.component';

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

	private searchTerms = new Subject<string>();

	constructor(public dialog: MatDialog, private patientService: PatientService, public snackBar: MatSnackBar) { }

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

}