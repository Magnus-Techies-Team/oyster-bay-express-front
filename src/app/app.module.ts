import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './modules/core/components/app/app.component';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LoginPageComponent } from './modules/core/components/login-page/login-page.component';
import { MainComponent } from './modules/core/components/main/main.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginPageComponent,
        MainComponent,
    ],
    imports: [
        BrowserModule,
        RouterModule,
        StoreModule.forRoot({}, {}),
        EffectsModule.forRoot([]),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
