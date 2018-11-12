import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
	MatButtonModule,
	MatButtonToggleModule,
	MatCardModule,
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

@NgModule({
	declarations: [GeneralViewComponent],
	imports: [
		CommonModule,
		SchedulesRoutingModule,
		FormsModule,
		MatButtonModule,
		MatButtonToggleModule,
		MatCardModule,
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
	]
})
export class SchedulesModule { }
