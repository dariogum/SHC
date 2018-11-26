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
var layout_1 = require("@angular/cdk/layout");
var material_1 = require("@angular/material");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var config_service_1 = require("./../../auth/config.service");
var form_component_1 = require("./../form/form.component");
var patient_service_1 = require("./../../patients/patient.service");
var schedules_service_1 = require("./../schedules.service");
var moment = require("moment");
var GeneralViewComponent = /** @class */ (function () {
    function GeneralViewComponent(breakpointObserver, bottomSheet, configService, patientService, schedulesService) {
        this.breakpointObserver = breakpointObserver;
        this.bottomSheet = bottomSheet;
        this.configService = configService;
        this.patientService = patientService;
        this.schedulesService = schedulesService;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')).id;
        this.days = [];
        this.loading = false;
        this.screenType = 'wide';
        this.schedules = [];
        this.searchPatientsTerms = new rxjs_1.Subject();
        this.selectedSchedules = [];
        this.startView = 'month';
        this.view = 'daily';
        this.withoutFilters = true;
    }
    GeneralViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        moment.locale('es');
        this.userRole = this.configService.getUserConfig(this.currentUser, 'role');
        this.breakpointObserver.observe([
            layout_1.Breakpoints.HandsetPortrait
        ]).subscribe(function (result) {
            if (result.matches) {
                _this.screenType = 'handset';
            }
        });
        this.breakpointObserver.observe([
            layout_1.Breakpoints.HandsetLandscape,
            layout_1.Breakpoints.TabletPortrait,
        ]).subscribe(function (result) {
            if (result.matches) {
                _this.screenType = 'tablet';
            }
        });
        this.breakpointObserver.observe([
            layout_1.Breakpoints.TabletLandscape,
            layout_1.Breakpoints.WebPortrait,
            layout_1.Breakpoints.WebLandscape,
        ]).subscribe(function (result) {
            if (result.matches) {
                _this.screenType = 'wide';
            }
        });
        this.day = moment();
        this.changeView(false, false);
        this.patients = this.searchPatientsTerms.pipe(operators_1.debounceTime(300), operators_1.filter(function (term) { return term.length > 2; }), operators_1.distinctUntilChanged(), operators_1.switchMap(function (term) { return _this.patientService.searchPatients(term); }));
    };
    GeneralViewComponent.prototype.openBottomSheet = function (appointment) {
        this.bottomSheet.open(form_component_1.FormComponent, {
            data: { appointment: appointment },
        });
    };
    GeneralViewComponent.prototype.changeView = function (event, dayPicker) {
        var firstDay;
        var lastDay;
        switch (this.view) {
            case "weekly":
                this.startView = 'month';
                firstDay = this.day.clone().startOf('week');
                lastDay = this.day.clone().endOf('week');
                break;
            case "monthly":
                if (dayPicker)
                    dayPicker.close();
                if (event)
                    this.day = event;
                this.startView = 'year';
                firstDay = this.day.clone().startOf('month');
                lastDay = this.day.clone().endOf('month');
                this.monthName = this.day.clone().format('MMMM');
                break;
            default:
                this.startView = 'month';
                firstDay = this.day.clone();
                lastDay = this.day.clone();
                break;
        }
        this.setDays(firstDay, lastDay);
    };
    GeneralViewComponent.prototype.setDays = function (firstDay, lastDay) {
        this.days = [];
        this.schedules = this.schedulesService.getValidSchedules(this.view, this.day.clone());
        while (firstDay <= lastDay) {
            var day = {
                appointments: this.getAppointments(firstDay),
                date: firstDay.clone(),
                name: firstDay.clone().format('ddd DD/MM/YYYY'),
            };
            this.days.push(day);
            firstDay = firstDay.add(1, 'd');
        }
    };
    GeneralViewComponent.prototype.getAppointments = function (date) {
        return this.schedulesService.getAppointments(date, this.schedules, this.selectedSchedules);
    };
    GeneralViewComponent.prototype.displayFn = function (patient) {
        return patient ? patient.lastname + ' ' + patient.name : undefined;
    };
    GeneralViewComponent.prototype.searchPatients = function (term) {
        if (typeof (term) === 'string') {
            this.withoutFilters = true;
            this.searchPatientsTerms.next(term);
        }
        else {
            this.filterAppointmentsByPatient(term);
        }
    };
    GeneralViewComponent.prototype.filterAppointmentsByPatient = function (patient) {
        this.withoutFilters = false;
        for (var _i = 0, _a = this.days; _i < _a.length; _i++) {
            var day = _a[_i];
            day.filteredAppointments = day.appointments.filter(function (appointment) { return appointment.patient === patient.id; });
        }
    };
    GeneralViewComponent.prototype.clearPatient = function () {
        this.withoutFilters = true;
        this.patientSearchBox.nativeElement.value = '';
    };
    __decorate([
        core_1.ViewChild('patientSearchBox'),
        __metadata("design:type", core_1.ElementRef)
    ], GeneralViewComponent.prototype, "patientSearchBox", void 0);
    GeneralViewComponent = __decorate([
        core_1.Component({
            selector: 'app-general-view',
            templateUrl: './general-view.component.html',
            styleUrls: ['./general-view.component.css']
        }),
        __metadata("design:paramtypes", [layout_1.BreakpointObserver,
            material_1.MatBottomSheet,
            config_service_1.ConfigService,
            patient_service_1.PatientService,
            schedules_service_1.SchedulesService])
    ], GeneralViewComponent);
    return GeneralViewComponent;
}());
exports.GeneralViewComponent = GeneralViewComponent;
//# sourceMappingURL=general-view.component.js.map