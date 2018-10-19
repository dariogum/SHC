import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ConfigService {

	users = [
		{
			user: 1,
			configurations: {
				fields: [],
				countries: [],
				states: [],
				cities: [],
				sociasecurities: [],
			}
		}
	];

	roles = [
		{
			role: 1,
			configurations: {
				fields: [],
				countries: [],
				states: [],
				cities: [],
				sociasecurities: [],
			}
		}
	];

	constructor() { }

	getUserConfig(user, config) {
		for (let userConfig of this.users) {
			if (userConfig.user === user) {
				if (config !== undefined) {
					return userConfig.configurations[config];
				}
				return userConfig.configurations;
			}
		}
		return false;
	}

	getRoleConfig(role, config) {
		for (let roleConfig of this.roles) {
			if (roleConfig.role === role) {
				if (config !== undefined) {
					return roleConfig.configurations[config];
				}
				return roleConfig.configurations;
			}
		}
		return false;
	}

}
