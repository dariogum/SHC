import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import * as moment from 'moment';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  SCHEDULES = [
    {
      id: 1,
      name: 'Agenda 1',
      professional: 1,
      weekDays: [0, 1, 2, 3, 4, 5, 6],
      periodicity: ['weekly'],
      validity: {
        start: moment('20180101'),
        end: moment('20181231'),
      },
      interval: 20,
      color: '#bbdefb',
    },
    {
      id: 2,
      name: 'Agenda 2',
      professional: 2,
      weekDays: [0, 1, 2, 3, 4, 5, 6],
      periodicity: ['weekly'],
      validity: {
        start: moment('20180101'),
        end: moment('20181231'),
      },
      interval: 30,
      color: '#dcedc8',
    },
  ];

  hour = 0;
  minutes = 0;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<FormComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.hour = moment.duration(this.data.appointment.hour).hours();
    this.minutes = moment.duration(this.data.appointment.hour).minutes();
  }

}
