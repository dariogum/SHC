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
var schedules_service_1 = require("./../schedules.service");
var moment = require("moment");
var FormComponent = /** @class */ (function () {
    function FormComponent(bottomSheetRef, schedulesService, data) {
        this.bottomSheetRef = bottomSheetRef;
        this.schedulesService = schedulesService;
        this.data = data;
        this.hour = 0;
        this.minutes = 0;
        this.schedules = [];
    }
    FormComponent.prototype.ngOnInit = function () {
        this.schedules = this.schedulesService.getValidSchedules('monthly', moment());
    };
    FormComponent = __decorate([
        core_1.Component({
            selector: 'app-form',
            templateUrl: './form.component.html',
            styleUrls: ['./form.component.css']
        }),
        __param(2, core_1.Inject(material_1.MAT_BOTTOM_SHEET_DATA)),
        __metadata("design:paramtypes", [material_1.MatBottomSheetRef,
            schedules_service_1.SchedulesService, Object])
    ], FormComponent);
    return FormComponent;
}());
exports.FormComponent = FormComponent;
//# sourceMappingURL=form.component.js.map