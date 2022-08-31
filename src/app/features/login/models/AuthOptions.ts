export enum AuthOptionsType {
    SIGN_IN = 'SIGN_IN',
    SIGN_UP = 'SIGN_UP',
}

export interface AuthOption {
    type: AuthOptionsType,
    title: string
}

export const authOptions = {
    [AuthOptionsType.SIGN_UP]: {
        type: AuthOptionsType.SIGN_IN,
        title: 'Sign in',
    },

    [AuthOptionsType.SIGN_IN]: {
        type: AuthOptionsType.SIGN_UP,
        title: 'Sign up',
    }, 
};
