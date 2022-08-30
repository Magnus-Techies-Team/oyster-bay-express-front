export const ErrorConstraints = {
    DEFAULT_ERROR: {
        type: 'unknownError',
        message: 'An unknown error has occurred',
    },
    SERVER_NOT_RESPONDING: {
        type: 'serverNotResponding',
        message: 'Server not responding. Please, wait a bit',
    },
    NO_AUTH_TOKEN: {
        type: 'noAuthToken',
        message: 'No authorization token passed',
    },
    UNAUTHORIZED_ERROR: {
        type: 'unauthorizedError',
        message: 'User is not authorized',
    },
    INVALID_USER_ID: {
        type: 'invalidUserID',
        message: 'Invalid user ID',
    },
    TOKEN_EXPIRED: {
        type: 'tokenExpired',
        message: 'Token has expired',
    },
    INVALID_PASSWORD: {
        type: 'invalidPassword',
        message: 'The password is incorrect',
    },
    EMAIL_OR_USERNAME_ALREADY_EXIST: {
        type: 'emailOrUsernameAlreadyExists',
        message: 'Email or username already exists',
    },
    CREATING_USER_ERROR: {
        type: 'creatingUserError',
        message: 'Error occurred while creating user',
    },
    INVALID_EMAIL: {
        type: 'invalidEmail',
        message: 'Invalid email was provided',
    },
    HOST_IN_GAME: {
        type: 'hostInGame',
        message: 'Host already in game',
    },
};
