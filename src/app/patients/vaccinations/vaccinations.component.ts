import { Component, OnInit, Input } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import { ConfigService } from './../../auth/config.service';
import { Patient } from './../../classes/patient';
import { VACCINATIONS, AGES, DOSES } from './../../catalogs/vaccinations';
import * as moment from 'moment';

@Component({
  selector: 'app-vaccinations',
  templateUrl: './vaccinations.component.html',
  styleUrls: ['./vaccinations.component.css']
})
export class VaccinationsComponent implements OnInit {

  APPLICATIONS = [];
  biggerFont = false;
  currentUser = JSON.parse(localStorage.getItem('currentUser')).id;
  displayedColumns: string[] = ['select', 'age', 'vaccine', 'date'];
  dataSource = new MatTableDataSource<any>(this.APPLICATIONS);
  selection = new SelectionModel<any>(true, []);
  @Input() patient: Patient;
  today: moment.Moment;

  constructor(
    private configService: ConfigService,
  ) { }

  ngOnInit() {
    this.biggerFont = this.configService.getUserConfig(this.currentUser, 'biggerFont');

    this.today = moment();
    for (const dose of DOSES) {
      const AGE = AGES.filter(age => age.id === dose.age)[0];
      const VACCINE = VACCINATIONS.filter(vaccine => vaccine.id === dose.vaccine)[0];
      this.APPLICATIONS.push({
        'age': AGE,
        'vaccine': VACCINE,
        'date': null,
      });
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

}
