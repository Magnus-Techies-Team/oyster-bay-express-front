import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { RouterEffect } from '@core/+state/router/effect/router-effect';

@NgModule({
    imports: [
        EffectsModule.forFeature([RouterEffect]),
    ],
})
export class RouterEffectModule {}
