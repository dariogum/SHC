import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { Observable } from 'rxjs';

import { Schedule } from './../../classes/schedule';
import { SchedulesService } from './../schedules.service';
import * as moment from 'moment';

@Component({
  selector: 'app-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent implements OnInit {

  hour = 0;
  minutes = 0;
  schedules: Observable<Schedule[]>;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<AppointmentFormComponent>,
    private schedulesService: SchedulesService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.schedules = this.schedulesService.getValidSchedules('monthly', moment());
  }

}
