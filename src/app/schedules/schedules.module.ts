import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDividerModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
import { SchedulesRoutingModule } from './schedules-routing.module';
import { GeneralViewComponent } from './general-view/general-view.component';
import { FormComponent } from './form/form.component';
import { ScheduleFormComponent } from './schedule-form/schedule-form.component';
import { HourPickerComponent } from './../hour-picker/hour-picker.component';

@NgModule({
  declarations: [GeneralViewComponent, FormComponent, ScheduleFormComponent, HourPickerComponent],
  imports: [
    CommonModule,
    SchedulesRoutingModule,
    FormsModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDividerModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
  entryComponents: [
    FormComponent
  ]
})
export class SchedulesModule { }
