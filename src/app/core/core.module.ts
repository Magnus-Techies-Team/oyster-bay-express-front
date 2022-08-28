// core
import { ErrorHandler, NgModule } from '@angular/core';
import { ErrorInterceptor } from '@core/interceptors/error-interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomHttpInterceptor } from '@core/interceptors/http-interceptop';

// guards
import { PublicGuard } from '@core/guards/public-guard/public-guard';
import { PrivateGuard } from '@core/guards/private-guard/private-guard';
import { InitGuard } from '@core/guards/init-guard/init-guard';
import { UserGuard } from '@core/guards/user-guard/user-guard';

// services
import { BaseService } from '@core/services/base-service';
import { ApiService } from '@core/services/api/api-service';
import { UserService } from '@core/services/user-service';
import { AuthService } from '@core/services/auth-service';

// states
import { InitStateModule } from '@core/+state/init/state/init-state-module';
import { UserStateModule } from '@core/+state/user/state/user-state-module';
import { CurrentLobbyStateModule } from '@core/+state/current-lobby/state';

// effects
import { UserEffectModule } from '@core/+state/user/effect/user-effect-module';
import { InitEffectModule } from '@core/+state/init/effect/init-effect-module';
import { RouterEffectModule } from '@core/+state/router/effect/router-effect-module';
import { CurrentLobbyEffectsModule } from '@core/+state/current-lobby/effects';

// features router services
import { LoginRouterService } from '@login';
import { MainRouterService } from '@main';
import { QuizRouterService } from '@quiz';
import { QuizApiService } from '@core/services/api/quiz-api.service';
import { LobbyApiService } from '@core/services/api/lobby-api.service';


@NgModule({
    imports: [
        // init state and effect
        InitStateModule,
        InitEffectModule,
        
        // user state and effect
        UserStateModule,
        UserEffectModule,
        
        // lobby state and effect
        CurrentLobbyStateModule,
        CurrentLobbyEffectsModule,
        
        // router effect
        RouterEffectModule,
        
        // common
        HttpClientModule,
        BrowserAnimationsModule,
    ],
    declarations: [],
    providers: [
        // guards
        UserGuard,
        PublicGuard,
        PrivateGuard,
        InitGuard,


        // services
        BaseService,
        ApiService,
        UserService,
        AuthService,
        QuizApiService,
        
        // router services
        LoginRouterService,
        MainRouterService,
        QuizRouterService,
        LobbyApiService,
        {
            provide: ErrorHandler,
            useClass: ErrorInterceptor,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CustomHttpInterceptor,
            multi: true,
        },
    ],
})
export class CoreModule {}
