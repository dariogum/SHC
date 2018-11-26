"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CONFIG = [
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
var PERMISSIONS = [
    'viewPatientPersonalData',
    'viewPatientBackground',
    'viewVisits',
    'deleteUser',
    'deletePatient',
    'deleteVisit',
];
var ConfigService = /** @class */ (function () {
    function ConfigService() {
    }
    ConfigService.prototype.getUserConfig = function (userId, attribute) {
        var userConfig = CONFIG.find(function (config) { return config.user === userId; });
        if (!userConfig) {
            return [];
        }
        if (attribute) {
            return userConfig.attributes[attribute];
        }
        return userConfig.attributes;
    };
    ConfigService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], ConfigService);
    return ConfigService;
}());
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map