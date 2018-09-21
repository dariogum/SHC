import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { Observable, of, Subject } from 'rxjs';

import { StatsService } from './stats.service';
import * as moment from 'moment';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
	total: Observable<any>;
	totalByMonth: Observable<any>;
	totalByPatients: Observable<any>;
	totalBySocialSecurity: Observable<any>;

	startDate = moment().subtract(20, 'years').format("YYYY-MM-DD");
	endDate = moment().format("YYYY-MM-DD");

  constructor(private bottomSheetRef: MatBottomSheetRef<StatsComponent>, private statsService: StatsService) {}

  ngOnInit() {
  	this.getTotal();
  	this.getTotalByMonth();
  	this.getTotalByPatients();
  	this.getTotalBySocialSecurity();
  }

  getTotal(): void {
		this.statsService.getTotal(this.startDate, this.endDate)
			.subscribe(total => this.total = of(total) );
	}

  getTotalByMonth(): void {
		this.statsService.getTotalByMonth(this.startDate, this.endDate)
			.subscribe(totalByMonth => this.totalByMonth = of(totalByMonth) );
	}

  getTotalByPatients(): void {
		this.statsService.getTotalByPatients(this.startDate, this.endDate)
			.subscribe(totalByPatients => this.totalByPatients = of(totalByPatients) );
	}

	getTotalBySocialSecurity(): void {
		this.statsService.getTotalBySocialSecurity(this.startDate, this.endDate)
			.subscribe(totalBySocialSecurity => this.totalBySocialSecurity = of(totalBySocialSecurity) );
	}
}
