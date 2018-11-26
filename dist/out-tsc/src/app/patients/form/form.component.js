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
var material_1 = require("@angular/material");
var catalogs_service_1 = require("./../../catalogs/catalogs.service");
var config_service_1 = require("./../../auth/config.service");
var confirmation_patient_dialog_component_1 = require("./confirmation-patient-dialog.component");
var environment_1 = require("./../../../environments/environment");
var patient_service_1 = require("./../patient.service");
var APIVERSIONURL = environment_1.environment.url + '/v1';
var FormComponent = /** @class */ (function () {
    function FormComponent(breakpointObserver, catalogsService, configService, dialog, patientService, route, router, snackBar) {
        this.breakpointObserver = breakpointObserver;
        this.catalogsService = catalogsService;
        this.configService = configService;
        this.dialog = dialog;
        this.patientService = patientService;
        this.route = route;
        this.router = router;
        this.snackBar = snackBar;
        this.biggerFont = false;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')).id;
        this.folded = false;
        this.formClass = 'wide';
        this.newPatient = false;
    }
    FormComponent.prototype.ngOnInit = function () {
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
        this.addressFields = this.configService.getUserConfig(this.currentUser, 'addressFields');
        this.biggerFont = this.configService.getUserConfig(this.currentUser, 'biggerFont');
        this.birthtypes = this.catalogsService.getBirthTypes();
        this.bloodtypes = this.catalogsService.getBloodTypes();
        this.cities = this.catalogsService.getCities(this.configService.getUserConfig(this.currentUser, 'cities'));
        this.countries = this.catalogsService.getCountries();
        this.genders = this.catalogsService.getGenders();
        this.multipleSocialSecurities = this.configService.getUserConfig(this.currentUser, 'multipleSocialSecurities');
        this.socialsecurities = this.catalogsService.getSocialSecurities();
        this.states = this.catalogsService.getStates(this.configService.getUserConfig(this.currentUser, 'states'));
        this.getPatient();
    };
    FormComponent.prototype.displayFn = function (socialSecurity) {
        return socialSecurity ? socialSecurity.name : undefined;
    };
    FormComponent.prototype.filterStates = function (event) {
        this.states = this.catalogsService.getStates(this.configService.getUserConfig(this.currentUser, 'states')).filter(function (prov) { return prov.country === event.value.id; });
    };
    FormComponent.prototype.filterCities = function (event) {
        this.cities = this.catalogsService.getCities(this.configService.getUserConfig(this.currentUser, 'cities')).filter(function (city) { return city.state === event.value.id; });
    };
    FormComponent.prototype.filterSocialSecurities = function (event, field) {
        if (typeof (event) === 'string') {
            var filterValue_1 = event.toLowerCase();
            this.filteredSocialsecurities = this.socialsecurities.filter(function (option) { return option.name.toLowerCase().indexOf(filterValue_1) === 0; });
        }
        else {
            event = { target: { name: field } };
            this.updatePatient(event);
        }
    };
    FormComponent.prototype.toggleAccordion = function () {
        if (this.folded) {
            this.accordion.openAll();
        }
        else {
            this.accordion.closeAll();
        }
        this.folded = !this.folded;
    };
    FormComponent.prototype.getPatient = function () {
        var _this = this;
        var id = +this.route.snapshot.paramMap.get('id');
        this.patientService.getPatient(id)
            .subscribe(function (patient) {
            _this.patient = patient;
            // Default patient form values //
            if (_this.patient.country === null) {
                _this.patient.country = _this.countries[0];
            }
            if (_this.patient.state === null) {
                _this.patient.state = _this.states[0];
            }
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
        var isBackgroundControl = this.patientBackgroundForm.controls[controlName] &&
            !this.patientBackgroundForm.controls[controlName].pristine;
        var isDataControl = this.patientDataForm.controls[controlName] &&
            !this.patientDataForm.controls[controlName].pristine;
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
    __decorate([
        core_1.ViewChild(material_1.MatAccordion),
        __metadata("design:type", material_1.MatAccordion)
    ], FormComponent.prototype, "accordion", void 0);
    __decorate([
        core_1.ViewChild('patientBackgroundForm'),
        __metadata("design:type", forms_1.NgForm)
    ], FormComponent.prototype, "patientBackgroundForm", void 0);
    __decorate([
        core_1.ViewChild('patientDataForm'),
        __metadata("design:type", forms_1.NgForm)
    ], FormComponent.prototype, "patientDataForm", void 0);
    FormComponent = __decorate([
        core_1.Component({
            selector: 'app-form',
            templateUrl: './form.component.html',
            styleUrls: ['./form.component.css'],
        }),
        __metadata("design:paramtypes", [layout_1.BreakpointObserver,
            catalogs_service_1.CatalogsService,
            config_service_1.ConfigService,
            material_1.MatDialog,
            patient_service_1.PatientService,
            router_1.ActivatedRoute,
            router_1.Router,
            material_1.MatSnackBar])
    ], FormComponent);
    return FormComponent;
}());
exports.FormComponent = FormComponent;
//# sourceMappingURL=form.component.js.map