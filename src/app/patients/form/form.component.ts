import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatAccordion, MatDialog } from '@angular/material';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, of } from 'rxjs';
import { Patient } from './../classes/patient';
import { Visit } from './../classes/visit';
import { CITIES, COUNTRIES, STATES, SOCIALSECURITIES, GENDERS, BIRTHTYPES, BLOODTYPES, PATIENTS, VISITS } from './../mock-data';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { ConfirmationPatientDialogComponent } from './confirmation-patient-dialog.component';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.css']

})
export class FormComponent implements OnInit {

	formClass = 'wide';
	folded = false;
	maxDate = new Date();

	cities = CITIES;
	countries = COUNTRIES;
	states = STATES;
	socialsecurities = SOCIALSECURITIES;
	genders = GENDERS;
	birthtypes = BIRTHTYPES;
	bloodtypes = BLOODTYPES;

	patient: Patient;
	newVisit: Visit = new Visit();
	visits: Observable<Visit[]>;

	@ViewChild(MatAccordion) accordion: MatAccordion;

	constructor(private breakpointObserver: BreakpointObserver, private route: ActivatedRoute, private router: Router, public dialog: MatDialog) { }

	ngOnInit() {
		this.breakpointObserver.observe([
			Breakpoints.HandsetPortrait
		]).subscribe(result => {
			if (result.matches) {
				this.formClass = 'handset';
			} else {
				this.breakpointObserver.observe([
					Breakpoints.TabletPortrait,
					Breakpoints.HandsetLandscape,
				]).subscribe(result => {
					if (result.matches) {
						this.formClass = 'tablet';
					} else {
						this.formClass = 'wide';
					}
				});
			}
		});

		this.getPacient();
		this.visits = this.getVisits();
	}

	getPacient(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.patient = PATIENTS[id];
	}

	close() {
		this.folded = true;
		this.accordion.closeAll();
	}

	open() {
		this.folded = false;
		this.accordion.openAll();
	}

	getVisits(): Observable<Visit[]> {
		return of(VISITS);
	}

	onVisitSubmit() {
		if (this.newVisit.id === undefined) {
			this.newVisit.id = VISITS.length;
			this.newVisit.patient = this.patient;
			VISITS.push(this.newVisit);
			this.newVisit = new Visit();
		}
	}

	resetNewVisit() {
		this.newVisit = new Visit();
	}

	deleteVisit(visit) {
		var index = VISITS.indexOf(visit)
		if(index > -1) {
			VISITS.splice(index, 1);
		}
	}

	openConfirmationDialog(visit): void {
		const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
			width: '240px'
		});

		dialogRef.afterClosed().subscribe(result => {
			if(result) {
				this.deleteVisit(visit);
			}
		});
	}

	deletePatient() {
		var index = PATIENTS.indexOf(this.patient);
		if(index > -1) {
			PATIENTS.splice(index, 1);
		}
    this.router.navigate(['patients']);
	}

	openConfirmationPatientDialog(): void {
		const dialogRef = this.dialog.open(ConfirmationPatientDialogComponent, {
			width: '240px'
		});

		dialogRef.afterClosed().subscribe(result => {
			if(result) {
				this.deletePatient();
			}
		});
	}


}
