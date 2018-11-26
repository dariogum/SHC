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
var environment_1 = require("./../../environments/environment");
var APIUSERSURL = environment_1.environment.url + '/v1/users';
var HTTPOPTIONS = {
    headers: new http_1.HttpHeaders({
        'Content-Type': 'application/json'
    })
};
var LoginService = /** @class */ (function () {
    function LoginService(http) {
        this.http = http;
    }
    LoginService.prototype.parseUser = function (data) {
        var user = {
            email: data.attributes.email,
            enabled: data.attributes.enabled,
            id: data.id,
            lastname: data.attributes.lastname,
            name: data.attributes.name,
            password: data.attributes.password,
        };
        return user;
    };
    LoginService.prototype.parseUsers = function (data) {
        var users = [];
        for (var i = 0; i < data.length; i++) {
            users[i] = this.parseUser(data[i]);
        }
        return users;
    };
    LoginService.prototype.verifyByEmail = function (data) {
        var _this = this;
        var url = APIUSERSURL + "/login";
        return this.http.post(url, data, HTTPOPTIONS)
            .pipe(operators_1.map(function (response) { return _this.parseUser(response.data); }), operators_1.catchError(this.handleError("verifyByEmail")));
    };
    LoginService.prototype.handleError = function (operation, result) {
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            console.error(operation + " failed: " + error.message);
            return rxjs_1.of(result);
        };
    };
    LoginService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map