import { AbstractControl, ValidatorFn } from "@angular/forms";


export class Helpers {

  public static validateStringIsNotEmpty(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      return control.value && control.value.toString().trim().length > 0 ? null
        : {emptyString: {value: control.value}};
    }
  }

}
