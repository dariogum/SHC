"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var stats_service_1 = require("./stats.service");
describe('StatsService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [stats_service_1.StatsService]
        });
    });
    it('should be created', testing_1.inject([stats_service_1.StatsService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=stats.service.spec.js.map