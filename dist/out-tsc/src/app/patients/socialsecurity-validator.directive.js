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
var forms_1 = require("@angular/forms");
var SocialSecurityValidatorDirective = /** @class */ (function () {
    function SocialSecurityValidatorDirective() {
        this.validator = socialSecurityValidator();
    }
    SocialSecurityValidatorDirective_1 = SocialSecurityValidatorDirective;
    SocialSecurityValidatorDirective.prototype.validate = function (control) {
        return this.validator(control);
    };
    var SocialSecurityValidatorDirective_1;
    SocialSecurityValidatorDirective = SocialSecurityValidatorDirective_1 = __decorate([
        core_1.Directive({
            selector: '[app-socialSecurityValidator][ngModel]',
            providers: [{
                    provide: forms_1.NG_VALIDATORS,
                    useExisting: core_1.forwardRef(function () { return SocialSecurityValidatorDirective_1; }),
                    multi: true
                }]
        }),
        __metadata("design:paramtypes", [])
    ], SocialSecurityValidatorDirective);
    return SocialSecurityValidatorDirective;
}());
exports.SocialSecurityValidatorDirective = SocialSecurityValidatorDirective;
function socialSecurityValidator() {
    return function (control) {
        var socialSecurity = control.value;
        if (typeof (socialSecurity) === 'string') {
            return {
                socialSecurityName: {
                    valid: false
                }
            };
        }
        return null;
    };
}
//# sourceMappingURL=socialsecurity-validator.directive.js.map