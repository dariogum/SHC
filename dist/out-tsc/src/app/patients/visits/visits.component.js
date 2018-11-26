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
var material_1 = require("@angular/material");
var config_service_1 = require("./../../auth/config.service");
var confirmation_dialog_component_1 = require("./confirmation-dialog.component");
var environment_1 = require("./../../../environments/environment");
var image_dialog_component_1 = require("./image-dialog.component");
var patient_1 = require("./../../classes/patient");
var patient_service_1 = require("./../patient.service");
var visit_1 = require("./../../classes/visit");
var APIVERSIONURL = environment_1.environment.url + '/v1';
var VisitsComponent = /** @class */ (function () {
    function VisitsComponent(breakpointObserver, configService, dialog, patientService, snackBar) {
        this.breakpointObserver = breakpointObserver;
        this.configService = configService;
        this.dialog = dialog;
        this.patientService = patientService;
        this.snackBar = snackBar;
        this.biggerFont = false;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')).id;
        this.files = null;
        this.formClass = 'wide';
        this.today = new Date();
        this.uploadingFiles = false;
        this.visitFormOpen = false;
        this.visitInForm = undefined;
    }
    VisitsComponent.prototype.ngOnInit = function () {
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
        this.biggerFont = this.configService.getUserConfig(this.currentUser, 'biggerFont');
    };
    VisitsComponent.prototype.onVisitSubmit = function () {
        var _this = this;
        if (this.visitInForm.id === undefined) {
            this.patientService.addVisit(this.visitInForm, this.patient.id).subscribe(function (visit) {
                _this.visitInForm.id = visit.id;
                if (_this.files && _this.files.length) {
                    _this.uploadFiles(_this.visitInForm, true);
                }
                else {
                    _this.addVisitToPatient(_this.visitInForm);
                    _this.visitFormOpen = false;
                }
            });
        }
    };
    VisitsComponent.prototype.updateVisit = function (event) {
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
    VisitsComponent.prototype.deleteVisit = function (visit) {
        var _this = this;
        this.patientService.deleteVisit(visit.id)
            .subscribe(function (result) {
            if (result) {
                var index = _this.patient.visits.indexOf(visit);
                if (index > -1) {
                    _this.patient.visits.splice(index, 1);
                }
                if (visit === _this.visitInForm) {
                    _this.closeVisitForm();
                }
                var snackBarRef = _this.snackBar.open('La visita fue eliminada correctamente', 'OK', {
                    duration: 2500,
                });
            }
        });
    };
    VisitsComponent.prototype.newVisitInForm = function () {
        this.visitInForm = new visit_1.Visit();
        this.visitInForm.date = this.today;
        this.visitFormOpen = true;
    };
    VisitsComponent.prototype.closeVisitForm = function () {
        this.visitFormOpen = false;
        this.visitInForm = undefined;
        this.files = null;
    };
    VisitsComponent.prototype.addFileToVisit = function (visit, files) {
        for (var i = 0; i < files.length; i++) {
            visit.files.unshift({ id: files[i].data.id, url: APIVERSIONURL + files[i].links.self });
        }
    };
    VisitsComponent.prototype.addVisitToPatient = function (visit) {
        this.patient.visits.push(visit);
        var snackBarRef = this.snackBar.open('La visita fue registrada correctamente', 'OK', {
            duration: 2500,
        });
        this.closeVisitForm();
    };
    VisitsComponent.prototype.uploadFiles = function (visit, newVisit) {
        var _this = this;
        if (newVisit) {
            visit.files = [];
        }
        if (this.files.length) {
            this.patientService.uploadFiles(this.files, visit.id).subscribe(function (result) {
                if (result.data.length) {
                    _this.addFileToVisit(visit, result.data);
                    if (newVisit) {
                        _this.addVisitToPatient(visit);
                    }
                    else {
                        _this.files = null;
                    }
                    _this.uploadingFiles = false;
                }
            });
        }
    };
    VisitsComponent.prototype.readImage = function (event, index) {
        var _this = this;
        var reader = new FileReader();
        reader.onload = function (evt) {
            _this.files[index]['url'] = evt.target.result;
        };
        reader.readAsDataURL(this.files[index]);
    };
    VisitsComponent.prototype.onFilesChanged = function (event) {
        this.files = event.target.files;
        if (this.visitInForm.id) {
            this.uploadingFiles = true;
            this.uploadFiles(this.visitInForm, false);
        }
        else {
            for (var i = 0; i < this.files.length; i++) {
                this.readImage(event, i);
            }
        }
    };
    VisitsComponent.prototype.deleteFile = function (file) {
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
    VisitsComponent.prototype.openFile = function (image) {
        var dialogRef = this.dialog.open(image_dialog_component_1.ImageDialogComponent, {
            data: image
        });
    };
    VisitsComponent.prototype.openConfirmationDialog = function (visit) {
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
    __decorate([
        core_1.Input(),
        __metadata("design:type", patient_1.Patient)
    ], VisitsComponent.prototype, "patient", void 0);
    __decorate([
        core_1.ViewChild('visitForm'),
        __metadata("design:type", forms_1.NgForm)
    ], VisitsComponent.prototype, "visitForm", void 0);
    VisitsComponent = __decorate([
        core_1.Component({
            selector: 'app-visits',
            templateUrl: './visits.component.html',
            styleUrls: ['./visits.component.css']
        }),
        __metadata("design:paramtypes", [layout_1.BreakpointObserver,
            config_service_1.ConfigService,
            material_1.MatDialog,
            patient_service_1.PatientService,
            material_1.MatSnackBar])
    ], VisitsComponent);
    return VisitsComponent;
}());
exports.VisitsComponent = VisitsComponent;
//# sourceMappingURL=visits.component.js.map