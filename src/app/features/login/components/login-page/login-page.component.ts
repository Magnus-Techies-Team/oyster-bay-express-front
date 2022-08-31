import { Component } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { validationNumericConstraints } from '@shared/constraints/validation-numeric-constraints';
import { UserFacade } from '@core/+state/user/state/facade';
import { AuthOption, authOptions, AuthOptionsType } from '../../models/AuthOptions';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {

    public signInForm: UntypedFormGroup;

    public signUpForm: UntypedFormGroup;

    public selectedAuthOption: AuthOptionsType = AuthOptionsType.SIGN_IN;

    public authOptions: AuthOption[];
    
    public get authOptionsType(): typeof AuthOptionsType {
        return AuthOptionsType;
    }

    public get validationConstraints(): typeof validationNumericConstraints {
        return validationNumericConstraints;
    }

    constructor(private formBuilder: UntypedFormBuilder,
                private userFacade: UserFacade) {
        this.signInForm = this.formBuilder.group({
            login: ['test', [Validators.required, Validators.maxLength(validationNumericConstraints.LOGIN_MAX_LENGTH)]],
            password: ['12341234', [Validators.required, Validators.maxLength(validationNumericConstraints.PASSWORD_MAX_LENGTH)]],
        });
        this.signUpForm = this.formBuilder.group({
            email: ['test@re.re', [Validators.required, Validators.email]],
            login: ['test', [Validators.required, Validators.maxLength(validationNumericConstraints.LOGIN_MAX_LENGTH)]],
            password: ['12341234', [Validators.required, Validators.maxLength(validationNumericConstraints.PASSWORD_MAX_LENGTH)]],
        });
        this.authOptions = Object.values(authOptions);
    }

    public onSignInClick(): void {
        const formControls: { [key: string]: AbstractControl } = this.signInForm.controls;
        if (this.signInForm.valid) {
            this.userFacade.signIn({ 
                login: formControls['login'].value, 
                password: formControls['password'].value, 
            });
        }
    }

    public onSignUpClick(): void {
        const formControls: { [key: string]: AbstractControl } = this.signUpForm.controls;
        if (this.signUpForm.valid) {
            this.userFacade.signUp({
                email: formControls['email'].value,
                login: formControls['login'].value,
                password: formControls['password'].value,
            });
        }
    }
}

