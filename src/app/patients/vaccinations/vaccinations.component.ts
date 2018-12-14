import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfigService } from './../../auth/config.service';
import { Patient } from './../../classes/patient';
import { Application } from './../../classes/application';
import { VACCINATIONS, AGES, DOSES } from './../../catalogs/vaccinations';
import { NewApplicationDialogComponent } from './new-application-dialog.component';
import * as moment from 'moment';

@Component({
  selector: 'app-vaccinations',
  templateUrl: './vaccinations.component.html',
  styleUrls: ['./vaccinations.component.css']
})
export class VaccinationsComponent implements OnInit {

  APPLICATIONS: Application[] = [];
  biggerFont = false;
  currentUser = JSON.parse(localStorage.getItem('currentUser')).id;
  @Input() patient: Patient;
  today: moment.Moment;

  constructor(
    private configService: ConfigService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.biggerFont = this.configService.getUserConfig(this.currentUser, 'biggerFont');

    this.today = moment();
    for (const dose of DOSES) {
      const AGE = AGES.filter(age => age.id === dose.age)[0];
      const VACCINE = VACCINATIONS.filter(vaccine => vaccine.id === dose.vaccine)[0];
      this.APPLICATIONS.push({
        'age': AGE,
        'vaccine': VACCINE,
        'date': this.today,
        'dose': dose,
      });
    }
  }

  newApplication() {
    const dialogRef = this.dialog.open(NewApplicationDialogComponent, {
      width: '320px'
    });
  }

  deleteApplication(application: Application) {
    this.APPLICATIONS = this.APPLICATIONS.filter(app => app !== application);
  }

}
