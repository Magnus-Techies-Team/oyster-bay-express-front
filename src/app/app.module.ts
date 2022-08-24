import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CoreModule } from '@core';
import { AngularMaterialModule } from '@shared/angular-material/angular-material.module';
import { routes } from './routes';
import { RootComponent } from '@root';
import { NotfoundComponent } from './features/notfound/notfound.component';

@NgModule({
    imports: [
        BrowserModule,

        StoreModule.forRoot({}, {}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot(routes),
        AngularMaterialModule,
        CoreModule,
    ],
    declarations: [
        AppComponent,
        RootComponent,
        NotfoundComponent,
    ],
    providers: [
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }


