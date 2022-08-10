import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LoginPageModule } from '@login-module';
import { MainModule } from '@main-module';
import { BaseService } from '@core/services/base-service';
import { CoreModule } from '@core';
import { AngularMaterialModule } from '@shared/angular-material/angular-material.module';
import { routes } from './routes';

export function ConfigFactory(configService: BaseService) {
    return () => configService.initConfig();
}

@NgModule({
    imports: [
        CoreModule,
        BrowserModule,
        RouterModule.forRoot(routes),
        StoreModule.forRoot({}, {}),
        EffectsModule.forRoot([]),
        LoginPageModule,
        MainModule,
        AngularMaterialModule,
    ],
    declarations: [
        AppComponent,
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: ConfigFactory,
            deps: [BaseService],
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }


