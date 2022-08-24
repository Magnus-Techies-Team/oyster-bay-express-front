import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { validationConstraints } from '@shared/constraints/validation-constraints';
import { UserFacade } from '@core/+state/user/state/facade';
import { AuthOption, authOptions, AuthOptionsType } from '../../models/auth-options';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {

    public signInForm: UntypedFormGroup;

    public signUpForm: UntypedFormGroup;

    public selectedAuthOption: AuthOptionsType = AuthOptionsType.SIGN_IN;

    public authOptions: AuthOption[];
    
    public get authOptionsType(): typeof AuthOptionsType {
        return AuthOptionsType;
    }

    public get validationConstraints(): typeof validationConstraints {
        return validationConstraints;
    }

    
    
    constructor(private formBuilder: UntypedFormBuilder,
                private userFacade: UserFacade) {
        this.signInForm = this.formBuilder.group({
            login: ['test', [Validators.required, Validators.maxLength(validationConstraints.LOGIN_MAX_LENGTH)]],
            password: ['12341234', [Validators.required, Validators.maxLength(validationConstraints.PASSWORD_MAX_LENGTH)]],
        });
        this.signUpForm = this.formBuilder.group({
            email: ['test@re.re', [Validators.required, Validators.email]],
            login: ['test', [Validators.required, Validators.maxLength(validationConstraints.LOGIN_MAX_LENGTH)]],
            password: ['12341234', [Validators.required, Validators.maxLength(validationConstraints.PASSWORD_MAX_LENGTH)]],
        });
        this.authOptions = Object.values(authOptions);
    }

    ngOnInit(): void {
    }

    onSignInClick(): void {
        const formControls: { [key: string]: AbstractControl } = this.signInForm.controls;
        if (this.signInForm.valid) {
            this.userFacade.signIn({ 
                login: formControls['login'].value, 
                password: formControls['password'].value, 
            });
        }
    }

    onSignUpClick(): void {
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

