"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var moment = require("moment");
var AgePipe = /** @class */ (function () {
    function AgePipe() {
    }
    AgePipe.prototype.transform = function (value) {
        if (!value) {
            return 'Sin datos aún';
        }
        var today = moment();
        var birthdate = moment(value);
        var years = today.diff(birthdate, 'years');
        var html = years + ' años ';
        html += today.subtract(years, 'years').diff(birthdate, 'months') + ' meses';
        return html;
    };
    AgePipe = __decorate([
        core_1.Pipe({
            name: 'age'
        })
    ], AgePipe);
    return AgePipe;
}());
exports.AgePipe = AgePipe;
var AgeUpPipe = /** @class */ (function () {
    function AgeUpPipe() {
    }
    AgeUpPipe.prototype.transform = function (value, birthday) {
        if (!birthday || isNaN(birthday.getTime())) {
            return 'Sin fecha de nacimiento aún';
        }
        var update = moment(value);
        var birthdate = moment(birthday);
        var years = update.diff(birthdate, 'years');
        var months = update.subtract(years, 'years').diff(birthdate, 'months');
        var days = update.subtract(months, 'months').diff(birthdate, 'days');
        var html = years + ' años ' + months + ' meses ' + days + ' días';
        return html;
    };
    AgeUpPipe = __decorate([
        core_1.Pipe({
            name: 'ageUp'
        })
    ], AgeUpPipe);
    return AgeUpPipe;
}());
exports.AgeUpPipe = AgeUpPipe;
//# sourceMappingURL=age.pipe.js.map