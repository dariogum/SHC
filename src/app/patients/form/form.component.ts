import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatAccordion, MatDialog } from '@angular/material';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, of } from 'rxjs';
import { Patient } from './../../classes/patient';
import { Visit } from './../../classes/visit';
import { CITIES, COUNTRIES, STATES, SOCIALSECURITIES, GENDERS, BIRTHTYPES, BLOODTYPES } from './../mock-data';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { ConfirmationPatientDialogComponent } from './confirmation-patient-dialog.component';
import { PatientService } from './../patient.service';

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
	files: FileList;

	@ViewChild(MatAccordion) accordion: MatAccordion;

	constructor(private breakpointObserver: BreakpointObserver, private route: ActivatedRoute,
		private router: Router, public dialog: MatDialog, private patientService: PatientService) {
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
	}

	ngOnInit() {
		this.getPatient();
	}

	getPatient(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.patientService.getPatient(id)
			.subscribe(patient => this.patient = patient);
	}

	updatePatient() {
		this.patientService.updatePatient(this.patient)
			.subscribe(() => console.log('patient updated'));
	}

	deletePatient() {
		//this.patientService.deletePatient(this.patient.id).subscribe();
		/*var index = PATIENTS.indexOf(this.patient);
		if (index > -1) {
			PATIENTS.splice(index, 1);
		}*/
		this.router.navigate(['patients']);
	}

	openConfirmationPatientDialog(): void {
		const dialogRef = this.dialog.open(ConfirmationPatientDialogComponent, {
			width: '240px'
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.deletePatient();
			}
		});
	}

	close() {
		this.folded = true;
		this.accordion.closeAll();
	}

	open() {
		this.folded = false;
		this.accordion.openAll();
	}

	onVisitSubmit() {
		if (this.newVisit.id === undefined) {
			/*this.newVisit.id = VISITS.length;
			this.newVisit.patient = this.patient;
			VISITS.push(this.newVisit);*/
			this.newVisit = new Visit();
		}
	}

	resetNewVisit() {
		this.newVisit = new Visit();
	}

	deleteVisit(visit) {
		if(visit === this.newVisit) {
			this.resetNewVisit();
		}
		/*var index = VISITS.indexOf(visit)
		if (index > -1) {
			VISITS.splice(index, 1);
		}*/
	}

	openConfirmationDialog(visit): void {
		const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
			width: '240px'
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.deleteVisit(visit);
			}
		});
	}

	onFilesChanged(event) {
    this.files = event.target.files;
    for (var i = this.files.length - 1; i >= 0; i--) {
    	this.readImage(event, i);
    }
  }

  readImage(event, index) {
	  var reader = new FileReader();
	  reader.onload = (event: ProgressEvent) => {
	    this.files[index]['url'] = (<FileReader>event.target).result;
	  }
	  reader.readAsDataURL(this.files[index]);
  }

}
