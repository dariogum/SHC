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
var material_1 = require("@angular/material");
var router_1 = require("@angular/router");
var confirmation_user_dialog_component_1 = require("./confirmation-user-dialog.component");
var user_service_1 = require("./../user.service");
var FormComponent = /** @class */ (function () {
    function FormComponent(breakpointObserver, dialog, route, router, snackBar, userService) {
        this.breakpointObserver = breakpointObserver;
        this.dialog = dialog;
        this.route = route;
        this.router = router;
        this.snackBar = snackBar;
        this.userService = userService;
        this.folded = false;
        this.formClass = 'wide';
    }
    FormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.breakpointObserver.observe([
            layout_1.Breakpoints.HandsetPortrait
        ]).subscribe(function (result) {
            if (result.matches) {
                _this.formClass = 'handset';
            }
        });
        this.breakpointObserver.observe([
            layout_1.Breakpoints.HandsetLandscape,
            layout_1.Breakpoints.TabletPortrait,
        ]).subscribe(function (result) {
            if (result.matches) {
                _this.formClass = 'tablet';
            }
        });
        this.breakpointObserver.observe([
            layout_1.Breakpoints.TabletLandscape,
            layout_1.Breakpoints.WebPortrait,
            layout_1.Breakpoints.WebLandscape,
        ]).subscribe(function (result) {
            if (result.matches) {
                _this.formClass = 'wide';
            }
        });
        this.getUser();
    };
    FormComponent.prototype.toggleAccordion = function () {
        if (this.folded) {
            this.accordion.openAll();
        }
        else {
            this.accordion.closeAll();
        }
        this.folded = !this.folded;
    };
    FormComponent.prototype.getUser = function () {
        var _this = this;
        var id = +this.route.snapshot.paramMap.get('id');
        this.userService.getUser(id)
            .subscribe(function (user) {
            _this.user = user;
        });
    };
    FormComponent.prototype.updateUser = function (event) {
        var controlName;
        if (event.value !== undefined && event.source) {
            controlName = event.source.ngControl.name;
        }
        else if (event.value !== undefined) {
            controlName = event.targetElement.name;
        }
        else {
            controlName = event.target.name;
        }
        var isDataControl = this.userDataForm.controls[controlName] && !this.userDataForm.controls[controlName].pristine;
        if (isDataControl) {
            this.userService.updateUser(this.user).subscribe();
        }
    };
    FormComponent.prototype.deleteUser = function () {
        var _this = this;
        this.userService.deleteUser(this.user.id).subscribe(function (confirmation) {
            var snackBarRef = _this.snackBar.open('Usuario eliminado correctamente', 'OK', {
                duration: 2500,
            });
            _this.router.navigate(['users']);
        });
    };
    FormComponent.prototype.openConfirmationUserDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(confirmation_user_dialog_component_1.ConfirmationUserDialogComponent, {
            width: '240px'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.deleteUser();
            }
        });
    };
    __decorate([
        core_1.ViewChild(material_1.MatAccordion),
        __metadata("design:type", material_1.MatAccordion)
    ], FormComponent.prototype, "accordion", void 0);
    __decorate([
        core_1.ViewChild('userDataForm'),
        __metadata("design:type", forms_1.NgForm)
    ], FormComponent.prototype, "userDataForm", void 0);
    FormComponent = __decorate([
        core_1.Component({
            selector: 'app-form',
            templateUrl: './form.component.html',
            styleUrls: ['./form.component.css']
        }),
        __metadata("design:paramtypes", [layout_1.BreakpointObserver,
            material_1.MatDialog,
            router_1.ActivatedRoute,
            router_1.Router,
            material_1.MatSnackBar,
            user_service_1.UserService])
    ], FormComponent);
    return FormComponent;
}());
exports.FormComponent = FormComponent;
//# sourceMappingURL=form.component.js.map