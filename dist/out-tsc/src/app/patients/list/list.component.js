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
var material_1 = require("@angular/material");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var config_service_1 = require("./../../auth/config.service");
var new_patient_dialog_component_1 = require("./new-patient-dialog.component");
var patient_service_1 = require("./../patient.service");
var stats_component_1 = require("./../../stats/stats.component");
var stats_service_1 = require("./../../stats/stats.service");
var moment = require("moment");
var ListComponent = /** @class */ (function () {
    function ListComponent(bottomSheet, configService, dialog, patientService, snackBar, statsService) {
        this.bottomSheet = bottomSheet;
        this.configService = configService;
        this.dialog = dialog;
        this.patientService = patientService;
        this.snackBar = snackBar;
        this.statsService = statsService;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')).id;
        this.lastPatients = null;
        this.searchTerms = new rxjs_1.Subject();
        this.today = new Date();
    }
    ListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userRole = this.configService.getUserConfig(this.currentUser, 'role');
        this.getPatients();
        this.patients = this.searchTerms.pipe(operators_1.debounceTime(300), operators_1.filter(function (term) { return term.length > 2; }), operators_1.distinctUntilChanged(), operators_1.tap(function (_) { return _this.lastPatients = null; }), operators_1.switchMap(function (term) { return _this.patientService.searchPatients(term); }));
    };
    ListComponent.prototype.getPatients = function () {
        var _this = this;
        this.patientService.getPatients()
            .subscribe(function (patients) { return _this.lastPatients = rxjs_1.of(patients); });
    };
    ListComponent.prototype.search = function (term) {
        this.searchTerms.next(term);
    };
    ListComponent.prototype.openNewPatientDialog = function () {
        var dialogRef = this.dialog.open(new_patient_dialog_component_1.NewPatientDialogComponent, {
            width: '240px'
        });
    };
    ListComponent.prototype.openBottomSheet = function () {
        var _this = this;
        this.statsService.getStats(moment().format('YYYY-MM-01'), moment().format('YYYY-MM-DD')).subscribe(function (stats) {
            _this.bottomSheet.open(stats_component_1.StatsComponent, { data: stats });
        });
    };
    ListComponent = __decorate([
        core_1.Component({
            selector: 'app-list',
            templateUrl: './list.component.html',
            styleUrls: ['./list.component.css']
        }),
        __metadata("design:paramtypes", [material_1.MatBottomSheet,
            config_service_1.ConfigService,
            material_1.MatDialog,
            patient_service_1.PatientService,
            material_1.MatSnackBar,
            stats_service_1.StatsService])
    ], ListComponent);
    return ListComponent;
}());
exports.ListComponent = ListComponent;
//# sourceMappingURL=list.component.js.map