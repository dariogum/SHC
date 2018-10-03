import { Component, Inject, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { Observable, of, Subject } from 'rxjs';

import { SOCIALSECURITIES } from './../patients/mock-data';
import { StatsService } from './stats.service';
import * as moment from 'moment';
import Chart from 'chart.js';

@Component({
	selector: 'app-stats',
	templateUrl: './stats.component.html',
	styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
	startDate = moment().format('YYYY-MM-01');
	endDate = moment().format("YYYY-MM-DD");
	@ViewChild('visitsByPatient') visitsByPatient: ElementRef;
	@ViewChild('visitsBySocialSecurity') visitsBySocialSecurity: ElementRef;
	@ViewChild('visitsByMonth') visitsByMonth: ElementRef;
	context: CanvasRenderingContext2D;
	visitsByPatientChart;
	visitsBySocialSecurityChart;
	visitsByMonthChart;

	constructor(private bottomSheetRef: MatBottomSheetRef<StatsComponent>, private statsService: StatsService,
		@Inject(MAT_BOTTOM_SHEET_DATA) public data: any) { }

	ngOnInit() {
		this.initializeVisitsByPatientChart();
		this.initializeVisitsBySocialSecurityChart();
		this.initializeVisitsByMonthChart();
	}

	findInJson(needle, haystack) {
		for (let i = haystack.length - 1; i >= 0; i--) {
			if (haystack[i].id === needle) {
				return haystack[i];
			}
		}
		
		return null;
	}

	initializeVisitsByPatientChart() {
		this.context = (<HTMLCanvasElement>this.visitsByPatient.nativeElement).getContext('2d');

		let visitsByPatientLabels = [];
		let visitsByPatientData = [];
		let visitsByPatientBgColors = [];
		for (let i = this.data[3].length - 1; i >= 0; i--) {
			visitsByPatientLabels.push(this.data[3][i].patientName);
			visitsByPatientData.push(this.data[3][i].visits);
			visitsByPatientBgColors.push(this.getRandomColor());
		}
		this.visitsByPatientChart = new Chart(this.context, {
			type: 'horizontalBar',
			data: {
				labels: visitsByPatientLabels,
				datasets: [{
					data: visitsByPatientData,
					backgroundColor: visitsByPatientBgColors,
				}]
			},
			options: {
				title: {
            display: true,
            text: 'Visitas por paciente'
        },
        legend: {
            display: false,
        },
				scales: {
					xAxes: [{
						ticks: {
							beginAtZero: true,
							stepSize: 1
						}
					}]
				}
			}
		});
	}

	initializeVisitsBySocialSecurityChart() {
		this.context = (<HTMLCanvasElement>this.visitsBySocialSecurity.nativeElement).getContext('2d');

		let visitsBySocialSecurityLabels = [];
		let visitsBySocialSecurityData = [];
		let visitsBySocialSecurityBgColors = [];
		for (let i = this.data[4].length - 1; i >= 0; i--) {
			let socialSecurity = this.findInJson(this.data[4][i].socialSecurity, SOCIALSECURITIES);
			if(socialSecurity) {
				visitsBySocialSecurityLabels.push(socialSecurity.name);
				visitsBySocialSecurityData.push(this.data[4][i].visits);
				visitsBySocialSecurityBgColors.push(this.getRandomColor());
			}
		}
		this.visitsBySocialSecurityChart = new Chart(this.context, {
			type: 'horizontalBar',
			data: {
				labels: visitsBySocialSecurityLabels,
				datasets: [{
					data: visitsBySocialSecurityData,
					backgroundColor: visitsBySocialSecurityBgColors,
				}]
			},
			options: {
				title: {
            display: true,
            text: 'Visitas por obra social'
        },
        legend: {
            display: false,
        },
				scales: {
					xAxes: [{
						ticks: {
							beginAtZero: true,
							stepSize: 1
						}
					}]
				}
			}
		});
	}

	initializeVisitsByMonthChart() {
		this.context = (<HTMLCanvasElement>this.visitsByMonth.nativeElement).getContext('2d');

		let visitsByMonthLabels = [];
		let visitsByMonthData = [];
		let visitsByMonthBgColors = [];
		for (let i = 0; i < this.data[2].length; i++) {
			visitsByMonthLabels.push(this.data[2][i].month + "/" + this.data[2][i].year);
			visitsByMonthData.push(this.data[2][i].visits);
			visitsByMonthBgColors.push(this.getRandomColor());
		}
		this.visitsByMonthChart = new Chart(this.context, {
			type: 'horizontalBar',
			data: {
				labels: visitsByMonthLabels,
				datasets: [{
					data: visitsByMonthData,
					backgroundColor: visitsByMonthBgColors,
				}]
			},
			options: {
				title: {
            display: true,
            text: 'Visitas por mes y año'
        },
        legend: {
            display: false,
        },
				scales: {
					xAxes: [{
						ticks: {
							beginAtZero: true,
							stepSize: 1
						}
					}]
				}
			}
		});
	}

	getRandomColor() {
		let letters = '0123456789ABCDEF';
		let color = '#';
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}

	getNewPatients(): any {
		this.statsService.getNewPatients(moment(this.startDate).format("YYYY-MM-DD"), moment(this.endDate).format("YYYY-MM-DD"))
			.subscribe(newPatients => this.data[0] = newPatients);
	}

	getVisits(): void {
		this.statsService.getVisits(moment(this.startDate).format("YYYY-MM-DD"), moment(this.endDate).format("YYYY-MM-DD"))
			.subscribe(visits => this.data[1] = visits);
	}

	getVisitsByMonth(): void {
		this.statsService.getVisitsByMonth(moment(this.startDate).format("YYYY-MM-DD"), moment(this.endDate).format("YYYY-MM-DD"))
			.subscribe(visitsByMonth => {
				this.data[2] = visitsByMonth;
				this.initializeVisitsByMonthChart();
			});
	}

	getVisitsByPatients(): void {
		this.statsService.getVisitsByPatients(moment(this.startDate).format("YYYY-MM-DD"), moment(this.endDate).format("YYYY-MM-DD"))
			.subscribe(visitsByPatients => {
				this.data[3] = visitsByPatients;
				this.initializeVisitsByPatientChart();
			});
	}

	getVisitsBySocialSecurity(): void {
		this.statsService.getVisitsBySocialSecurity(moment(this.startDate).format("YYYY-MM-DD"), moment(this.endDate).format("YYYY-MM-DD"))
			.subscribe(visitsBySocialSecurity => {
				this.data[4] = visitsBySocialSecurity;
				this.initializeVisitsBySocialSecurityChart();
			});
	}

}
