export enum LobbyMethods {
    CREATE_LOBBY = 'create_lobby',
    SPECTATE_LOBBY = 'spectate_lobby',
    JOIN_LOBBY = 'join_lobby',
    VALIDATE_ANSWER = 'validate_answer',
    USER_JOIN = 'user_join_lobby',
    DISCONNECT = 'disconnect',
    HOST_DISCONNECT = 'host_disconnect',
    USER_DISCONNECT = 'user_disconnect',
    SEND_MESSAGE = 'send_message',
    RECEIVE_MESSAGE = 'receive_message',
    START_LOBBY = 'start_lobby',
    START = 'start',
    SET_QUESTION = 'set_question',
    TAKE_QUESTION = 'take_question',
    ANSWER_QUESTION = 'answer_question',
    SWITCH_ROUND = 'switch_round',
    END_LOBBY = 'end_lobby',
}
