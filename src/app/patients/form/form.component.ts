import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatAccordion, MatDialog, MatSnackBar } from '@angular/material';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, of } from 'rxjs';
import { Patient } from './../../classes/patient';
import { Visit } from './../../classes/visit';
import { COUNTRIES, STATES, SOCIALSECURITIES, GENDERS, BIRTHTYPES, BLOODTYPES } from './../mock-data';
import { CITIES } from './../mock-cities';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { ConfirmationPatientDialogComponent } from './confirmation-patient-dialog.component';
import { PatientService } from './../patient.service';
import { environment } from './../../../environments/environment';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.css']

})
export class FormComponent implements OnInit {

	private formClass = 'wide';
	private folded = false;
	private newPatient = false;
	private maxDate = new Date();

	private cities = CITIES;
	private countries = COUNTRIES;
	private states = STATES;
	private socialsecurities = SOCIALSECURITIES;
	private genders = GENDERS;
	private birthtypes = BIRTHTYPES;
	private bloodtypes = BLOODTYPES;

	private patient: Patient;
	private visitInForm: Visit = new Visit();
	private files: FileList = null;

	private apiVersionUrl = environment.url + '/v1';

	@ViewChild(MatAccordion) accordion: MatAccordion;
	@ViewChild('patientDataForm') public patientDataForm: NgForm;
	@ViewChild('patientBackgroundForm') public patientBackgroundForm: NgForm;
	@ViewChild('visitForm') public visitForm: NgForm;

	constructor(private breakpointObserver: BreakpointObserver, private route: ActivatedRoute,
		private router: Router, public dialog: MatDialog, private patientService: PatientService,
		public snackBar: MatSnackBar) {
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
			.subscribe(patient => {
				this.patient = patient;
				this.newPatient = (this.route.snapshot.queryParamMap.get('newPatient') === 'true');
			});
	}

	updatePatient(event) {
		let controlName: string;
		if (event.value !== undefined && event.source) {
			controlName = event.source.ngControl.name;
		} else if (event.value !== undefined) {
			controlName = event.targetElement.name;
		} else {
			controlName = event.target.name;
		}
		let isBackgroundControl = this.patientBackgroundForm.controls[controlName] && !this.patientBackgroundForm.controls[controlName].pristine;
		let isDataControl = this.patientDataForm.controls[controlName] && !this.patientDataForm.controls[controlName].pristine;
		if (isBackgroundControl || isDataControl) {
			this.patientService.updatePatient(this.patient).subscribe();
		}
	}

	deletePatient() {
		this.patientService.deletePatient(this.patient.id).subscribe(confirmation => {
			let snackBarRef = this.snackBar.open('Paciente eliminado correctamente', 'OK', {
				duration: 2500,
			});
			this.router.navigate(['patients']);
		});
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

	addFileToVisit(visit: Visit, files) {
		for (var i = 0; i < files.lenght; i++) {
			visit.files.push({ url: this.apiVersionUrl + files[i].links.self })
		}
	}

	addVisitToPatient(visit: Visit) {
		this.patient.visits.push(visit);
		let snackBarRef = this.snackBar.open('La visita fue registrada correctamente', 'OK', {
			duration: 2500,
		});
		this.visitInFormReset();
	}

	uploadFiles(visit: Visit, newVisit: boolean) {
		if (newVisit) {
			visit.files = [];
		}
		if (this.files.length) {
			this.patientService.uploadFiles(this.files, visit.id).subscribe(result => {
				if (result.body !== undefined) {
					this.addFileToVisit(visit, result.body);
					if(newVisit) {
						this.addVisitToPatient(visit);
					} else {
						this.files = null;
					}
				}
			});
		}
	}

	onVisitSubmit() {
		if (this.visitInForm.id === undefined) {
			this.patientService.addVisit(this.visitInForm, this.patient.id).subscribe(visit => {
				this.visitInForm.id = visit.id;
				if (this.files && this.files.length) {
					this.uploadFiles(this.visitInForm, true);
				} else {
					this.addVisitToPatient(this.visitInForm);
				}
			});
		}
	}

	visitInFormReset() {
		/** This tasks order is important **/
		this.visitInForm = new Visit();
		this.visitForm.reset();
		this.files = null;
	}

	updateVisit(event) {
		if (this.visitInForm.id && this.visitForm.form.valid) {
			let controlName: string;
			if (event.value !== undefined && event.source) {
				controlName = event.source.ngControl.name;
			} else if (event.value !== undefined) {
				controlName = event.targetElement.name;
			} else {
				controlName = event.target.name;
			}
			let isVisitControl = this.visitForm.controls[controlName] && !this.visitForm.controls[controlName].pristine;
			if (isVisitControl) {
				this.patientService.updateVisit(this.visitInForm, this.patient.id).subscribe();
			}
		}
	}

	deleteVisit(visit) {
		this.patientService.deleteVisit(visit.id)
			.subscribe(result => {
				if (result) {
					let index = this.patient.visits.indexOf(visit);
					if (index > -1) {
						this.patient.visits.splice(index, 1);
					}
					if (visit === this.visitInForm) {
						this.visitInFormReset();
					}
					let snackBarRef = this.snackBar.open('La visita fue eliminada correctamente', 'OK', {
						duration: 2500,
					});
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

	readImage(event, index) {
		let reader = new FileReader();
		reader.onload = (event: ProgressEvent) => {
			this.files[index]['url'] = (<FileReader>event.target).result;
		}
		reader.readAsDataURL(this.files[index]);
	}

	onFilesChanged(event) {
		this.files = event.target.files;
		for (var i = 0; i < this.files.length; i++) {
			this.readImage(event, i);
		}
		if (this.visitInForm.id) {
			this.uploadFiles(this.visitInForm, false);
		}
	}

	filterCities(event) {
		this.cities = CITIES.filter(city => city.state === event.value.id);
	}

	filterStates(event) {
		this.states = STATES.filter(state => state.country === event.value.id);
	}

}
