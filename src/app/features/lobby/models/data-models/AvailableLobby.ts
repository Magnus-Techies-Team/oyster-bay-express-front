import { IUserNameId } from '@shared/models/user';

export interface IAvailableLobby {
    id: string;
    host: IUserNameId;
    users: IUserNameId[]
}
