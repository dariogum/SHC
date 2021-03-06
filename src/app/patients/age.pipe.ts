import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: Date): string {
    if (!value) {
      return 'Sin datos aún';
    }

    const today = moment();
    const birthdate = moment(value);
    const years = today.diff(birthdate, 'years');
    let html: string = years + ' años ';

    html += today.subtract(years, 'years').diff(birthdate, 'months') + ' meses';

    return html;
  }

}

@Pipe({
  name: 'ageUp'
})
export class AgeUpPipe implements PipeTransform {

  transform(value: Date, birthday: Date): string {
    if (!birthday || isNaN(birthday.getTime())) {
      return 'Sin fecha de nacimiento aún';
    }

    const update = moment(value);
    const birthdate = moment(birthday);
    const years = update.diff(birthdate, 'years');
    const months = update.subtract(years, 'years').diff(birthdate, 'months');
    const days = update.subtract(months, 'months').diff(birthdate, 'days');
    const html: string = years + ' años ' + months + ' meses ' + days + ' días';

    return html;
  }

}
