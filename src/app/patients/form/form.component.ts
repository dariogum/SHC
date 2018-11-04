import { Component, OnInit, ViewChild, HostBinding } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatAccordion, MatDialog, MatSnackBar } from '@angular/material';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { SocialSecurity } from './../../classes/socialsecurity';
import { Patient } from './../../classes/patient';
import { ConfirmationPatientDialogComponent } from './confirmation-patient-dialog.component';
import { CatalogsService } from './../../catalogs/catalogs.service';
import { ConfigService } from './../../auth/config.service';
import { PatientService } from './../patient.service';
import { environment } from './../../../environments/environment';

const APIVERSIONURL: string = environment.url + '/v1';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {

	addressFields;
	birthtypes;
	bloodtypes;
	biggerFont: boolean = false;
	cities;
	countries;
	currentUser = JSON.parse(localStorage.getItem('currentUser')).id;
	filteredSocialsecurities: SocialSecurity[];
	folded: boolean = false;
	formClass: string = 'wide';
	genders;
	multipleSocialSecurities;
	newPatient: boolean = false;
	patient: Patient;
	socialsecurities;
	states;

	@ViewChild(MatAccordion) accordion: MatAccordion;
	@ViewChild('patientBackgroundForm') public patientBackgroundForm: NgForm;
	@ViewChild('patientDataForm') public patientDataForm: NgForm;

	constructor(private breakpointObserver: BreakpointObserver, private route: ActivatedRoute,
		private router: Router, public dialog: MatDialog, private patientService: PatientService,
		private configService: ConfigService, private catalogsService: CatalogsService,
		public snackBar: MatSnackBar) { }

	ngOnInit() {
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

		this.addressFields = this.configService.getUserConfig(this.currentUser, 'addressFields');
		this.biggerFont = this.configService.getUserConfig(this.currentUser, 'biggerFont');
		this.birthtypes = this.catalogsService.getBirthTypes();
		this.bloodtypes = this.catalogsService.getBloodTypes();
		this.cities = this.catalogsService.getCities(this.configService.getUserConfig(this.currentUser, 'cities'));
		this.countries = this.catalogsService.getCountries();
		this.genders = this.catalogsService.getGenders();
		this.socialsecurities = this.catalogsService.getSocialSecurities();
		this.multipleSocialSecurities = this.configService.getUserConfig(this.currentUser, 'multipleSocialSecurities');
		this.states = this.catalogsService.getStates(this.configService.getUserConfig(this.currentUser, 'states'));
		
		this.getPatient();
	}

	displayFn(socialSecurity?: SocialSecurity): string | undefined {
		return socialSecurity ? socialSecurity.name : undefined;
	}

	filterStates(event) {
		this.states = this.catalogsService.getStates(this.configService.getUserConfig(this.currentUser, 'states')).filter(state => state.country === event.value.id);
	}

	filterCities(event) {
		this.cities = this.catalogsService.getCities(this.configService.getUserConfig(this.currentUser, 'cities')).filter(city => city.state === event.value.id);
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
				//** Default patient form values **//
				if (this.patient.country === null) {
					this.patient.country = this.countries[0];
				}
				if (this.patient.state === null) {
					this.patient.state = this.states[0];
				}
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

}