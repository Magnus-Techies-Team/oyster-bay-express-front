import { UserResponse } from '@shared/models/DTO/responses/user/user-response';

export interface ISignInResponse {
    jwt: string;
    user: UserResponse;
}
