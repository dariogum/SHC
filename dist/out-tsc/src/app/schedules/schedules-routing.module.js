"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var general_view_component_1 = require("./general-view/general-view.component");
var schedule_form_component_1 = require("./schedule-form/schedule-form.component");
var routes = [
    { path: '', component: general_view_component_1.GeneralViewComponent },
    { path: ':id', component: schedule_form_component_1.ScheduleFormComponent }
];
var SchedulesRoutingModule = /** @class */ (function () {
    function SchedulesRoutingModule() {
    }
    SchedulesRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], SchedulesRoutingModule);
    return SchedulesRoutingModule;
}());
exports.SchedulesRoutingModule = SchedulesRoutingModule;
//# sourceMappingURL=schedules-routing.module.js.map