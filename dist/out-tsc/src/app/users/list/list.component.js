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
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var new_user_dialog_component_1 = require("./new-user-dialog.component");
var stats_component_1 = require("./../../stats/stats.component");
var stats_service_1 = require("./../../stats/stats.service");
var user_service_1 = require("./../user.service");
var moment = require("moment");
var ListComponent = /** @class */ (function () {
    function ListComponent(dialog, userService, snackBar, bottomSheet, statsService) {
        this.dialog = dialog;
        this.userService = userService;
        this.snackBar = snackBar;
        this.bottomSheet = bottomSheet;
        this.statsService = statsService;
        this.lastUsers = null;
        this.searchTerms = new rxjs_1.Subject();
    }
    ListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getUsers();
        this.users = this.searchTerms.pipe(operators_1.debounceTime(300), operators_1.filter(function (term) { return term.length > 2; }), operators_1.distinctUntilChanged(), operators_1.tap(function (_) { return _this.lastUsers = null; }), operators_1.switchMap(function (term) { return _this.userService.searchUsers(term); }));
    };
    ListComponent.prototype.getUsers = function () {
        var _this = this;
        this.userService.getUsers()
            .subscribe(function (users) { return _this.lastUsers = rxjs_1.of(users); });
    };
    ListComponent.prototype.search = function (term) {
        this.searchTerms.next(term);
    };
    ListComponent.prototype.openNewUserDialog = function () {
        var dialogRef = this.dialog.open(new_user_dialog_component_1.NewUserDialogComponent, {
            width: '240px'
        });
    };
    ListComponent.prototype.openBottomSheet = function () {
        var _this = this;
        this.statsService.getStats(moment().format('YYYY-MM-01'), moment().format('YYYY-MM-DD')).subscribe(function (stats) {
            _this.bottomSheet.open(stats_component_1.StatsComponent, { data: stats });
        });
    };
    ListComponent = __decorate([
        core_1.Component({
            selector: 'app-list',
            templateUrl: './list.component.html',
            styleUrls: ['./list.component.css']
        }),
        __metadata("design:paramtypes", [material_1.MatDialog, user_service_1.UserService, material_1.MatSnackBar,
            material_1.MatBottomSheet, stats_service_1.StatsService])
    ], ListComponent);
    return ListComponent;
}());
exports.ListComponent = ListComponent;
//# sourceMappingURL=list.component.js.map