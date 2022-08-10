import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { INIT_FEATURE_KEY, initReducer } from '@core/+state/init/state/reducer';
import { InitFacade } from '@core/+state/init/state/facade';

@NgModule({
    imports: [
        StoreModule.forFeature({ name: INIT_FEATURE_KEY, reducer: initReducer }),
    ],
    providers: [
        InitFacade,
    ],
})
export class InitStateModule {}
