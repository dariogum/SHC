import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfigService } from './../../auth/config.service';
import { Patient } from './../../classes/patient';
import { Application } from './../../classes/application';
import { NewApplicationDialogComponent } from './new-application-dialog.component';
import { VaccineService } from './vaccine.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-vaccinations',
  templateUrl: './vaccinations.component.html',
  styleUrls: ['./vaccinations.component.css']
})
export class VaccinationsComponent implements OnInit {

  applications: Observable<Application[]>;
  biggerFont = false;
  currentUser = JSON.parse(localStorage.getItem('currentUser')).id;
  @Input() patient: Patient;
  today = new Date();

  constructor(
    private configService: ConfigService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private vaccineService: VaccineService,
  ) { }

  ngOnInit() {
    this.biggerFont = this.configService.getUserConfig(this.currentUser, 'biggerFont');

    this.vaccineService.readApplications(this.patient.id)
      .subscribe(applications => this.applications = of(applications));
  }

  newApplication() {
    const dialogRef = this.dialog.open(NewApplicationDialogComponent, {
      width: '320px',
      data: {
        patient: this.patient
      }
    });
  }

  changeApplicationDate(application) {
    const dialogRef = this.dialog.open(NewApplicationDialogComponent, {
      width: '320px',
      data: {
        patient: this.patient,
        application: application,
      }
    });
  }

  deleteApplication(application: Application) {
    this.vaccineService.deleteApplication(application)
      .subscribe(result => {
        if (result) {
          const index = this.patient.applications.indexOf(application);
          if (index > -1) {
            this.patient.applications.splice(index, 1);
          }
          const snackBarRef = this.snackBar.open('La aplicación fue eliminada correctamente', 'OK', {
            duration: 2500,
          });
        }
      });
  }

}
