import { MatSnackBarConfig } from '@angular/material/snack-bar';

export const SnackbarConstraints: { [key:string]: MatSnackBarConfig<any> } = {
    DEFAULT_POSITION: {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
    },
};
