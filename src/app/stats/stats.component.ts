import { Component, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { Observable, of, Subject } from 'rxjs';

import { StatsService } from './stats.service';
import * as moment from 'moment';

@Component({
	selector: 'app-stats',
	templateUrl: './stats.component.html',
	styleUrls: ['./stats.component.css']
})
export class StatsComponent {
	startDate = moment().format('YYYY-MM-01');
	endDate = moment().format("YYYY-MM-DD");

	constructor(private bottomSheetRef: MatBottomSheetRef<StatsComponent>, private statsService: StatsService, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) { }

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
			.subscribe(visitsByMonth => this.data[2] = visitsByMonth);
	}

	getVisitsByPatients(): void {
		this.statsService.getVisitsByPatients(moment(this.startDate).format("YYYY-MM-DD"), moment(this.endDate).format("YYYY-MM-DD"))
			.subscribe(visitsByPatients => this.data[3] = visitsByPatients);
	}

	getVisitsBySocialSecurity(): void {
		this.statsService.getVisitsBySocialSecurity(moment(this.startDate).format("YYYY-MM-DD"), moment(this.endDate).format("YYYY-MM-DD"))
			.subscribe(visitsBySocialSecurity => this.data[4] = visitsBySocialSecurity);
	}
}
