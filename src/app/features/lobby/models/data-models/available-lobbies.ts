import { IUserNameId } from '@shared/models/user';

export interface IAvailableLobby {
    id: string;
    host_name: string;
    users: IUserNameId[]
}
