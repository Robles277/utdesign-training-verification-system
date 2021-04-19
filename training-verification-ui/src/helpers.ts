import { AbstractControl, ValidatorFn } from "@angular/forms";


export class Helpers {

  public static validateStringIsNotEmpty(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      return control.value && control.value.toString().trim().length > 0 ? null
        : {emptyString: {value: control.value}};
    }
  }

  public static individualKeyCopy<T extends object>(source: any, target: any): T {
    for (var key of Object.keys(source)) {
      target[key] = source[key];
    }
    return target;
  }

}
