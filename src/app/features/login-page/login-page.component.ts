import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validationConstraints } from '@shared/constraints/validation-constraints';
import { UserFacade } from '@core/+state/user/state/facade';
import { AuthOption, authOptions, AuthOptionsType } from './models/auth-options';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {

    public signInForm: FormGroup;

    public signUpForm: FormGroup;

    public selectedAuthOption: AuthOptionsType = AuthOptionsType.SIGN_IN;

    public authOptions: AuthOption[];
    
    public get authOptionsType(): typeof AuthOptionsType {
        return AuthOptionsType;
    }

    public get validationConstraints(): typeof validationConstraints {
        return validationConstraints;
    }

    
    
    constructor(private formBuilder: FormBuilder,
                private userFacade: UserFacade) {
        this.signInForm = this.formBuilder.group({
            login: [null, [Validators.required, Validators.max(validationConstraints.LOGIN_MAX_LENGTH)]],
            password: [null, [Validators.required, Validators.max(validationConstraints.PASSWORD_MAX_LENGTH)]],
        });
        this.signUpForm = this.formBuilder.group({
            email: [null, [Validators.required, Validators.email]],
            login: [null, [Validators.required, Validators.max(validationConstraints.LOGIN_MAX_LENGTH)]],
            password: [null, [Validators.required, Validators.max(validationConstraints.PASSWORD_MAX_LENGTH)]],
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
        if (this.signInForm.valid) {
            this.userFacade.signUp({
                email: formControls['email'].value,
                login: formControls['login'].value,
                password: formControls['password'].value,
            });
        }
    }
}