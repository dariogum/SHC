import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-hour-picker',
  templateUrl: './hour-picker.component.html',
  styleUrls: ['./hour-picker.component.css']
})
export class HourPickerComponent {

  private _hour;
  private _minutes;

  @Input()
  set hourAndMinutes(hourAndMinutes) {
    if (hourAndMinutes) {
      this._hour = hourAndMinutes.hours();
      this._minutes = hourAndMinutes.minutes();
    }
  }

  get hourAndMinutes() {
    return moment().set({ 'hour': this._hour, 'minute': this._minutes });
  }

  @Output() hourAndMinutesSetted = new EventEmitter<any>();
  updateHourAndMinutes() {
    this.hourAndMinutesSetted.emit(moment().set({ 'hour': this._hour, 'minute': this._minutes }));
  }
}
