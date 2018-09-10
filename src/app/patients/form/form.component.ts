import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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
	@ViewChild('patientDataForm') public patientDataForm: NgForm;
	@ViewChild('patientBackgroundForm') public patientBackgroundForm: NgForm;
	@ViewChild('visitForm') public visitForm: NgForm;

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

	updatePatient(event) {
		let controlName: string;
		if(event.value !== undefined && event.source) {
			controlName = event.source.ngControl.name;
		} else if(event.value !== undefined) {
			controlName = event.targetElement.name;
		} else {
			controlName = event.target.name;
		}
		let isBackgroundControl = this.patientBackgroundForm.controls[controlName] && !this.patientBackgroundForm.controls[controlName].pristine;
		let isDataControl = this.patientDataForm.controls[controlName] && !this.patientDataForm.controls[controlName].pristine;
		if(isBackgroundControl || isDataControl) {
			this.patientService.updatePatient(this.patient).subscribe();
		}
	}

	deletePatient() {
		this.patientService.deletePatient(this.patient.id).subscribe();
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
			this.patientService.addVisit(this.newVisit, this.patient.id)
	      .subscribe(visit => {
	        this.patient.visits.push(visit);
					this.newVisit = new Visit();
	      }
	    );
		}
	}

	resetNewVisit() {
		this.newVisit = new Visit();
	}

	updateVisit(event) {
		if(this.newVisit.id){
			let controlName: string;
			if(event.value !== undefined && event.source) {
				controlName = event.source.ngControl.name;
			} else if(event.value !== undefined) {
				controlName = event.targetElement.name;
			} else {
				controlName = event.target.name;
			}
			let isVisitControl = this.visitForm.controls[controlName] && !this.visitForm.controls[controlName].pristine;
			if(isVisitControl) {
				this.patientService.updateVisit(this.newVisit, this.patient.id).subscribe();
			}
		}
	}

	deleteVisit(visit) {
		this.patientService.deleteVisit(visit.id)
		.subscribe(result => {
			if(result) {
				var index = this.patient.visits.indexOf(visit);
				if (index > -1) {
					this.patient.visits.splice(index, 1);
				}
				if(visit === this.newVisit) {
					this.resetNewVisit();
				}
			}
		});
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
