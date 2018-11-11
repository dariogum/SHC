import { Directive, Input, forwardRef } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  NG_VALIDATORS,
  ValidatorFn,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[app-socialSecurityValidator][ngModel]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => SocialSecurityValidatorDirective),
    multi: true
  }]
})
export class SocialSecurityValidatorDirective implements Validator {
  validator: ValidatorFn;

  constructor() {
    this.validator = socialSecurityValidator();
  }

  validate(control: FormControl) {
    return this.validator(control);
  }
}

function socialSecurityValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const socialSecurity = control.value;
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
