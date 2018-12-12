import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatAccordion, MatDialog, MatSnackBar } from '@angular/material';

import { CatalogsService } from './../../catalogs/catalogs.service';
import { ConfigService } from './../../auth/config.service';
import { ConfirmationPatientDialogComponent } from './confirmation-patient-dialog.component';
import { environment } from './../../../environments/environment';
import { Patient } from './../../classes/patient';
import { PatientService } from './../patient.service';
import { SocialSecurity } from './../../classes/socialsecurity';

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
  biggerFont = false;
  cities;
  countries;
  currentUser = JSON.parse(localStorage.getItem('currentUser')).id;
  filteredSocialsecurities: SocialSecurity[];
  folded = false;
  screenType = 'wide';
  genders;
  multipleSocialSecurities;
  newPatient = false;
  patient: Patient;
  socialsecurities;
  states;

  @ViewChild(MatAccordion) accordion: MatAccordion;
  @ViewChild('patientBackgroundForm') public patientBackgroundForm: NgForm;
  @ViewChild('patientDataForm') public patientDataForm: NgForm;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private catalogsService: CatalogsService,
    private configService: ConfigService,
    public dialog: MatDialog,
    private patientService: PatientService,
    private route: ActivatedRoute,
    private router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.breakpointObserver.observe([
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      if (result.matches) {
        this.screenType = 'handset';
      }
    });

    this.breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.TabletPortrait,
    ]).subscribe(result => {
      if (result.matches) {
        this.screenType = 'tablet';
      }
    });

    this.breakpointObserver.observe([
      Breakpoints.TabletLandscape,
      Breakpoints.WebPortrait,
      Breakpoints.WebLandscape,
    ]).subscribe(result => {
      if (result.matches) {
        this.screenType = 'wide';
      }
    });

    this.addressFields = this.configService.getUserConfig(this.currentUser, 'addressFields');
    this.biggerFont = this.configService.getUserConfig(this.currentUser, 'biggerFont');
    this.birthtypes = this.catalogsService.getBirthTypes();
    this.bloodtypes = this.catalogsService.getBloodTypes();
    this.cities = this.catalogsService.getCities(this.configService.getUserConfig(this.currentUser,
      'cities'));
    this.countries = this.catalogsService.getCountries();
    this.genders = this.catalogsService.getGenders();
    this.multipleSocialSecurities = this.configService.getUserConfig(this.currentUser,
      'multipleSocialSecurities');
    this.socialsecurities = this.catalogsService.getSocialSecurities();
    this.states = this.catalogsService.getStates(this.configService.getUserConfig(this.currentUser,
      'states'));

    this.getPatient();
  }

  displayFn(socialSecurity?: SocialSecurity): string | undefined {
    return socialSecurity ? socialSecurity.name : undefined;
  }

  filterStates(event) {
    this.states = this.catalogsService.getStates(this.configService.getUserConfig(this.currentUser,
      'states')).filter(prov => prov.country === event.value.id);
  }

  filterCities(event) {
    this.cities = this.catalogsService.getCities(this.configService.getUserConfig(this.currentUser,
      'cities')).filter(city => city.state === event.value.id);
  }

  filterSocialSecurities(event, field) {
    if (typeof (event) === 'string') {
      const filterValue = event.toLowerCase();
      this.filteredSocialsecurities = this.socialsecurities.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
    } else {
      event = { target: { name: field } };
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
        // Default patient form values //
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
    const isBackgroundControl = this.patientBackgroundForm.controls[controlName] &&
      !this.patientBackgroundForm.controls[controlName].pristine;
    const isDataControl = this.patientDataForm.controls[controlName] &&
      !this.patientDataForm.controls[controlName].pristine;
    if (isBackgroundControl || isDataControl) {
      this.patientService.updatePatient(this.patient).subscribe();
    }
  }

  deletePatient() {
    this.patientService.deletePatient(this.patient.id).subscribe(confirmation => {
      const snackBarRef = this.snackBar.open('Paciente eliminado correctamente', 'OK', {
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
