import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { LobbyEffects } from '@core/+state/current-lobby/effects/effects';

@NgModule({
    imports: [
        EffectsModule.forFeature([LobbyEffects]),
    ],
})
export class CurrentLobbyEffectsModule {}
