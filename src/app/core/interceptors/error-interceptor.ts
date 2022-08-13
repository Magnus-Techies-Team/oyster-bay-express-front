import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import ErrorUtil from '@shared/utils/error-util';
import { IHttpErrorResponse } from '@shared';

@Injectable()
export class ErrorInterceptor implements ErrorHandler {

    constructor(private snackBar: MatSnackBar,
                private zone: NgZone) {
    }

    handleError(error: any) {
        console.log('!!!!', error);
        if (error instanceof HttpErrorResponse) {
            this.zone.run(() => {
                this.snackBar.open(ErrorUtil.getErrorMessage(error as IHttpErrorResponse), 'OK', {
                    horizontalPosition: 'center',
                    verticalPosition: 'bottom',
                });
            });

        }
        if (!environment.production) {
            throw error;
        }
    }
}
