import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CITIES, COUNTRIES, STATES, SOCIALSECURITIES, GENDERS, BIRTHTYPES, BLOODTYPES, PATIENTS } from './../mock-data';
import { Patient } from './../classes/patient';

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
	genders = GENDERS;
	birthtypes = BIRTHTYPES;
	bloodtypes = BLOODTYPES;

	patient: Patient;

	constructor(private breakpointObserver: BreakpointObserver, private route: ActivatedRoute) { }

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

				this.getPacient();
			}

			getPacient(): void {
				const id = +this.route.snapshot.paramMap.get('id');
				this.patient = PATIENTS[id];
			}

		}
