import { UserResponse } from '@shared/models/DTO/responses/user/UserResponse';

export interface ISignInResponse {
    jwt: string;
    user: UserResponse;
}
