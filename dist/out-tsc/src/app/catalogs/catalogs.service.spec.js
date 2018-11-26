"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var catalogs_service_1 = require("./catalogs.service");
describe('CatalogsService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [catalogs_service_1.CatalogsService]
        });
    });
    it('should be created', testing_1.inject([catalogs_service_1.CatalogsService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=catalogs.service.spec.js.map