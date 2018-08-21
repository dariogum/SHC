import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CITIES, COUNTRIES, STATES, SOCIALSECURITIES, SEXES, BIRTHTYPES, BLOODTYPES } from './../mock-patients';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
	handset = false;
	tablet = false;

	cities = CITIES;
	countries = COUNTRIES;
	states = STATES;
	socialsecurities = SOCIALSECURITIES;
	sexes = SEXES;
	birthtypes = BIRTHTYPES;
	bloodtypes = BLOODTYPES;

	nameFormControl = new FormControl('', [Validators.required]);
	lastnameFormControl = new FormControl('', [Validators.required]);
	birthdayFormControl = new FormControl();
	sexFormControl = new FormControl();

	documenttypeFormControl = new FormControl();
	documentnumberFormControl = new FormControl();

	countryFormControl = new FormControl(1);
	stateFormControl = new FormControl(20);
	cityFormControl = new FormControl(1);
	zipcodeFormControl = new FormControl();

	streetFormControl = new FormControl();
	numberFormControl = new FormControl();
	floorFormControl = new FormControl();
	unitFormControl = new FormControl();

	telFormControl = new FormControl();
	socialsecurityFormControl = new FormControl();
	socialsecuritynumberFormControl = new FormControl();

	birthtypeFormControl = new FormControl();
	weightFormControl = new FormControl();
	bloodtypeFormControl = new FormControl();
	rhfactorFormControl = new FormControl();

	apgarFormControl = new FormControl();
	gestationalageFormControl = new FormControl();
	circularcordFormControl = new FormControl();
	circularcordcommentFormControl = new FormControl();

	fatherFormControl = new FormControl();
	motherFormControl = new FormControl();
	brothersFormControl = new FormControl();
	othersFormControl = new FormControl();

	constructor(private breakpointObserver: BreakpointObserver) {}

	ngOnInit() {
		this.breakpointObserver.observe([
			Breakpoints.HandsetPortrait
			]).subscribe(result => {
				if (result.matches) {
					this.handset = true;
					this.tablet = false;
				} else {
					this.handset = false;
					this.tablet = false;
				}
			});
			this.breakpointObserver.observe([
				Breakpoints.TabletPortrait,
				Breakpoints.HandsetLandscape,
				]).subscribe(result => {
					if (result.matches) {
						this.handset = false;
						this.tablet = true;
					} else {
						this.handset = false;
						this.tablet = false;
					}
				});
			}

		}
