import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { UserEffect } from '@core/+state/user/effect/user-effect';

@NgModule({
    imports: [
        EffectsModule.forFeature([UserEffect]),
    ],
})
export class UserEffectModule {}
