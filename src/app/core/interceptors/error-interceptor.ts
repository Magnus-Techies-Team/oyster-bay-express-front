import { ErrorHandler, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorInterceptor implements ErrorHandler {

    constructor(private snackBar: MatSnackBar) {
    }

    handleError(error: any) {
        console.log('HANDLE ERROR', error);
        this.snackBar.open(`Error! ${error?.error?.message}`, 'OK');
    }
}
