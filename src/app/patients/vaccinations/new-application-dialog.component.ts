import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { Application } from './../../classes/application';
import { Patient } from './../../classes/patient';
import { PatientService } from './../patient.service';
import { VACCINATIONS, AGES, DOSES } from './../../catalogs/vaccinations';

@Component({
  selector: 'app-new-application-dialog',
  templateUrl: 'new-application-dialog.html',
})
export class NewApplicationDialogComponent {

  application: Application = new Application();
  @Input() patient: Patient;
  ages = AGES;
  filteredVaccinations = [];
  filteredDoses = [];

  constructor(
    public dialogRef: MatDialogRef<NewApplicationDialogComponent>,
    private patientService: PatientService,
  ) { }

  createApplication() {
    this.patientService.createApplication(this.patient.id, this.application)
      .subscribe(application => {
        this.dialogRef.close();
      });
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
