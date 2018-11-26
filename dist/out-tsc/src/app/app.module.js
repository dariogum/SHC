"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var animations_1 = require("@angular/platform-browser/animations");
var material_1 = require("@angular/material");
var core_2 = require("@angular/material/core");
var material_moment_adapter_1 = require("@angular/material-moment-adapter");
var app_component_1 = require("./app.component");
var app_routing_module_1 = require("./app-routing.module");
var login_component_1 = require("./login/login.component");
var pagenotfound_component_1 = require("./pagenotfound/pagenotfound.component");
var socialsecurity_validator_directive_1 = require("./patients/socialsecurity-validator.directive");
var stats_component_1 = require("./stats/stats.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                pagenotfound_component_1.PagenotfoundComponent,
                socialsecurity_validator_directive_1.SocialSecurityValidatorDirective,
                stats_component_1.StatsComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpClientModule,
                animations_1.BrowserAnimationsModule,
                app_routing_module_1.AppRoutingModule,
                material_1.MatBottomSheetModule,
                material_1.MatButtonModule,
                material_1.MatCardModule,
                material_1.MatDatepickerModule,
                material_1.MatFormFieldModule,
                material_1.MatGridListModule,
                material_1.MatIconModule,
                material_1.MatInputModule,
                material_1.MatListModule,
                material_1.MatMenuModule,
                material_1.MatNativeDateModule,
                material_1.MatSnackBarModule,
                material_1.MatToolbarModule,
                material_1.MatTooltipModule
            ],
            entryComponents: [
                stats_component_1.StatsComponent,
            ],
            providers: [
                { provide: core_2.MAT_DATE_LOCALE, useValue: 'es-AR' },
                { provide: core_2.DateAdapter, useClass: material_moment_adapter_1.MomentDateAdapter, deps: [core_2.MAT_DATE_LOCALE] },
                { provide: core_2.MAT_DATE_FORMATS, useValue: material_moment_adapter_1.MAT_MOMENT_DATE_FORMATS },
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map