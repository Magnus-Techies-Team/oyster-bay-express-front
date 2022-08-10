import { ErrorHandler, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import ErrorUtil from '@shared/utils/error-util';

@Injectable()
export class ErrorInterceptor implements ErrorHandler {

    constructor(private snackBar: MatSnackBar) {
    }

    handleError(error: any) {
        // console.log('HANDLE ERROR', error);
        if (error instanceof HttpErrorResponse) {
            this.snackBar.open(ErrorUtil.getErrorMessage(error), 'OK');
        }
        if (!environment.production) {
            throw error;
        }

    }
}
