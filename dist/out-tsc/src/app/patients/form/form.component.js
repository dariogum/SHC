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
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var material_1 = require("@angular/material");
var layout_1 = require("@angular/cdk/layout");
var visit_1 = require("./../../classes/visit");
var mock_data_1 = require("./../mock-data");
var mock_cities_1 = require("./../mock-cities");
var confirmation_dialog_component_1 = require("./confirmation-dialog.component");
var confirmation_patient_dialog_component_1 = require("./confirmation-patient-dialog.component");
var patient_service_1 = require("./../patient.service");
var environment_1 = require("./../../../environments/environment");
var FormComponent = /** @class */ (function () {
    function FormComponent(breakpointObserver, route, router, dialog, patientService, snackBar) {
        var _this = this;
        this.breakpointObserver = breakpointObserver;
        this.route = route;
        this.router = router;
        this.dialog = dialog;
        this.patientService = patientService;
        this.snackBar = snackBar;
        this.formClass = 'wide';
        this.folded = false;
        this.newPatient = false;
        this.maxDate = new Date();
        this.cities = mock_cities_1.CITIES;
        this.countries = mock_data_1.COUNTRIES;
        this.states = mock_data_1.STATES;
        this.socialsecurities = mock_data_1.SOCIALSECURITIES;
        this.genders = mock_data_1.GENDERS;
        this.birthtypes = mock_data_1.BIRTHTYPES;
        this.bloodtypes = mock_data_1.BLOODTYPES;
        this.visitInForm = new visit_1.Visit();
        this.files = null;
        this.apiVersionUrl = environment_1.environment.url + '/v1';
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
    }
    FormComponent.prototype.ngOnInit = function () {
        this.getPatient();
    };
    FormComponent.prototype.getPatient = function () {
        var _this = this;
        var id = +this.route.snapshot.paramMap.get('id');
        this.patientService.getPatient(id)
            .subscribe(function (patient) {
            _this.patient = patient;
            _this.newPatient = (_this.route.snapshot.queryParamMap.get('newPatient') === 'true');
        });
    };
    FormComponent.prototype.updatePatient = function (event) {
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
        var isBackgroundControl = this.patientBackgroundForm.controls[controlName] && !this.patientBackgroundForm.controls[controlName].pristine;
        var isDataControl = this.patientDataForm.controls[controlName] && !this.patientDataForm.controls[controlName].pristine;
        if (isBackgroundControl || isDataControl) {
            this.patientService.updatePatient(this.patient).subscribe();
        }
    };
    FormComponent.prototype.deletePatient = function () {
        var _this = this;
        this.patientService.deletePatient(this.patient.id).subscribe(function (confirmation) {
            var snackBarRef = _this.snackBar.open('Paciente eliminado correctamente', 'OK', {
                duration: 2500,
            });
            _this.router.navigate(['patients']);
        });
    };
    FormComponent.prototype.openConfirmationPatientDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(confirmation_patient_dialog_component_1.ConfirmationPatientDialogComponent, {
            width: '240px'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.deletePatient();
            }
        });
    };
    FormComponent.prototype.close = function () {
        this.folded = true;
        this.accordion.closeAll();
    };
    FormComponent.prototype.open = function () {
        this.folded = false;
        this.accordion.openAll();
    };
    FormComponent.prototype.addFileToVisit = function (visit, files) {
        console.log(files.lenght);
        for (var i = 0; i < files.lenght; i++) {
            visit.files.push({ id: files[i].data.id, url: this.apiVersionUrl + files[i].links.self });
        }
    };
    FormComponent.prototype.addVisitToPatient = function (visit) {
        this.patient.visits.push(visit);
        var snackBarRef = this.snackBar.open('La visita fue registrada correctamente', 'OK', {
            duration: 2500,
        });
        this.visitInFormReset();
    };
    FormComponent.prototype.uploadFiles = function (visit, newVisit) {
        var _this = this;
        if (newVisit) {
            visit.files = [];
        }
        if (this.files.length) {
            this.patientService.uploadFiles(this.files, visit.id).subscribe(function (result) {
                console.log(result);
                if (result) {
                    _this.addFileToVisit(visit, result);
                    if (newVisit) {
                        _this.addVisitToPatient(visit);
                    }
                    else {
                        _this.files = null;
                    }
                }
            });
        }
    };
    FormComponent.prototype.onVisitSubmit = function () {
        var _this = this;
        if (this.visitInForm.id === undefined) {
            this.patientService.addVisit(this.visitInForm, this.patient.id).subscribe(function (visit) {
                _this.visitInForm.id = visit.id;
                if (_this.files && _this.files.length) {
                    _this.uploadFiles(_this.visitInForm, true);
                }
                else {
                    _this.addVisitToPatient(_this.visitInForm);
                }
            });
        }
    };
    FormComponent.prototype.visitInFormReset = function () {
        /** This tasks order is important **/
        this.visitInForm = new visit_1.Visit();
        this.visitForm.reset();
        this.files = null;
    };
    FormComponent.prototype.updateVisit = function (event) {
        if (this.visitInForm.id && this.visitForm.form.valid) {
            var controlName = void 0;
            if (event.value !== undefined && event.source) {
                controlName = event.source.ngControl.name;
            }
            else if (event.value !== undefined) {
                controlName = event.targetElement.name;
            }
            else {
                controlName = event.target.name;
            }
            var isVisitControl = this.visitForm.controls[controlName] && !this.visitForm.controls[controlName].pristine;
            if (isVisitControl) {
                this.patientService.updateVisit(this.visitInForm, this.patient.id).subscribe();
            }
        }
    };
    FormComponent.prototype.deleteVisit = function (visit) {
        var _this = this;
        this.patientService.deleteVisit(visit.id)
            .subscribe(function (result) {
            if (result) {
                var index = _this.patient.visits.indexOf(visit);
                if (index > -1) {
                    _this.patient.visits.splice(index, 1);
                }
                if (visit === _this.visitInForm) {
                    _this.visitInFormReset();
                }
                var snackBarRef = _this.snackBar.open('La visita fue eliminada correctamente', 'OK', {
                    duration: 2500,
                });
            }
        });
    };
    FormComponent.prototype.openConfirmationDialog = function (visit) {
        var _this = this;
        var dialogRef = this.dialog.open(confirmation_dialog_component_1.ConfirmationDialogComponent, {
            width: '240px'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.deleteVisit(visit);
            }
        });
    };
    FormComponent.prototype.readImage = function (event, index) {
        var _this = this;
        var reader = new FileReader();
        reader.onload = function (event) {
            _this.files[index]['url'] = event.target.result;
        };
        reader.readAsDataURL(this.files[index]);
    };
    FormComponent.prototype.onFilesChanged = function (event) {
        this.files = event.target.files;
        for (var i = 0; i < this.files.length; i++) {
            this.readImage(event, i);
        }
        if (this.visitInForm.id) {
            this.uploadFiles(this.visitInForm, false);
        }
    };
    FormComponent.prototype.filterCities = function (event) {
        this.cities = mock_cities_1.CITIES.filter(function (city) { return city.state === event.value.id; });
    };
    FormComponent.prototype.filterStates = function (event) {
        this.states = mock_data_1.STATES.filter(function (state) { return state.country === event.value.id; });
    };
    FormComponent.prototype.deleteFile = function (file) {
        var _this = this;
        this.patientService.deleteFile(file.id)
            .subscribe(function (result) {
            if (result) {
                var index = _this.visitInForm.files.indexOf(file);
                if (index > -1) {
                    _this.visitInForm.files.splice(index, 1);
                }
                var snackBarRef = _this.snackBar.open('La imagen fue eliminada correctamente', 'OK', {
                    duration: 2500,
                });
            }
        });
    };
    __decorate([
        core_1.ViewChild(material_1.MatAccordion),
        __metadata("design:type", material_1.MatAccordion)
    ], FormComponent.prototype, "accordion", void 0);
    __decorate([
        core_1.ViewChild('patientDataForm'),
        __metadata("design:type", forms_1.NgForm)
    ], FormComponent.prototype, "patientDataForm", void 0);
    __decorate([
        core_1.ViewChild('patientBackgroundForm'),
        __metadata("design:type", forms_1.NgForm)
    ], FormComponent.prototype, "patientBackgroundForm", void 0);
    __decorate([
        core_1.ViewChild('visitForm'),
        __metadata("design:type", forms_1.NgForm)
    ], FormComponent.prototype, "visitForm", void 0);
    FormComponent = __decorate([
        core_1.Component({
            selector: 'app-form',
            templateUrl: './form.component.html',
            styleUrls: ['./form.component.css']
        }),
        __metadata("design:paramtypes", [layout_1.BreakpointObserver, router_1.ActivatedRoute,
            router_1.Router, material_1.MatDialog, patient_service_1.PatientService,
            material_1.MatSnackBar])
    ], FormComponent);
    return FormComponent;
}());
exports.FormComponent = FormComponent;
//# sourceMappingURL=form.component.js.map