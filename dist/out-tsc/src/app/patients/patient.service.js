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
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var catalogs_service_1 = require("./../catalogs/catalogs.service");
var config_service_1 = require("./../auth/config.service");
var environment_1 = require("./../../environments/environment");
var moment = require("moment");
var APIVERSIONURL = environment_1.environment.url + '/v1';
var APIFILESURL = APIVERSIONURL + '/files';
var APIPATIENTSURL = APIVERSIONURL + '/patients';
var APIVISITSURL = APIVERSIONURL + '/visits';
var HTTPOPTIONS = {
    headers: new http_1.HttpHeaders({
        'Content-Type': 'application/json'
    })
};
var PatientService = /** @class */ (function () {
    function PatientService(catalogsService, configService, http) {
        this.catalogsService = catalogsService;
        this.configService = configService;
        this.http = http;
    }
    PatientService.prototype.parseVisit = function (data) {
        var files = [];
        if (data.relationships && data.relationships.files) {
            for (var i = 0; i < data.relationships.files.data.length; i++) {
                files[i] = {
                    id: data.relationships.files.data[i].data.id,
                    url: APIVERSIONURL + data.relationships.files.data[i].links.self
                };
            }
        }
        var visit = {
            bloodPressure: data.attributes.bloodPressure,
            date: moment(data.attributes.date).toDate(),
            diagnosis: data.attributes.diagnosis,
            files: files,
            height: data.attributes.height,
            id: data.id,
            perimeter: data.attributes.perimeter,
            studiesResults: data.attributes.studiesResults,
            treatment: data.attributes.treatment,
            weight: data.attributes.weight,
        };
        return visit;
    };
    PatientService.prototype.parsePatient = function (data) {
        var patient;
        var birthday = null;
        var birthtype = null;
        var bloodtype = null;
        var country = null;
        var city = null;
        var gender = null;
        var socialSecurity1 = null;
        var socialSecurity2 = null;
        var state = null;
        var visits = [];
        if (data.attributes.birthday) {
            birthday = moment(data.attributes.birthday).toDate();
        }
        if (data.attributes.birthType) {
            birthtype = this.catalogsService.getBirthType(data.attributes.birthType);
        }
        if (data.attributes.bloodType) {
            bloodtype = this.catalogsService.getBloodType(data.attributes.bloodType);
        }
        if (data.attributes.city) {
            city = this.catalogsService.getCity(data.attributes.city);
        }
        if (data.attributes.country) {
            country = this.catalogsService.getCountry(data.attributes.country);
        }
        if (data.attributes.gender) {
            gender = this.catalogsService.getGender(data.attributes.gender);
        }
        if (data.attributes.socialSecurity1) {
            socialSecurity1 = this.catalogsService.getSocialSecurity(data.attributes.socialSecurity1);
        }
        if (data.attributes.socialSecurity2) {
            socialSecurity2 = this.catalogsService.getSocialSecurity(data.attributes.socialSecurity2);
        }
        if (data.attributes.state) {
            state = this.catalogsService.getState(data.attributes.state);
        }
        if (data.relationships && data.relationships.visits) {
            for (var i = 0; i < data.relationships.visits.data.length; i++) {
                visits[i] = this.parseVisit(data.relationships.visits.data[i].data);
            }
        }
        patient = {
            id: data.id,
            oldId: data.attributes.oldId,
            lastname: data.attributes.lastname,
            name: data.attributes.name,
            birthday: birthday,
            gender: gender,
            docType: data.attributes.docType,
            doc: data.attributes.doc,
            phone1: data.attributes.phone1,
            phone2: data.attributes.phone2,
            country: country,
            state: state,
            city: city,
            street: data.attributes.street,
            number: data.attributes.number,
            floor: data.attributes.floor,
            apartment: data.attributes.apartment,
            socialSecurity1: socialSecurity1,
            socialSecurity1Number: data.attributes.socialSecurity1Number,
            socialSecurity2: socialSecurity2,
            socialSecurity2Number: data.attributes.socialSecurity2Number,
            birthType: birthtype,
            weightNewborn: data.attributes.weightNewborn,
            bloodType: bloodtype,
            rhFactor: data.attributes.rhFactor,
            apgar1: data.attributes.apgar1,
            apgar2: data.attributes.apgar2,
            gestationalAge: data.attributes.gestationalAge,
            comments: data.attributes.comments,
            father: data.attributes.father,
            mother: data.attributes.mother,
            brothers: data.attributes.brothers,
            others: data.attributes.others,
            visits: visits
        };
        return patient;
    };
    PatientService.prototype.parsePatients = function (data) {
        var patients = [];
        for (var i = 0; i < data.length; i++) {
            patients[i] = this.parsePatient(data[i]);
        }
        return patients;
    };
    PatientService.prototype.getPatients = function () {
        var _this = this;
        return this.http.get(APIPATIENTSURL + "?sort=-modifiedAt&page=first")
            .pipe(operators_1.map(function (response) { return _this.parsePatients(response.data); }), operators_1.catchError(this.handleError('getPatients', [])));
    };
    PatientService.prototype.getPatient = function (id) {
        var _this = this;
        var url = APIPATIENTSURL + "/" + id;
        return this.http.get(url)
            .pipe(operators_1.map(function (response) { return _this.parsePatient(response.data); }), operators_1.catchError(this.handleError("getPatient id=" + id)));
    };
    PatientService.prototype.searchPatients = function (terms) {
        var _this = this;
        if (!terms.trim()) {
            return rxjs_1.of([]);
        }
        terms = terms.toLowerCase();
        terms = encodeURI(terms);
        return this.http.get(APIPATIENTSURL + "/search/" + terms)
            .pipe(operators_1.map(function (response) { return _this.parsePatients(response.data); }), operators_1.catchError(this.handleError('searchpatients', [])));
    };
    PatientService.prototype.addPatient = function (patient) {
        var _this = this;
        var data = {
            'data': {
                'type': 'patient',
                'attributes': {
                    'lastname': patient.lastname,
                    'name': patient.name,
                    'createdBy': JSON.parse(localStorage.getItem('currentUser')).id,
                    'modifiedBy': JSON.parse(localStorage.getItem('currentUser')).id
                }
            }
        };
        return this.http.post(APIPATIENTSURL, data, HTTPOPTIONS)
            .pipe(operators_1.map(function (response) { return _this.parsePatient(response.data); }), operators_1.catchError(this.handleError('addPatient')));
    };
    PatientService.prototype.updatePatient = function (patient) {
        var id = typeof patient === 'number' ? patient : patient.id;
        var url = APIPATIENTSURL + "/" + id;
        var birthday = null;
        var birthtype = patient.birthType === null ? null : patient.birthType.id;
        var bloodtype = patient.bloodType === null ? null : patient.bloodType.id;
        var city = patient.city === null ? null : patient.city.id;
        var country = patient.country === null ? null : patient.country.id;
        var gender = patient.gender === null ? null : patient.gender.id;
        var socialSecurity1 = patient.socialSecurity1 === null ? null : patient.socialSecurity1.id;
        var socialSecurity2 = patient.socialSecurity2 === null ? null : patient.socialSecurity2.id;
        var state = patient.state === null ? null : patient.state.id;
        if (patient.birthday) {
            var birthdate = moment(patient.birthday);
            birthday = birthdate.format('YYYY-MM-DD');
        }
        var data = {
            'data': {
                'type': 'patient',
                'id': patient.id,
                'attributes': {
                    lastname: patient.lastname,
                    name: patient.name,
                    birthday: birthday,
                    gender: gender,
                    docType: patient.docType,
                    doc: patient.doc,
                    phone1: patient.phone1,
                    phone2: patient.phone2,
                    country: country,
                    state: state,
                    city: city,
                    street: patient.street,
                    number: patient.number,
                    floor: patient.floor,
                    apartment: patient.apartment,
                    socialSecurity1: socialSecurity1,
                    socialSecurity1Number: patient.socialSecurity1Number,
                    socialSecurity2: socialSecurity2,
                    socialSecurity2Number: patient.socialSecurity2Number,
                    birthType: birthtype,
                    weightNewborn: patient.weightNewborn,
                    bloodType: bloodtype,
                    rhFactor: patient.rhFactor,
                    apgar1: patient.apgar1,
                    apgar2: patient.apgar2,
                    gestationalAge: patient.gestationalAge,
                    comments: patient.comments,
                    father: patient.father,
                    mother: patient.mother,
                    brothers: patient.brothers,
                    others: patient.others,
                    modifiedBy: JSON.parse(localStorage.getItem('currentUser')).id
                }
            }
        };
        return this.http.patch(url, data, HTTPOPTIONS)
            .pipe(operators_1.map(function (response) { return response.data; }), operators_1.catchError(this.handleError('updatePatient')));
    };
    PatientService.prototype.deletePatient = function (patientId) {
        var url = APIPATIENTSURL + "/" + patientId;
        return this.http.delete(url, HTTPOPTIONS)
            .pipe(operators_1.catchError(this.handleError('deletePatient')));
    };
    PatientService.prototype.visitToJson = function (visit, patientId) {
        var visitdate = moment(visit.date);
        var visitday = visitdate.format('YYYY-MM-DD');
        var data = {
            'data': {
                'type': 'patient',
                'id': visit.id,
                'attributes': {
                    'patient': patientId,
                    'date': visitday,
                    'weight': visit.weight,
                    'height': visit.height,
                    'perimeter': visit.perimeter,
                    'bloodPressure': visit.bloodPressure,
                    'diagnosis': visit.diagnosis,
                    'treatment': visit.treatment,
                    'studiesResults': visit.studiesResults,
                }
            }
        };
        return data;
    };
    PatientService.prototype.addVisit = function (visit, patientId) {
        var _this = this;
        var data = this.visitToJson(visit, patientId);
        return this.http.post(APIVISITSURL, data, HTTPOPTIONS)
            .pipe(operators_1.map(function (response) { return _this.parseVisit(response.data); }), operators_1.catchError(this.handleError('addVisit')));
    };
    PatientService.prototype.updateVisit = function (visit, patientId) {
        var id = typeof visit === 'number' ? visit : visit.id;
        var url = APIVISITSURL + "/" + id;
        var data = this.visitToJson(visit, patientId);
        return this.http.patch(url, data, HTTPOPTIONS)
            .pipe(operators_1.map(function (response) { return response.data; }), operators_1.catchError(this.handleError('updateVisit')));
    };
    PatientService.prototype.deleteVisit = function (visit) {
        var id = typeof visit === 'number' ? visit : visit.id;
        var url = APIVISITSURL + "/" + id;
        return this.http.delete(url, HTTPOPTIONS)
            .pipe(operators_1.catchError(this.handleError('deleteVisit')));
    };
    PatientService.prototype.uploadFiles = function (files, visitId) {
        var uploadData = new FormData();
        for (var i = files.length - 1; i >= 0; i--) {
            uploadData.set('visit', visitId.toString());
            uploadData.append('visitFiles[' + i + ']', files[i], files[i].name);
        }
        return this.http.post(APIFILESURL, uploadData).pipe(operators_1.catchError(this.handleError('uploadFiles')));
    };
    PatientService.prototype.deleteFile = function (fileId) {
        var url = APIFILESURL + "/" + fileId;
        return this.http.delete(url, HTTPOPTIONS)
            .pipe(operators_1.catchError(this.handleError('deleteFile')));
    };
    PatientService.prototype.handleError = function (operation, result) {
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            console.error(operation + " failed: " + error.message);
            return rxjs_1.of(result);
        };
    };
    PatientService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [catalogs_service_1.CatalogsService,
            config_service_1.ConfigService,
            http_1.HttpClient])
    ], PatientService);
    return PatientService;
}());
exports.PatientService = PatientService;
//# sourceMappingURL=patient.service.js.map