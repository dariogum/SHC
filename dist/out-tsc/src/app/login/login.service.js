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
var httpOptions = {
    headers: new http_1.HttpHeaders({
        'Content-Type': 'application/json'
    })
};
var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
        this.apiUsersUrl = 'http://localhost:8080/v1/users';
    }
    UserService.prototype.parseUser = function (data) {
        var user;
        user = {
            id: data.id,
            email: data.attributes.email,
            password: data.attributes.password,
            lastname: data.attributes.lastname,
            name: data.attributes.name,
        };
        return user;
    };
    UserService.prototype.parseUsers = function (data) {
        var users = [];
        for (var i = 0; i < data.length; i++) {
            users[i] = this.parseUser(data[i]);
        }
        return users;
    };
    UserService.prototype.getUsers = function () {
        var _this = this;
        return this.http.get(this.apiUsersUrl)
            .pipe(operators_1.map(function (response) { return _this.parseUsers(response.data); }), 
        //tap(),
        operators_1.catchError(this.handleError('getUsers', [])));
    };
    UserService.prototype.getUser = function (id) {
        var _this = this;
        var url = this.apiUsersUrl + "/" + id;
        return this.http.get(url)
            .pipe(operators_1.map(function (response) { return _this.parseUser(response.data); }), 
        //tap(),
        operators_1.catchError(this.handleError("getUser id=" + id)));
    };
    UserService.prototype.searchUsers = function (term) {
        var _this = this;
        if (!term.trim()) {
            return rxjs_1.of([]);
        }
        return this.http.get(this.apiUsersUrl + "?filter=name:" + term + ",lastname:" + term)
            .pipe(operators_1.map(function (response) { return _this.parseUsers(response.data); }), 
        //tap(),
        operators_1.catchError(this.handleError('searchusers', [])));
    };
    UserService.prototype.addUser = function (user) {
        var _this = this;
        var data = {
            "data": {
                "type": "user",
                "attributes": {
                    "email": user.email,
                    "password": user.password,
                    "lastname": user.lastname,
                    "name": user.name
                }
            }
        };
        return this.http.post(this.apiUsersUrl, data, httpOptions)
            .pipe(operators_1.map(function (response) { return _this.parseUser(response.data); }), 
        //tap(),
        operators_1.catchError(this.handleError('addUser')));
    };
    UserService.prototype.updateUser = function (user) {
        var id = typeof user === 'number' ? user : user.id;
        var url = this.apiUsersUrl + "/" + id;
        var data = {
            "data": {
                "type": "user",
                "id": user.id,
                "attributes": {
                    email: user.email,
                    password: user.password,
                    lastname: user.lastname,
                    name: user.name,
                }
            }
        };
        return this.http.patch(url, data, httpOptions)
            .pipe(operators_1.map(function (response) { return response.data; }), 
        //tap(),
        operators_1.catchError(this.handleError('updateUser')));
    };
    UserService.prototype.deleteUser = function (user) {
        var id = typeof user === 'number' ? user : user.id;
        var url = this.apiUsersUrl + "/" + id;
        return this.http.delete(url, httpOptions)
            .pipe(operators_1.map(function (response) { return response.data; }), 
        //tap(),
        operators_1.catchError(this.handleError('deleteUser')));
    };
    UserService.prototype.handleError = function (operation, result) {
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            console.error(operation + " failed: " + error.message);
            return rxjs_1.of(result);
        };
    };
    UserService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=login.service.js.map