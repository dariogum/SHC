import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatListModule,
    MatCardModule, MatDividerModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatMenuModule,
    MatExpansionModule, MatCheckboxModule, MatDialogModule, MatStepperModule, MatProgressSpinnerModule,
    MatSnackBarModule, MatAutocompleteModule, MatProgressBarModule } from '@angular/material';

import { PatientsRoutingModule } from './patients-routing.module';
import { AgePipe, AgeUpPipe } from './age.pipe';
import { FormComponent } from './form/form.component';
import { ConfirmationPatientDialogComponent } from './form/confirmation-patient-dialog.component';
import { ListComponent } from './list/list.component';
import { NewPatientDialogComponent } from './list/new-patient-dialog.component';
import { VisitsComponent } from './visits/visits.component';
import { ConfirmationDialogComponent } from './visits/confirmation-dialog.component';
import { ImageDialogComponent } from './visits/image-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    PatientsRoutingModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatCardModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatMenuModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatDialogModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatProgressBarModule
  ],
  declarations: [
    AgePipe,
    AgeUpPipe,
    ConfirmationDialogComponent,
    ConfirmationPatientDialogComponent,
    FormComponent,
    ImageDialogComponent,
    ListComponent,
    NewPatientDialogComponent,
    VisitsComponent
  ],
  entryComponents: [
    ConfirmationDialogComponent,
    ConfirmationPatientDialogComponent,
    ImageDialogComponent,
    NewPatientDialogComponent,
  ]
})
export class PatientsModule { }
