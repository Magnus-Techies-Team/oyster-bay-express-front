import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
    imports: [
        // MatSnackBarModule,
        // MatFormFieldModule,
        // MatSelectModule,
        // MatInputModule,
        // MatButtonModule,
        // MatExpansionModule,
    ],
    exports: [
        MatSnackBarModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        MatExpansionModule,
        MatSlideToggleModule,
    ],
})
export class AngularMaterialModule {}
