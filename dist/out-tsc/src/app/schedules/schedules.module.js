"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var schedules_routing_module_1 = require("./schedules-routing.module");
var general_view_component_1 = require("./general-view/general-view.component");
var form_component_1 = require("./form/form.component");
var schedule_form_component_1 = require("./schedule-form/schedule-form.component");
var hour_picker_component_1 = require("./../hour-picker/hour-picker.component");
var SchedulesModule = /** @class */ (function () {
    function SchedulesModule() {
    }
    SchedulesModule = __decorate([
        core_1.NgModule({
            declarations: [general_view_component_1.GeneralViewComponent, form_component_1.FormComponent, schedule_form_component_1.ScheduleFormComponent, hour_picker_component_1.HourPickerComponent],
            imports: [
                common_1.CommonModule,
                schedules_routing_module_1.SchedulesRoutingModule,
                forms_1.FormsModule,
                material_1.MatAutocompleteModule,
                material_1.MatBottomSheetModule,
                material_1.MatButtonModule,
                material_1.MatButtonToggleModule,
                material_1.MatCardModule,
                material_1.MatCheckboxModule,
                material_1.MatChipsModule,
                material_1.MatDatepickerModule,
                material_1.MatDividerModule,
                material_1.MatFormFieldModule,
                material_1.MatGridListModule,
                material_1.MatIconModule,
                material_1.MatInputModule,
                material_1.MatListModule,
                material_1.MatMenuModule,
                material_1.MatProgressSpinnerModule,
                material_1.MatSelectModule,
                material_1.MatSlideToggleModule,
                material_1.MatToolbarModule,
                material_1.MatTooltipModule,
            ],
            entryComponents: [
                form_component_1.FormComponent
            ]
        })
    ], SchedulesModule);
    return SchedulesModule;
}());
exports.SchedulesModule = SchedulesModule;
//# sourceMappingURL=schedules.module.js.map