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
var rxjs_1 = require("rxjs");
var appointments_1 = require("./../catalogs/appointments");
var schedules_1 = require("./../catalogs/schedules");
var moment = require("moment");
var SchedulesService = /** @class */ (function () {
    function SchedulesService() {
    }
    SchedulesService.prototype.getValidSchedules = function (view, day) {
        switch (view) {
            case 'weekly':
                return schedules_1.SCHEDULES.filter(function (schedule) {
                    return moment(schedule.validityStart) <= day.startOf('week') &&
                        moment(schedule.validityEnd) >= day.endOf('week');
                });
                break;
            case 'monthly':
                return schedules_1.SCHEDULES.filter(function (schedule) {
                    return moment(schedule.validityStart) <= day.startOf('month') &&
                        moment(schedule.validityEnd) >= day.endOf('month');
                });
                break;
            default:
                return schedules_1.SCHEDULES.filter(function (schedule) {
                    return moment(schedule.validityStart) <= day &&
                        moment(schedule.validityEnd) >= day;
                });
                break;
        }
    };
    SchedulesService.prototype.compareHours = function (a, b) {
        if (a.hour < b.hour) {
            return -1;
        }
        if (a.hour > b.hour) {
            return 1;
        }
        return 0;
    };
    SchedulesService.prototype.getAppointments = function (date, validSchedules, selectedSchedules) {
        var appointmentsList = appointments_1.APPOINTMENTS.filter(function (appointment) {
            var dateEval = appointment.date.format('YYYYMMDD') === date.format('YYYYMMDD');
            var validScheduleEval = validSchedules.indexOf(appointment.schedule) >= 0;
            var selectedScheduleEval = selectedSchedules.length > 0 ? selectedSchedules.indexOf(appointment.schedule) >= 0 : true;
            return (dateEval && validScheduleEval && selectedScheduleEval);
        });
        return appointmentsList.concat(this.getAppointmentsSpots(date, validSchedules, selectedSchedules, appointmentsList)).sort(this.compareHours);
    };
    SchedulesService.prototype.getAppointmentsSpots = function (date, validSchedules, selectedSchedules, appointmentsList) {
        var weekDay = date.weekday();
        var spots = [];
        var _loop_1 = function (schedule) {
            if (selectedSchedules.length === 0 || selectedSchedules.indexOf(schedule) > -1) {
                var day = void 0;
                if (schedule.periodicity === '1') {
                    day = schedule.weekDays[weekDay];
                }
                else {
                    for (var _i = 0, _a = schedule.selectedDays; _i < _a.length; _i++) {
                        var daySelected = _a[_i];
                        if (daySelected.date.format('YYYYMMDD') === date.format('YYYYMMDD')) {
                            day = daySelected;
                            break;
                        }
                    }
                }
                if (day && day.active) {
                    var spot_1;
                    var spotHour = void 0;
                    for (var _b = 0, _c = day.hours; _b < _c.length; _b++) {
                        var hour = _c[_b];
                        spotHour = hour.start.clone();
                        while (spotHour < hour.end) {
                            spot_1 = {
                                date: date,
                                hour: spotHour.format('HH:mm'),
                                id: 3,
                                indications: null,
                                patient: null,
                                reminderData: null,
                                reminderWay: null,
                                schedule: schedule,
                            };
                            var filteredAppointments = appointmentsList.filter(function (appointment) {
                                var a = appointment.date.format('YYYYMMDD') === spot_1.date.format('YYYYMMDD');
                                var b = appointment.hour === spot_1.hour;
                                var c = appointment.schedule === spot_1.schedule;
                                return (a && b && c);
                            });
                            if (filteredAppointments.length === 0) {
                                spots.push(spot_1);
                            }
                            spotHour = spotHour.add(schedule.appointmentInterval, 'm');
                        }
                    }
                }
            }
        };
        for (var _i = 0, validSchedules_1 = validSchedules; _i < validSchedules_1.length; _i++) {
            var schedule = validSchedules_1[_i];
            _loop_1(schedule);
        }
        return spots;
    };
    SchedulesService.prototype.getProfessionals = function () {
        return schedules_1.PROFESSIONALS;
    };
    SchedulesService.prototype.getSchedule = function (id) {
        return rxjs_1.of(schedules_1.SCHEDULES.filter(function (schedule) { return schedule.id === id; })[0]);
    };
    SchedulesService.prototype.updateSchedule = function (schedule) {
        return rxjs_1.of(true);
    };
    SchedulesService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], SchedulesService);
    return SchedulesService;
}());
exports.SchedulesService = SchedulesService;
//# sourceMappingURL=schedules.service.js.map