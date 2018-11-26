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
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var environment_1 = require("./../../environments/environment");
var StatsService = /** @class */ (function () {
    function StatsService(http) {
        this.http = http;
        this.apiStatsUrl = environment_1.environment.url + '/v1/stats';
    }
    StatsService.prototype.getStats = function (startDate, endDate) {
        return rxjs_1.forkJoin(this.http.get(this.apiStatsUrl + "/newPatients/" + startDate + "," + endDate), this.http.get(this.apiStatsUrl + "/visits/" + startDate + "," + endDate), this.http.get(this.apiStatsUrl + "/visitsByMonth/" + startDate + "," + endDate), this.http.get(this.apiStatsUrl + "/visitsByPatients/" + startDate + "," + endDate), this.http.get(this.apiStatsUrl + "/visitsBySocialSecurity/" + startDate + "," + endDate)).pipe(operators_1.catchError(this.handleError('getStats')));
    };
    StatsService.prototype.getNewPatients = function (startDate, endDate) {
        return this.http.get(this.apiStatsUrl + "/newPatients/" + startDate + "," + endDate)
            .pipe(operators_1.catchError(this.handleError('getNewPatients')));
    };
    StatsService.prototype.getVisits = function (startDate, endDate) {
        return this.http.get(this.apiStatsUrl + "/visits/" + startDate + "," + endDate)
            .pipe(operators_1.catchError(this.handleError('getVisits')));
    };
    StatsService.prototype.getVisitsByMonth = function (startDate, endDate) {
        return this.http.get(this.apiStatsUrl + "/visitsByMonth/" + startDate + "," + endDate)
            .pipe(operators_1.catchError(this.handleError('getVisitsByMonth', [])));
    };
    StatsService.prototype.getVisitsByPatients = function (startDate, endDate) {
        return this.http.get(this.apiStatsUrl + "/visitsByPatients/" + startDate + "," + endDate)
            .pipe(operators_1.catchError(this.handleError('getVisitsByPatients', [])));
    };
    StatsService.prototype.getVisitsBySocialSecurity = function (startDate, endDate) {
        return this.http.get(this.apiStatsUrl + "/visitsBySocialSecurity/" + startDate + "," + endDate)
            .pipe(operators_1.catchError(this.handleError('getVisitsBySocialSecurity', [])));
    };
    StatsService.prototype.handleError = function (operation, result) {
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            console.error(operation + " failed: " + error.message);
            return rxjs_1.of(result);
        };
    };
    StatsService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], StatsService);
    return StatsService;
}());
exports.StatsService = StatsService;
//# sourceMappingURL=stats.service.js.map