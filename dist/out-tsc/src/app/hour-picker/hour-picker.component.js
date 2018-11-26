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
var moment = require("moment");
var HourPickerComponent = /** @class */ (function () {
    function HourPickerComponent() {
        this.hourAndMinutesSetted = new core_1.EventEmitter();
    }
    Object.defineProperty(HourPickerComponent.prototype, "hourAndMinutes", {
        get: function () {
            return moment().set({ 'hour': this._hour, 'minute': this._minutes });
        },
        set: function (hourAndMinutes) {
            if (hourAndMinutes) {
                this._hour = hourAndMinutes.hours();
                this._minutes = hourAndMinutes.minutes();
            }
        },
        enumerable: true,
        configurable: true
    });
    HourPickerComponent.prototype.updateHourAndMinutes = function () {
        this.hourAndMinutesSetted.emit(moment().set({ 'hour': this._hour, 'minute': this._minutes }));
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], HourPickerComponent.prototype, "hourAndMinutes", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], HourPickerComponent.prototype, "hourAndMinutesSetted", void 0);
    HourPickerComponent = __decorate([
        core_1.Component({
            selector: 'app-hour-picker',
            templateUrl: './hour-picker.component.html',
            styleUrls: ['./hour-picker.component.css']
        })
    ], HourPickerComponent);
    return HourPickerComponent;
}());
exports.HourPickerComponent = HourPickerComponent;
//# sourceMappingURL=hour-picker.component.js.map