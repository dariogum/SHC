"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var patient_service_1 = require("./patient.service");
describe('PatientService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [patient_service_1.PatientService]
        });
    });
    it('should be created', testing_1.inject([patient_service_1.PatientService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=patient.service.spec.js.map