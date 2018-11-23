import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';

import { SchedulesService } from './../schedules.service';
import * as moment from 'moment';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  hour = 0;
  minutes = 0;
  schedules = [];

  constructor(
    private bottomSheetRef: MatBottomSheetRef<FormComponent>,
    private schedulesService: SchedulesService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.schedules = this.schedulesService.getValidSchedules('monthly', moment());
  }

}
