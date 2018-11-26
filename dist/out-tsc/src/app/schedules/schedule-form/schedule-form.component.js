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
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var schedules_service_1 = require("./../schedules.service");
var ScheduleFormComponent = /** @class */ (function () {
    function ScheduleFormComponent(breakpointObserver, schedulesService, route) {
        this.breakpointObserver = breakpointObserver;
        this.schedulesService = schedulesService;
        this.route = route;
        this.WEEKDAYS = [
            {
                id: 'monday',
                name: 'Lunes',
            },
            {
                id: 'tuesday',
                name: 'Martes',
            },
            {
                id: 'wednesday',
                name: 'Miércoles',
            },
            {
                id: 'thursday',
                name: 'Jueves',
            },
            {
                id: 'friday',
                name: 'Viernes',
            },
            {
                id: 'saturday',
                name: 'Sábado',
            },
            {
                id: 'sunday',
                name: 'Domingo',
            },
        ];
        this.formClass = 'wide';
    }
    ScheduleFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.breakpointObserver.observe([
            layout_1.Breakpoints.HandsetPortrait
        ]).subscribe(function (result) {
            if (result.matches) {
                _this.formClass = 'handset';
            }
        });
        this.breakpointObserver.observe([
            layout_1.Breakpoints.HandsetLandscape,
            layout_1.Breakpoints.TabletPortrait,
        ]).subscribe(function (result) {
            if (result.matches) {
                _this.formClass = 'tablet';
            }
        });
        this.breakpointObserver.observe([
            layout_1.Breakpoints.TabletLandscape,
            layout_1.Breakpoints.WebPortrait,
            layout_1.Breakpoints.WebLandscape,
        ]).subscribe(function (result) {
            if (result.matches) {
                _this.formClass = 'wide';
            }
        });
        this.getProfessionals();
        this.getSchedule();
    };
    ScheduleFormComponent.prototype.getSchedule = function () {
        var _this = this;
        var id = +this.route.snapshot.paramMap.get('id');
        this.schedulesService.getSchedule(id)
            .subscribe(function (schedule) { _this.schedule = schedule; });
    };
    ScheduleFormComponent.prototype.getProfessionals = function () {
        this.professionals = this.schedulesService.getProfessionals();
    };
    ScheduleFormComponent.prototype.updateSchedule = function (event) {
        var controlName;
        if (event.value !== undefined && event.source) {
            controlName = event.source.ngControl.name;
        }
        else if (event.value !== undefined) {
            controlName = event.targetElement.name;
        }
        else {
            controlName = event.target.name;
        }
        var isDataControl = this.scheduleDataForm.controls[controlName] &&
            !this.scheduleDataForm.controls[controlName].pristine;
        if (isDataControl) {
            this.schedulesService.updateSchedule(this.schedule).subscribe();
        }
    };
    ScheduleFormComponent.prototype.displayFn = function (schedule) {
        return schedule ? schedule.name : undefined;
    };
    ScheduleFormComponent.prototype.addHour = function (day) {
        day.hours.push({
            start: null,
            end: null
        });
    };
    ScheduleFormComponent.prototype.removeHour = function (day, hour) {
        day.hours = day.hours.filter(function (filteredHour) { return filteredHour !== hour; });
    };
    ScheduleFormComponent.prototype.applyHoursToAllDays = function (days, hours) {
        for (var i = days.length - 1; i >= 0; i--) {
            days[i].hours = hours;
        }
    };
    ScheduleFormComponent.prototype.compareDates = function (a, b) {
        if (a.date < b.date) {
            return -1;
        }
        if (a.date > b.date) {
            return 1;
        }
        return 0;
    };
    ScheduleFormComponent.prototype.selectDay = function (event) {
        for (var i = this.schedule.selectedDays.length - 1; i >= 0; i--) {
            if (this.schedule.selectedDays[i].date.format('YYYYMMDD') === event.value.format('YYYYMMDD')) {
                return false;
            }
        }
        this.schedule.selectedDays.push({
            date: event.value,
            name: event.value.format('dddd DD/MM/YYYY'),
            active: true,
            hours: []
        });
        this.schedule.selectedDays.sort(this.compareDates);
    };
    ScheduleFormComponent.prototype.removeDay = function (day) {
        this.schedule.selectedDays = this.schedule.selectedDays.filter(function (filteredDay) { return filteredDay !== day; });
    };
    __decorate([
        core_1.ViewChild('scheduleDataForm'),
        __metadata("design:type", forms_1.NgForm)
    ], ScheduleFormComponent.prototype, "scheduleDataForm", void 0);
    ScheduleFormComponent = __decorate([
        core_1.Component({
            selector: 'app-schedule-form',
            templateUrl: './schedule-form.component.html',
            styleUrls: ['./schedule-form.component.css']
        }),
        __metadata("design:paramtypes", [layout_1.BreakpointObserver,
            schedules_service_1.SchedulesService,
            router_1.ActivatedRoute])
    ], ScheduleFormComponent);
    return ScheduleFormComponent;
}());
exports.ScheduleFormComponent = ScheduleFormComponent;
//# sourceMappingURL=schedule-form.component.js.map