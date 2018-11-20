import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-hour-picker',
  templateUrl: './hour-picker.component.html',
  styleUrls: ['./hour-picker.component.css']
})
export class HourPickerComponent implements OnInit {

  @Input() hourAndMinutes;
  hour;
  minutes;

  constructor() { }

  ngOnInit() {
    this.hour = this.hourAndMinutes.hours();
    this.minutes = this.hourAndMinutes.minutes();
  }

  updateHourAndMinutes() {
    this.hourAndMinutes = moment().set({'hour': this.hour, 'minute': this.minutes});
  }

}
