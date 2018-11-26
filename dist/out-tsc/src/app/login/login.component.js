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
var user_1 = require("./../classes/user");
var login_service_1 = require("./login.service");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(breakpointObserver, loginService, router, snackBar) {
        this.breakpointObserver = breakpointObserver;
        this.loginService = loginService;
        this.router = router;
        this.snackBar = snackBar;
        this.handset = false;
        this.user = new user_1.User();
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.breakpointObserver.observe([
            layout_1.Breakpoints.Handset
        ]).subscribe(function (result) {
            if (result.matches) {
                _this.handset = true;
            }
            else {
                _this.handset = false;
            }
        });
        localStorage.removeItem('currentUser');
    };
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        this.loginService.verifyByEmail(this.user)
            .subscribe(function (user) {
            if (user) {
                _this.user = user;
                localStorage.setItem('currentUser', JSON.stringify(_this.user));
                _this.router.navigate(['/patients']);
            }
            else {
                var snackBarRef = _this.snackBar.open('Usuario y/o contraseña incorrectos', 'OK', {
                    duration: 2500,
                });
            }
        });
    };
    __decorate([
        core_1.ViewChild('loginForm'),
        __metadata("design:type", forms_1.NgForm)
    ], LoginComponent.prototype, "loginForm", void 0);
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        }),
        __metadata("design:paramtypes", [layout_1.BreakpointObserver,
            login_service_1.LoginService,
            router_1.Router,
            material_1.MatSnackBar])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map