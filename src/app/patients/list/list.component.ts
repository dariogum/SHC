import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

	patients = [
	{
		id: 1,
		name: 'Lila',
		age: '2 años y 5 meses'
	},
	{
		id: 2,
		name: 'Carol',
		age: '2 años y 1 mes'
	},
	{
		id: 3,
		name: 'Pepe',
		age: '3 años y 4 meses'
	},
	{
		id: 4,
		name: 'Jimmy',
		age: '1 años y 9 meses'
	},
	];

  constructor() { }

  ngOnInit() {
  }

}
