import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
	name: 'age'
})
export class AgePipe implements PipeTransform {

	transform(value: Date): string {
		let today = moment();
		let birthdate = moment(value);
		let years = today.diff(birthdate, 'years');
		let html: string = years + " años ";

		html += today.subtract(years, 'years').diff(birthdate, 'months') + " meses";

		return html;
	}

}

@Pipe({
	name: 'ageUp'
})
export class AgeUpPipe implements PipeTransform {

	transform(value: Date, birthday: Date): string {
		let update = moment(value);
		let birthdate = moment();
		if(birthday !== undefined) {
			birthdate = moment(birthday);
		}
		let years = update.diff(birthdate, 'years');
		let months = update.subtract(years, 'years').diff(birthdate, 'months');
		let days = update.subtract(months, 'months').diff(birthdate, 'days');
		let html: string = years + " años " + months + " meses " + days + " días";

		return html;
	}

}