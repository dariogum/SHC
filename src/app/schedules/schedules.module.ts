import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDividerModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatToolbarModule,
} from '@angular/material';
import { SchedulesRoutingModule } from './schedules-routing.module';
import { GeneralViewComponent } from './general-view/general-view.component';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [GeneralViewComponent, FormComponent],
  imports: [
    CommonModule,
    SchedulesRoutingModule,
    FormsModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDividerModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatToolbarModule,
  ],
  entryComponents: [
    FormComponent
  ]
})
export class SchedulesModule { }
