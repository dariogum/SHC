import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsRoutingModule } from './patients-routing.module';
import { ListComponent } from './list/list.component';
import { MatToolbarModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatListModule, MatCardModule, MatDividerModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatMenuModule, MatExpansionModule, MatCheckboxModule, MatDialogModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';
import { NewPatientDialogComponent } from './list/new-patient-dialog.component';
import { AgePipe } from './age.pipe';

@NgModule({
  imports: [
    CommonModule,
    PatientsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
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
    MatDialogModule
  ],
  declarations: [ListComponent, FormComponent, AgePipe, NewPatientDialogComponent],
  entryComponents: [
    NewPatientDialogComponent
  ],
})
export class PatientsModule { }
