import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Application } from './../../classes/application';
import { Patient } from './../../classes/patient';
import { VaccineService } from './vaccine.service';
import { VACCINATIONS, AGES, DOSES } from './../../catalogs/vaccinations';

@Component({
  selector: 'app-new-application-dialog',
  templateUrl: 'new-application-dialog.html',
  styleUrls: ['./vaccinations.component.css']
})
export class NewApplicationDialogComponent {

  application: Application = new Application();
  ages = AGES;
  filteredVaccinations = [];
  filteredDoses = [];
  screenType = 'handset';
  today = new Date();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NewApplicationDialogComponent>,
    private vaccineService: VaccineService,
  ) {
    if (data.application) {
      this.application = data.application;
    } else {
      this.application.date = this.today;
    }
  }

  saveApplication() {
    if (this.application.id) {
      this.vaccineService.updateApplication(this.application, this.data.patient.id)
        .subscribe(application => {
          this.dialogRef.close();
        });
    } else {
      this.vaccineService.createApplication(this.application, this.data.patient.id)
        .subscribe(application => {
          this.dialogRef.close();
        });
    }
  }

  filterDoseByAge() {
    this.application.vaccine = null;
    this.application.dose = null;
    this.filteredDoses = DOSES.filter(dose => dose.age === this.application.age.id);
    this.filteredVaccinations = VACCINATIONS.filter(vaccine => {
      for (const dose of this.filteredDoses) {
        if (dose.vaccine === vaccine.id) {
          return true;
        }
      }
      return false;
    });
  }

  filterDoseByVaccine() {
    this.filteredDoses = DOSES.filter(dose => {
      return (dose.vaccine === this.application.vaccine.id && dose.age === this.application.age.id);
    });
  }

}
