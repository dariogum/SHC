import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatAccordion, MatDialog, MatSnackBar } from '@angular/material';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { SocialSecurity } from './../../classes/socialsecurity';
import { Patient } from './../../classes/patient';
import { Visit } from './../../classes/visit';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { ConfirmationPatientDialogComponent } from './confirmation-patient-dialog.component';
import { ImageDialogComponent } from './image-dialog.component';
import { CITIES } from './../mock-cities';
import { COUNTRIES, STATES, SOCIALSECURITIES, GENDERS, BIRTHTYPES, BLOODTYPES } from './../mock-data';
import { PatientService } from './../patient.service';
import { environment } from './../../../environments/environment';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.css']

})
export class FormComponent implements OnInit {

	apiVersionUrl: string = environment.url + '/v1';
	birthtypes = BIRTHTYPES;
	bloodtypes = BLOODTYPES;
	cities = CITIES;
	countries = COUNTRIES;
	files: FileList = null;
	filteredSocialsecurities: SocialSecurity[];
	folded: Boolean = false;
	formClass: string = 'wide';
	genders = GENDERS;
	today: Date = new Date();
	newPatient: Boolean = false;
	patient: Patient;
	socialsecurities = SOCIALSECURITIES;
	states = STATES;
	uploadingFiles: Boolean = false;
	visitInForm: Visit = new Visit();

	@ViewChild(MatAccordion) accordion: MatAccordion;
	@ViewChild('patientBackgroundForm') public patientBackgroundForm: NgForm;
	@ViewChild('patientDataForm') public patientDataForm: NgForm;
	@ViewChild('visitForm') public visitForm: NgForm;

	constructor(private breakpointObserver: BreakpointObserver, private route: ActivatedRoute, private router: Router,
		public dialog: MatDialog, private patientService: PatientService, public snackBar: MatSnackBar) {
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

		this.visitInForm.date = this.today;
	}

	ngOnInit() {
		this.getPatient();
	}

	displayFn(socialSecurity?: SocialSecurity): string | undefined {
		return socialSecurity ? socialSecurity.name : undefined;
	}

	filterCities(event) {
		this.cities = CITIES.filter(city => city.state === event.value.id);
	}

	filterSocialSecurities(event, field) {
		if (typeof (event) === 'string') {
			const filterValue = event.toLowerCase();
			this.filteredSocialsecurities = this.socialsecurities.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
		} else {
			let event = { target: { name: field } };
			this.updatePatient(event);
		}
	}

	filterStates(event) {
		this.states = STATES.filter(state => state.country === event.value.id);
	}

	toggleAccordion() {
		if (this.folded) {
			this.accordion.openAll();
		} else {
			this.accordion.closeAll();
		}
		this.folded = !this.folded;
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

	visitInFormReset() {
		/** This tasks order is important **/
		this.visitInForm = new Visit();
		this.visitForm.reset();
		this.files = null;
		this.visitInForm.date = this.today;
	}


	addFileToVisit(visit: Visit, files: any) {
		for (let i = 0; i < files.length; i++) {
			visit.files.unshift({ id: files[i].data.id, url: this.apiVersionUrl + files[i].links.self });
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
				if (result.data.length) {
					this.addFileToVisit(visit, result.data);
					if (newVisit) {
						this.addVisitToPatient(visit);
					} else {
						this.files = null;
					}
					this.uploadingFiles = false;
				}
			});
		}
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
		if (this.visitInForm.id) {
			this.uploadingFiles = true;
			this.uploadFiles(this.visitInForm, false);
		} else {
			for (let i = 0; i < this.files.length; i++) {
				this.readImage(event, i);
			}
		}
	}

	deleteFile(file) {
		this.patientService.deleteFile(file.id)
			.subscribe(result => {
				if (result) {
					let index = this.visitInForm.files.indexOf(file);
					if (index > -1) {
						this.visitInForm.files.splice(index, 1);
					}
					let snackBarRef = this.snackBar.open('La imagen fue eliminada correctamente', 'OK', {
						duration: 2500,
					});
				}
			});
	}

	openFile(image) {
		const dialogRef = this.dialog.open(ImageDialogComponent, {
			data: image
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

}
