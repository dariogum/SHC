"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var users_module_1 = require("./users.module");
describe('UsersModule', function () {
    var usersModule;
    beforeEach(function () {
        usersModule = new users_module_1.UsersModule();
    });
    it('should create an instance', function () {
        expect(usersModule).toBeTruthy();
    });
});
//# sourceMappingURL=users.module.spec.js.map