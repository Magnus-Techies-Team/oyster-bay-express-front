import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import ErrorUtil, { WSError } from '@shared/utils/error-util';
import { IError } from '@shared';
import { ErrorConstraints } from '@shared/constraints/error-constraints';

@Injectable()
export class ErrorInterceptor implements ErrorHandler {

    constructor(private snackBar: MatSnackBar,
                private zone: NgZone) {
    }

    handleError(error: any) {
        if (error instanceof HttpErrorResponse || error instanceof WSError) {
            let errorObject: IError;
            if  (error instanceof HttpErrorResponse) {
                errorObject = ErrorUtil.getErrorObject(error?.error);
            } else {
                errorObject = ErrorUtil.getErrorObject(error.errorObj);
            }
            // no need to display error if user is unauthorized, everything is handled in guards
            if (errorObject.type !== ErrorConstraints.NO_AUTH_TOKEN.type && errorObject.type !== ErrorConstraints.TOKEN_EXPIRED.type) {
                this.zone.run(() => {
                    this.snackBar.open(errorObject.message, 'OK', {
                        horizontalPosition: 'center',
                        verticalPosition: 'bottom',
                    });
                });    
            }
            return;
        }
        if (!environment.production) {
            throw error;
        }
    }
}
