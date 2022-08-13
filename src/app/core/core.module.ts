import { ErrorHandler, NgModule } from '@angular/core';
import { PublicGuard } from '@core/guards/public-guard/public-guard';
import { InitStateModule } from '@core/+state/init/state/init-state-module';
import { BaseService } from '@core/services/base-service';
import { ApiService } from '@core/services/api-service';
import { UserStateModule } from '@core/+state/user/state/user-state-module';
import { UserService } from '@core/services/user-service';
import { UserEffectModule } from '@core/+state/user/effect/user-effect-module';
import { InitEffectModule } from '@core/+state/init/effect/init-effect-module';
import { ErrorInterceptor } from '@core/interceptors/error-interceptor';
import { LoginPageRouterService } from '@login-module';
import { MainPageRouterService } from '@main-module';
import { RouterEffectModule } from '@core/+state/router/effect/router-effect-module';
import { PrivateGuard } from '@core/guards/private-guard/private-guard';
import { InitGuard } from '@core/guards/init-guard/init-guard';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '@core/services/auth-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    imports: [
        // init state and effect
        InitStateModule,
        InitEffectModule,
        
        // user state and effect
        UserStateModule,
        UserEffectModule,
        
        // router effect
        RouterEffectModule,
        
        // common
        HttpClientModule,
        BrowserAnimationsModule,
    ],
    declarations: [],
    providers: [
        // guards
        PublicGuard,
        PrivateGuard,
        InitGuard,

        // services
        BaseService,
        ApiService,
        UserService,
        AuthService,
        
        // router services
        LoginPageRouterService,
        MainPageRouterService,
        {
            provide: ErrorHandler,
            useClass: ErrorInterceptor,
        },
    ],
})
export class CoreModule {}
