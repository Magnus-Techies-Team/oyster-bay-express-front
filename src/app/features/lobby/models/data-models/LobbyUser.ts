import { IUserNameId } from '@shared/models/user';
import { LobbyUserState } from '@lobby/models/data-models/LobbyUserState';
import { LobbyUserStatus } from '@lobby/models/data-models/LobbyUserStatus';

export interface ILobbyUser extends IUserNameId {
    state: LobbyUserState,
    status: LobbyUserStatus
}
