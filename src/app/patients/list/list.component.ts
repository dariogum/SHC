import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable, of } from 'rxjs';
import { Patient } from './../classes/patient';
import { PATIENTS } from './../mock-data';
import { NewPatientDialogComponent } from './new-patient-dialog.component';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

	patient: Patient;
	patients: Observable<Patient[]>;

	constructor(public dialog: MatDialog) { }

	ngOnInit() {
		this.patients = this.getPatients();
	}

	getPatients(): Observable<Patient[]> {
		return of(PATIENTS);
	}

	openNewPatientDialog(): void {
		const dialogRef = this.dialog.open(NewPatientDialogComponent, {
			width: '240px'
		});
	}

}