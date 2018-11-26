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
var birthtypes_1 = require("./birthtypes");
var bloodtypes_1 = require("./bloodtypes");
var cities_1 = require("./cities");
var countries_1 = require("./countries");
var doctypes_1 = require("./doctypes");
var genders_1 = require("./genders");
var socialsecurities_1 = require("./socialsecurities");
var states_1 = require("./states");
var CatalogsService = /** @class */ (function () {
    function CatalogsService() {
        this.filterParameters = null;
    }
    CatalogsService.prototype.filterCallback = function (item) {
        for (var i = this.filterParameters.length - 1; i >= 0; i--) {
            if (this.filterParameters[i] === item.id) {
                return true;
            }
        }
        return false;
    };
    CatalogsService.prototype.getArrayFiltered = function (array, params) {
        if (params && params[0] !== 'all') {
            this.filterParameters = params;
            return array.filter(this.filterCallback, this);
        }
        return array;
    };
    CatalogsService.prototype.getBirthTypes = function (params) {
        return this.getArrayFiltered(birthtypes_1.BIRTHTYPES, params);
    };
    CatalogsService.prototype.getBloodTypes = function (params) {
        return this.getArrayFiltered(bloodtypes_1.BLOODTYPES, params);
    };
    CatalogsService.prototype.getCities = function (params) {
        return this.getArrayFiltered(cities_1.CITIES, params);
    };
    CatalogsService.prototype.getCountries = function (params) {
        return this.getArrayFiltered(countries_1.COUNTRIES, params);
    };
    CatalogsService.prototype.getDocTypes = function (params) {
        return this.getArrayFiltered(doctypes_1.DOCTYPES, params);
    };
    CatalogsService.prototype.getGenders = function (params) {
        return this.getArrayFiltered(genders_1.GENDERS, params);
    };
    CatalogsService.prototype.getSocialSecurities = function (params) {
        return this.getArrayFiltered(socialsecurities_1.SOCIALSECURITIES, params);
    };
    CatalogsService.prototype.getStates = function (params) {
        return this.getArrayFiltered(states_1.STATES, params);
    };
    CatalogsService.prototype.getBirthType = function (id) {
        return birthtypes_1.BIRTHTYPES.find(function (item) { return item.id === id; });
    };
    CatalogsService.prototype.getBloodType = function (id) {
        return bloodtypes_1.BLOODTYPES.find(function (item) { return item.id === id; });
    };
    CatalogsService.prototype.getCity = function (id) {
        return cities_1.CITIES.find(function (item) { return item.id === id; });
    };
    CatalogsService.prototype.getCountry = function (id) {
        return countries_1.COUNTRIES.find(function (item) { return item.id === id; });
    };
    CatalogsService.prototype.getDocType = function (id) {
        return doctypes_1.DOCTYPES.find(function (item) { return item.id === id; });
    };
    CatalogsService.prototype.getGender = function (id) {
        return genders_1.GENDERS.find(function (item) { return item.id === id; });
    };
    CatalogsService.prototype.getSocialSecurity = function (id) {
        return socialsecurities_1.SOCIALSECURITIES.find(function (item) { return item.id === id; });
    };
    CatalogsService.prototype.getState = function (id) {
        return states_1.STATES.find(function (item) { return item.id === id; });
    };
    CatalogsService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], CatalogsService);
    return CatalogsService;
}());
exports.CatalogsService = CatalogsService;
//# sourceMappingURL=catalogs.service.js.map