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
var material_1 = require("@angular/material");
var router_1 = require("@angular/router");
var user_1 = require("./../../classes/user");
var user_service_1 = require("./../user.service");
var NewUserDialogComponent = /** @class */ (function () {
    function NewUserDialogComponent(dialogRef, router, userService) {
        this.dialogRef = dialogRef;
        this.router = router;
        this.userService = userService;
        this.user = new user_1.User();
    }
    NewUserDialogComponent.prototype.addUser = function () {
        var _this = this;
        this.userService.addUser(this.user)
            .subscribe(function (user) {
            _this.dialogRef.close();
            _this.router.navigate(['users/' + user.id]);
        });
    };
    NewUserDialogComponent = __decorate([
        core_1.Component({
            selector: 'app-new-user-dialog',
            templateUrl: 'new-user-dialog.html',
        }),
        __metadata("design:paramtypes", [material_1.MatDialogRef,
            router_1.Router,
            user_service_1.UserService])
    ], NewUserDialogComponent);
    return NewUserDialogComponent;
}());
exports.NewUserDialogComponent = NewUserDialogComponent;
//# sourceMappingURL=new-user-dialog.component.js.map