export interface LobbyShortQuestion {
    id: number;
    questionStatus: LobbyShortQuestionStatus
}

export enum LobbyShortQuestionStatus {
    ACTIVE = 'active',
    TAKEN = 'taken',
    NOT_TAKEN = 'not_taken',
}
