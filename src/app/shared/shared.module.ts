import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

@NgModule({
    imports: [],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
    ],
})
export class SharedModule {}
