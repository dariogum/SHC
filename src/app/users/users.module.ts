import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatMenuModule,
  MatSelectModule,
  MatStepperModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';

import { UsersRoutingModule } from './users-routing.module';
import { FormComponent } from './form/form.component';
import { ConfirmationUserDialogComponent } from './form/confirmation-user-dialog.component';
import { ListComponent } from './list/list.component';
import { NewUserDialogComponent } from './list/new-user-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSnackBarModule,
    MatStepperModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
  declarations: [
    ConfirmationUserDialogComponent,
    FormComponent,
    ListComponent,
    NewUserDialogComponent,
  ],
  entryComponents: [
    ConfirmationUserDialogComponent,
    NewUserDialogComponent,
  ]
})
export class UsersModule { }
