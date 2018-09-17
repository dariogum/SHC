"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var patients_module_1 = require("./patients.module");
describe('PatientsModule', function () {
    var patientsModule;
    beforeEach(function () {
        patientsModule = new patients_module_1.PatientsModule();
    });
    it('should create an instance', function () {
        expect(patientsModule).toBeTruthy();
    });
});
//# sourceMappingURL=patients.module.spec.js.map