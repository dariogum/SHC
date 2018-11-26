"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var schedules_service_1 = require("./schedules.service");
describe('SchedulesService', function () {
    beforeEach(function () { return testing_1.TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = testing_1.TestBed.get(schedules_service_1.SchedulesService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=schedules.service.spec.js.map