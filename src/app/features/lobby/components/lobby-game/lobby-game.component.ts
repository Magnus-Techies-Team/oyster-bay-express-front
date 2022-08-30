import { Component, OnDestroy, OnInit } from '@angular/core';
import { LobbyInfoWSResponse } from '@lobby/models/responses/LobbyInfoWSResponse';
import { ILobbyUser } from '@lobby/models/data-models/LobbyUser';
import { LobbyApiService } from '@core/services/api/lobby-api.service';
import { ILobbyQuizRoundsTitle, IQuizLobbyQuestion } from '@quiz/models/data-models/ILobbyQuizRoundsTitle';
import {
    isDefaultLobbyWSMessageBodyResponse, isLobbyEndWSResponse,
    LobbyWSMessageResponse,
} from '@lobby/models/responses/LobbyWSMessageResponse';
import { filter, mergeMap, Subject, take, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LobbyCondition } from '@lobby/models/data-models/LobbyCondition';
import { LobbyUserState } from '@lobby/models/data-models/LobbyUserState';
import { LobbyShortQuestionStatus } from '@lobby/models/data-models/LobbyShortQuestion';
import { LobbyStatus } from '@lobby/models/data-models';
import { ILobbyPlayer } from '@lobby/models/data-models/LobbyPlayer';

@Component({
    selector: 'app-lobby-game',
    templateUrl: './lobby-game.component.html',
    styleUrls: ['./lobby-game.component.scss'],
})
export class LobbyGameComponent implements OnInit, OnDestroy {

    public lobbyInfo: LobbyInfoWSResponse | undefined;
    
    public currentUser: ILobbyUser | undefined;
    
    public quiz: ILobbyQuizRoundsTitle | undefined;
    
    public currentRoundTopics: { topicName: string, questions: IQuizLobbyQuestion[] }[] | undefined;

    public winner: ILobbyPlayer | undefined;

    // public activeQuestion: IQuizLobbyQuestion | undefined;

    private destroy$: Subject<boolean> = new Subject<boolean>();

    public get lobbyConditions(): typeof LobbyCondition {
        return LobbyCondition;
    }

    public get playerStates(): typeof LobbyUserState {
        return LobbyUserState;
    }

    public get questionStatuses(): typeof LobbyShortQuestionStatus {
        return LobbyShortQuestionStatus;
    }

    public get lobbyStatuses(): typeof LobbyStatus {
        return LobbyStatus;
    }
    
    constructor(private lobbyApiService: LobbyApiService,
                private route: ActivatedRoute) {
        
    }

    ngOnInit(): void {
        const lobbyId: string | null = this.route.snapshot.paramMap.get('id');
        if (lobbyId) {
            this.lobbyApiService.connectionEstablished.pipe(
                takeUntil(this.destroy$),
                filter(v => !!v),
                take(1),
                mergeMap(() => {
                    return this.lobbyApiService.getLobbyByID(lobbyId).pipe(takeUntil(this.destroy$));
                }),
            ).subscribe(lobbyQuiz => {
                this.quiz = lobbyQuiz.lobby.quiz;

                const currentLobbyState: LobbyWSMessageResponse | null = this.lobbyApiService.lobbyMessagesSubject$.getValue();
                console.log('state');
                if (currentLobbyState) {
                    this.setLobbyData(currentLobbyState);
                } else {
                    this.lobbyApiService.spectateLobby({ lobbyId: lobbyId });
                }
                this.initLobbyChangeSubscription();
            });   
        }
    }
    
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.complete();
        // this.lobbyApiService.breakTheConnection();
    }

    private setLobbyData(data: LobbyWSMessageResponse): void {
        // console.log('?', data, isDefaultLobbyWSMessageBodyResponse(data.response));
        if (isLobbyEndWSResponse(data.response)) {
            this.winner = data.response.winner;
            console.log('WINNER!!!!!!', this.winner);
            return;
        } else if (isDefaultLobbyWSMessageBodyResponse(data.response)) {
            console.log('NOOOOOO');
            this.lobbyInfo = data.response.lobby;
            this.currentUser = data.response.currentUser;
            this.splitCurrentRoundQuestionsByTopics();
        }
    }

    
    private initLobbyChangeSubscription(): void {
        this.lobbyApiService.lobbyMessagesObs$.pipe(
            takeUntil(this.destroy$),
        ).subscribe(message => {
            this.setLobbyData(message);
        });
    }

    private splitCurrentRoundQuestionsByTopics(): void {
        console.log('spil method', this.quiz, this.lobbyInfo);
        if (this.quiz && this.lobbyInfo) {
            let topics: Map<string, IQuizLobbyQuestion[]> = new Map<string, IQuizLobbyQuestion[]>();

            this.quiz.rounds[this.lobbyInfo.currentRound].forEach(question => {
                if (topics.has(question.topic)) {
                    topics.get(question.topic)?.push(question);
                } else {
                    topics.set(question.topic, [question]);
                }
            });

            const topicsArray: { topicName: string, questions: IQuizLobbyQuestion[] }[] = Array.from(topics).map(topic => {
                return {
                    topicName: topic[0],
                    questions: topic[1].map(q => Object.assign(q, { questionStatus: this.lobbyInfo?.questions.find(q2 => q2.id === q.id)?.questionStatus })),
                };
            });
            topicsArray.forEach(topic => {
                topic.questions.sort((a, b) => a.cost - b.cost);
            });
            

            this.currentRoundTopics = topicsArray;
        }
    }

    public onQuestionClick(questionId: number): void {
        if (this.lobbyInfo) {
            this.lobbyApiService.setLobbyQuestion({ questionId: questionId, lobbyId: this.lobbyInfo.id });    
        }
    }

    public onTakeQuestionClick(): void {
        if (this.lobbyInfo) {
            this.lobbyApiService.takeLobbyQuestion({ lobbyId: this.lobbyInfo.id });
        }
    }

    public onValidateAnswerClick(isRight: boolean): void {
        if (this.lobbyInfo) {
            this.lobbyApiService.validateLobbyAnswer({ isRight: isRight, lobbyId: this.lobbyInfo.id });
        }
    }

}
