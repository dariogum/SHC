import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { HourPickerComponent } from './../../hour-picker/hour-picker.component';
import { SchedulesService } from './../schedules.service';
import { Schedule } from './../../classes/schedule';
import * as moment from 'moment';

@Component({
	selector: 'app-schedule-form',
	templateUrl: './schedule-form.component.html',
	styleUrls: ['./schedule-form.component.css']
})
export class ScheduleFormComponent implements OnInit {

	WEEKDAYS = [
		{
			id: 'monday',
			name: 'Lunes',
		},
		{
			id: 'tuesday',
			name: 'Martes',
		},
		{
			id: 'wednesday',
			name: 'Miércoles',
		},
		{
			id: 'thursday',
			name: 'Jueves',
		},
		{
			id: 'friday',
			name: 'Viernes',
		},
		{
			id: 'saturday',
			name: 'Sábado',
		},
		{
			id: 'sunday',
			name: 'Domingo',
		},
	];

	filteredProfessionals;
	formClass = 'wide';
	professionals;
	schedule: Schedule = new Schedule();
	@ViewChild('scheduleDataForm') public scheduleDataForm: NgForm;

	constructor(
		private breakpointObserver: BreakpointObserver,
		private schedulesService: SchedulesService,
		private route: ActivatedRoute,
	) { }

	ngOnInit() {
		this.breakpointObserver.observe([
			Breakpoints.HandsetPortrait
		]).subscribe(result => {
			if (result.matches) {
				this.formClass = 'handset';
			}
		});

		this.breakpointObserver.observe([
			Breakpoints.HandsetLandscape,
			Breakpoints.TabletPortrait,
		]).subscribe(result => {
			if (result.matches) {
				this.formClass = 'tablet';
			}
		});

		this.breakpointObserver.observe([
			Breakpoints.TabletLandscape,
			Breakpoints.WebPortrait,
			Breakpoints.WebLandscape,
		]).subscribe(result => {
			if (result.matches) {
				this.formClass = 'wide';
			}
		});

		this.getProfessionals();
		this.getSchedule();
	}

	getSchedule(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.schedulesService.getSchedule(id)
			.subscribe(schedule => { this.schedule = schedule; });
	}

	getProfessionals() {
		this.professionals = this.schedulesService.getProfessionals();
	}

	updateSchedule(event) {
		let controlName: string;
		if (event.value !== undefined && event.source) {
			controlName = event.source.ngControl.name;
		} else if (event.value !== undefined) {
			controlName = event.targetElement.name;
		} else {
			controlName = event.target.name;
		}
		const isDataControl = this.scheduleDataForm.controls[controlName] &&
			!this.scheduleDataForm.controls[controlName].pristine;
		if (isDataControl) {
			this.schedulesService.updateSchedule(this.schedule).subscribe();
		}
	}

	displayFn(schedule?: Schedule): string | undefined {
		return schedule ? schedule.name : undefined;
	}

	addHour(day) {
		day.hours.push({
			start: moment().set({'hour': 0, 'minute': 0}),
      end: moment().set({'hour': 0, 'minute': 0}),
		});
	}

	removeHour(day, hour) {
		day.hours = day.hours.filter(filteredHour => filteredHour !== hour);
	}

	applyHoursToAllDays(days, hours) {
		for (var i = days.length - 1; i >= 0; i--) {
			days[i].hours = hours;
		}
	}

}
