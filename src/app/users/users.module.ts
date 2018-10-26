import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatListModule,
    MatCardModule, MatDividerModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatMenuModule,
    MatExpansionModule, MatCheckboxModule, MatDialogModule, MatStepperModule, MatProgressSpinnerModule,
    MatSnackBarModule, MatAutocompleteModule, MatProgressBarModule } from '@angular/material';

import { UsersRoutingModule } from './users-routing.module';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { NewUserDialogComponent } from './list/new-user-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
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
    ListComponent,
    FormComponent,
    NewUserDialogComponent
  ],
  entryComponents: [
    NewUserDialogComponent
  ]
})
export class UsersModule { }
