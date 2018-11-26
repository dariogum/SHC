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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var stats_service_1 = require("./stats.service");
var catalogs_service_1 = require("./../catalogs/catalogs.service");
var moment = require("moment");
var chart_js_1 = require("chart.js");
var StatsComponent = /** @class */ (function () {
    function StatsComponent(catalogsService, bottomSheetRef, statsService, data) {
        this.catalogsService = catalogsService;
        this.bottomSheetRef = bottomSheetRef;
        this.statsService = statsService;
        this.data = data;
        this.endDate = moment().format('YYYY-MM-DD');
        this.startDate = moment().format('YYYY-MM-01');
    }
    StatsComponent.prototype.ngOnInit = function () {
        this.initializeVisitsByMonthChart();
        this.initializeVisitsBySocialSecurityChart();
    };
    StatsComponent.prototype.initializeVisitsByMonthChart = function () {
        this.context = this.visitsByMonth.nativeElement.getContext('2d');
        var visitsByMonthLabels = [];
        var visitsByMonthData = [];
        var visitsByMonthBgColors = [];
        for (var i = 0; i < this.data[2].length; i++) {
            visitsByMonthLabels.push(this.data[2][i].month + '/' + this.data[2][i].year);
            visitsByMonthData.push(this.data[2][i].visits);
            visitsByMonthBgColors.push(this.getRandomColor());
        }
        if (this.visitsByMonthChart && 'destroy' in this.visitsByMonthChart) {
            this.visitsByMonthChart.destroy();
        }
        this.visitsByMonthChart = new chart_js_1.default(this.context, {
            type: 'horizontalBar',
            data: {
                labels: visitsByMonthLabels,
                datasets: [{
                        data: visitsByMonthData,
                        backgroundColor: visitsByMonthBgColors,
                    }]
            },
            options: {
                tooltips: {
                    mode: 'point'
                },
                title: {
                    display: true,
                    text: 'Visitas por mes y año'
                },
                legend: {
                    display: false,
                },
                scales: {
                    xAxes: [{
                            ticks: {
                                beginAtZero: true,
                                stepSize: 1
                            }
                        }]
                }
            }
        });
    };
    StatsComponent.prototype.initializeVisitsBySocialSecurityChart = function () {
        this.context = this.visitsBySocialSecurity.nativeElement.getContext('2d');
        var visitsBySocialSecurityLabels = [];
        var visitsBySocialSecurityData = [];
        var visitsBySocialSecurityBgColors = [];
        for (var i = this.data[4].length - 1; i >= 0; i--) {
            var socialSecurity = this.catalogsService.getSocialSecurity(this.data[4][i].socialSecurity);
            if (socialSecurity) {
                visitsBySocialSecurityLabels.push(socialSecurity.name);
                visitsBySocialSecurityData.push(this.data[4][i].visits);
                visitsBySocialSecurityBgColors.push(this.getRandomColor());
            }
        }
        if (this.visitsBySocialSecurityChart && 'destroy' in this.visitsBySocialSecurityChart) {
            this.visitsBySocialSecurityChart.destroy();
        }
        this.visitsBySocialSecurityChart = new chart_js_1.default(this.context, {
            type: 'horizontalBar',
            data: {
                labels: visitsBySocialSecurityLabels,
                datasets: [{
                        data: visitsBySocialSecurityData,
                        backgroundColor: visitsBySocialSecurityBgColors,
                    }]
            },
            options: {
                tooltips: {
                    mode: 'point'
                },
                title: {
                    display: true,
                    text: 'Visitas por obra social'
                },
                legend: {
                    display: false,
                },
                scales: {
                    xAxes: [{
                            ticks: {
                                beginAtZero: true,
                                stepSize: 1
                            }
                        }]
                }
            }
        });
    };
    StatsComponent.prototype.getRandomColor = function () {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    StatsComponent.prototype.getNewPatients = function (event) {
        var _this = this;
        this.statsService.getNewPatients(moment(this.startDate).format('YYYY-MM-DD'), moment(this.endDate).format('YYYY-MM-DD'))
            .subscribe(function (newPatients) { return _this.data[0] = newPatients; });
    };
    StatsComponent.prototype.getVisits = function () {
        var _this = this;
        this.statsService.getVisits(moment(this.startDate).format('YYYY-MM-DD'), moment(this.endDate).format('YYYY-MM-DD'))
            .subscribe(function (visits) { return _this.data[1] = visits; });
    };
    StatsComponent.prototype.getVisitsByMonth = function () {
        var _this = this;
        this.statsService.getVisitsByMonth(moment(this.startDate).format('YYYY-MM-DD'), moment(this.endDate).format('YYYY-MM-DD'))
            .subscribe(function (visitsByMonth) {
            _this.data[2] = visitsByMonth;
            _this.initializeVisitsByMonthChart();
        });
    };
    StatsComponent.prototype.getVisitsBySocialSecurity = function () {
        var _this = this;
        this.statsService.getVisitsBySocialSecurity(moment(this.startDate).format('YYYY-MM-DD'), moment(this.endDate).format('YYYY-MM-DD'))
            .subscribe(function (visitsBySocialSecurity) {
            _this.data[4] = visitsBySocialSecurity;
            _this.initializeVisitsBySocialSecurityChart();
        });
    };
    __decorate([
        core_1.ViewChild('visitsByMonth'),
        __metadata("design:type", core_1.ElementRef)
    ], StatsComponent.prototype, "visitsByMonth", void 0);
    __decorate([
        core_1.ViewChild('visitsBySocialSecurity'),
        __metadata("design:type", core_1.ElementRef)
    ], StatsComponent.prototype, "visitsBySocialSecurity", void 0);
    StatsComponent = __decorate([
        core_1.Component({
            selector: 'app-stats',
            templateUrl: './stats.component.html',
            styleUrls: ['./stats.component.css']
        }),
        __param(3, core_1.Inject(material_1.MAT_BOTTOM_SHEET_DATA)),
        __metadata("design:paramtypes", [catalogs_service_1.CatalogsService,
            material_1.MatBottomSheetRef,
            stats_service_1.StatsService, Object])
    ], StatsComponent);
    return StatsComponent;
}());
exports.StatsComponent = StatsComponent;
//# sourceMappingURL=stats.component.js.map