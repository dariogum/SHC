import { Injectable } from '@angular/core';

const CONFIG = [
	{
		user: 1,
		attributes: {
			addressFields: true,
			biggerFont: false,
			cities: ['all'],
			countries: ['all'],
			multipleSocialSecurities: true,
			role: 'administrator',
			socialSecurities: ['all'],
			states: ['all'],
		}
	},
	{
		user: 2,
		attributes: {
			addressFields: false,
			biggerFont: true,
			cities: [4160, 18233, 10406, 8620, 11160, 13853, 14970, 18603, 20611, 21725, 21203],
			countries: ['all'],
			multipleSocialSecurities: false,
			role: 'medic',
			socialSecurities: ['all'],
			states: [21],
		}
	}
];

const PERMISSIONS = [
	"viewPatientPersonalData",
	"viewPatientBackground",
	"viewVisits",
	"deleteUser",
	"deletePatient",
	"deleteVisit",
];

@Injectable({
	providedIn: 'root'
})
export class ConfigService {

	constructor() { }

	getUserConfig(userId, attribute?) {
		let userConfig = CONFIG.find(config => config.user === userId);
		if (!userConfig) {
			return [];
		}
		if (attribute) {
			return userConfig.attributes[attribute];
		}
		return userConfig.attributes;
	}
}
