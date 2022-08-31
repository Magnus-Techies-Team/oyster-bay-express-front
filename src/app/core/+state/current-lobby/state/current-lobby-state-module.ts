import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { CURRENT_LOBBY_FEATURE_KEY, lobbyReducer } from '@core/+state/current-lobby/state/reducer';
import { LobbyFacade } from '@core/+state/current-lobby/state/facade';

@NgModule({
    imports: [
        StoreModule.forFeature({ name: CURRENT_LOBBY_FEATURE_KEY, reducer: lobbyReducer }),
    ],
    providers: [
        LobbyFacade,
    ],
})
export class CurrentLobbyStateModule {}
