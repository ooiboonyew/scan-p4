import { AbstractControl } from '@angular/forms';

export class CustomValidators {

    static currency(control: AbstractControl): { [key: string]: boolean } {
        let regEx = new RegExp(/(?=.)^\$?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?(\.[0-9]{1,2})?$/i);

        if (!regEx.test(control.value)) {
            return { invalidCurrency: true }
        }
    }

    static excelfile(control: AbstractControl): { [key: string]: boolean } {

        if (!control.value || control.value === '') {
            return;
        }

        const file = control.value;

        if (file) {
            //const extension = file.split('.')[1].toLowerCase();

            var splited = file.split('.');
            var extension = splited[splited.length-1].toLowerCase();

            if ("xlsx" !== extension.toLowerCase()) {
                return {
                    invalidfiletype: true
                };
            }
        }

    }

    static email(control: AbstractControl): { [key: string]: boolean } {
        if (!control.value || control.value === '') {
            return;
        }
        let regEx = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i);

        if (!regEx.test(control.value)) {
            return { invalidEmail: true }
        }
    }

    static letterOnly(control: AbstractControl): { [key: string]: boolean } {
        if (!control.value || control.value === '') {
            return;
        }
        let regEx = new RegExp(/^[A-Za-z]+$/);
        if (!regEx.test(control.value)) {
            return { letterOnly: true }
        }
    }

 

    static letterAndNumberOnly(control: AbstractControl): { [key: string]: boolean } {
        if (!control.value || control.value === '') {
            return;
        }
        let regEx = new RegExp(/^[A-Za-z0-9]+$/);
        if (!regEx.test(control.value)) {
            return { letterAndNumberOnly: true }
        }
    }

    static letterAndSpaceOnly(control: AbstractControl): { [key: string]: boolean } {
        if (!control.value || control.value === '') {
            return;
        }
        let regEx = new RegExp(/^[A-Za-z ]+$/);
        if (!regEx.test(control.value)) {
            return { letterAndSpaceOnly: true }
        }
    }

    static letterAndNumberSpaceOnly(control: AbstractControl): { [key: string]: boolean } {
        if (!control.value || control.value === '') {
            return;
        }
        let regEx = new RegExp(/^[A-Za-z0-9 ]+$/);
        if (!regEx.test(control.value)) {
            return { letterAndNumberSpaceOnly: true }
        }
    }

    static sgMobileOnly(control: AbstractControl): { [key: string]: boolean } {
        // let regEx = new RegExp(/^\+65/);

        let regEx = new RegExp(/^[0-9 ()+-]+$/);
        if (!regEx.test(control.value)) {
            return { sgMobileOnly: true }
        }
    }

    static numberOnly(control: AbstractControl): { [key: string]: boolean } {
        let regEx = new RegExp(/^\d+$/);

        if (!regEx.test(control.value)) {
            return { numberOnly: true }
        }
    }

    static creditCard(control: AbstractControl): { [key: string]: boolean } {

        function mod10(value: string) {
            if (/[^0-9-\s]+/.test(value)) return false;

            // The Luhn Algorithm. It's so pretty.
            var nCheck = 0, nDigit = 0, bEven = false;
            value = value.replace(/\D/g, "");

            for (var n = value.length - 1; n >= 0; n--) {
                var cDigit = value.charAt(n),
                    nDigit = parseInt(cDigit, 10);

                if (bEven) {
                    if ((nDigit *= 2) > 9) nDigit -= 9;
                }

                nCheck += nDigit;
                bEven = !bEven;
            }

            return (nCheck % 10) == 0;
        }

        if (!mod10(control.value)) {
            return { invalidCreditCard: true }
        }
    }

}