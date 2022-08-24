import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import ErrorUtil from '@shared/utils/error-util';
import { IError, IHttpErrorResponse } from '@shared';
import { ErrorConstraints } from '@shared/constraints/error-constraints';

@Injectable()
export class ErrorInterceptor implements ErrorHandler {

    constructor(private snackBar: MatSnackBar,
                private zone: NgZone) {
    }

    handleError(error: any) {
        console.log('!!!!', error);
        if (error instanceof HttpErrorResponse) {
            const errorObject: IError = ErrorUtil.getErrorObject(error as IHttpErrorResponse);
            // no need to display error if user is unauthorized, everything is handled in guards
            if (errorObject.type !== ErrorConstraints.NO_AUTH_TOKEN.type && errorObject.type !== ErrorConstraints.TOKEN_EXPIRED.type) {
                this.zone.run(() => {
                    this.snackBar.open(ErrorUtil.getErrorObject(error as IHttpErrorResponse).message, 'OK', {
                        horizontalPosition: 'center',
                        verticalPosition: 'bottom',
                    });
                });    
            }
        }
        if (!environment.production) {
            throw error;
        }
    }
}
