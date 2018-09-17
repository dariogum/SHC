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
var patient_1 = require("./../../classes/patient");
var router_1 = require("@angular/router");
var patient_service_1 = require("./../patient.service");
var NewPatientDialogComponent = /** @class */ (function () {
    function NewPatientDialogComponent(dialogRef, router, patientService) {
        this.dialogRef = dialogRef;
        this.router = router;
        this.patientService = patientService;
        this.patient = new patient_1.Patient();
    }
    NewPatientDialogComponent.prototype.addPacient = function () {
        var _this = this;
        this.patientService.addPatient(this.patient)
            .subscribe(function (patient) {
            _this.dialogRef.close();
            var navigationExtras = {
                queryParams: { 'newPatient': true }
            };
            _this.router.navigate(['patients/' + patient.id], navigationExtras);
        });
    };
    NewPatientDialogComponent = __decorate([
        core_1.Component({
            selector: 'new-patient-dialog',
            templateUrl: 'new-patient-dialog.html',
        }),
        __metadata("design:paramtypes", [material_1.MatDialogRef, router_1.Router, patient_service_1.PatientService])
    ], NewPatientDialogComponent);
    return NewPatientDialogComponent;
}());
exports.NewPatientDialogComponent = NewPatientDialogComponent;
//# sourceMappingURL=new-patient-dialog.component.js.map