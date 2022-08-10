import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { USER_FEATURE_KEY, userReducer } from '@core/+state/user/state/reducer';
import { UserFacade } from '@core/+state/user/state/facade';

@NgModule({
    imports: [
        StoreModule.forFeature({ name: USER_FEATURE_KEY, reducer: userReducer }),
    ],
    providers: [
        UserFacade,
    ],
})
export class UserStateModule {}
