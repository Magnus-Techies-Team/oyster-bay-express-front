import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { InitEffect } from '@core/+state/init/effect/init-effect';

@NgModule({
    imports: [
        EffectsModule.forFeature([InitEffect]),
    ],
})
export class InitEffectModule {}
