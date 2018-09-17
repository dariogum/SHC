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
var patients_routing_module_1 = require("./patients-routing.module");
var list_component_1 = require("./list/list.component");
var form_component_1 = require("./form/form.component");
var new_patient_dialog_component_1 = require("./list/new-patient-dialog.component");
var confirmation_dialog_component_1 = require("./form/confirmation-dialog.component");
var confirmation_patient_dialog_component_1 = require("./form/confirmation-patient-dialog.component");
var age_pipe_1 = require("./age.pipe");
var PatientsModule = /** @class */ (function () {
    function PatientsModule() {
    }
    PatientsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                patients_routing_module_1.PatientsRoutingModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                material_1.MatToolbarModule,
                material_1.MatButtonModule,
                material_1.MatIconModule,
                material_1.MatFormFieldModule,
                material_1.MatInputModule,
                material_1.MatListModule,
                material_1.MatCardModule,
                material_1.MatDividerModule,
                material_1.MatDatepickerModule,
                material_1.MatNativeDateModule,
                material_1.MatSelectModule,
                material_1.MatMenuModule,
                material_1.MatExpansionModule,
                material_1.MatCheckboxModule,
                material_1.MatDialogModule,
                material_1.MatStepperModule,
                material_1.MatProgressSpinnerModule,
                material_1.MatSnackBarModule
            ],
            declarations: [
                list_component_1.ListComponent,
                form_component_1.FormComponent,
                age_pipe_1.AgePipe,
                age_pipe_1.AgeUpPipe,
                new_patient_dialog_component_1.NewPatientDialogComponent,
                confirmation_dialog_component_1.ConfirmationDialogComponent,
                confirmation_patient_dialog_component_1.ConfirmationPatientDialogComponent
            ],
            entryComponents: [
                new_patient_dialog_component_1.NewPatientDialogComponent,
                confirmation_dialog_component_1.ConfirmationDialogComponent,
                confirmation_patient_dialog_component_1.ConfirmationPatientDialogComponent
            ]
        })
    ], PatientsModule);
    return PatientsModule;
}());
exports.PatientsModule = PatientsModule;
//# sourceMappingURL=patients.module.js.map