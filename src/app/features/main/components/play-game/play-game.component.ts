import { Component, OnDestroy, OnInit } from '@angular/core';
import { QuizTagsConstraints } from '@shared/constraints/quiz-tags-constraints';
import { QuizApiService } from '@core/services/api/quiz-api.service';
import { PlayGameInitStatus } from '@main/models';
import { IQuizTag, IShortQuiz } from '@quiz/models/data-models';
import { debounceTime, distinctUntilChanged, filter, Subject, switchMap, takeUntil } from 'rxjs';
import { LobbyApiService } from '@core/services/api/lobby-api.service';
import { IAvailableLobby } from '@lobby/models/data-models/available-lobbies';
import { LobbyRouterService } from '@lobby/router';
import { isDefaultLobbyWSMessageBodyResponse } from '@lobby/models/responses/LobbyWSMessageResponse';

@Component({
    selector: 'app-play-game',
    templateUrl: './play-game.component.html',
    styleUrls: ['./play-game.component.scss'],
})
export class PlayGameComponent implements OnInit, OnDestroy {

    private tagChoiceDebounceTimeMs: number = 500;

    public initStatus: PlayGameInitStatus = { quizzes: false, lobbies: false };
    
    public selectedTags: IQuizTag[] = [];

    public availableQuizzes: IShortQuiz[] | undefined;

    public selectedQuizId: string | undefined;

    public availableLobbies: IAvailableLobby[] | undefined;

    public selectedLobbyId: string | undefined;
    
    public get tags(): IQuizTag[] {
        return Object.values(QuizTagsConstraints);
    }

    public get tagsConstraints(): typeof QuizTagsConstraints {
        return QuizTagsConstraints;
    }

    private selectedTagsSubject: Subject<IQuizTag[]> = new Subject<IQuizTag[]>();
    
    private destroyed$: Subject<any> = new Subject<any>();
  
    constructor(private quizApiService: QuizApiService,
                private lobbyApiService: LobbyApiService,
                private lobbyRouterService: LobbyRouterService) { }

    ngOnInit(): void {
        this.getAllQuizzes();
        this.getAllAvailableLobbies();
        this.initSelectedTagsSubject();
    }

    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }

    private initSelectedTagsSubject(): void {
        this.selectedTagsSubject.pipe(
            debounceTime(this.tagChoiceDebounceTimeMs),
            filter(v => !!v),
            distinctUntilChanged(),
            switchMap(tags => {
                return this.quizApiService.getAllAvailableQuizzes({
                    tags: tags.map(tag => tag.type),
                });
            }),
        ).subscribe(quizzes => {
            this.availableQuizzes = quizzes;
        });
    }

    public onChangeTag(updatedTags: IQuizTag[]): void {
        this.selectedTagsSubject.next(updatedTags);
    }

    private getAllQuizzes(): void {
        this.quizApiService.getAllAvailableQuizzes().subscribe(quizzes => {
            this.availableQuizzes = quizzes;
            this.initStatus.quizzes = true;
        });
    }

    private getAllAvailableLobbies(): void {
        this.lobbyApiService.getAllAvailableLobbies().subscribe(lobbies => {
            this.availableLobbies = lobbies;
            this.initStatus.lobbies = true;
        });
    }

    public onSelectQuizClick(quizId: string): void {
        this.selectedQuizId = quizId;
    }

    public getTagsToDisplay(): string {
        return this.selectedTags.map(tag => tag.displayName).join(', ');
    }

    public onCreateLobbyClick(): void {
        if (this.selectedQuizId) {
            this.lobbyApiService.createLobby({ quizId: this.selectedQuizId });
            this.navigateToWaitingRoomAfterWSResponse();
        }
    }

    public onActiveLobbyClick(lobbyId: string): void {
        this.selectedLobbyId = lobbyId;
    }

    public onEnterLobbyClick(): void {
        if (this.selectedLobbyId) {
            // this.lobbyApiService.spectateLobby({ lobbyId: this.selectedLobbyId });
            // this.navigateToWaitingRoomAfterWSResponse();
            this.lobbyRouterService.toWaitingRoom(this.selectedLobbyId);
        }
    }

    private navigateToWaitingRoomAfterWSResponse(): void {
        this.lobbyApiService.lobbyMessagesObs$.pipe(
            takeUntil(this.destroyed$),
        ).subscribe(message => {
            if (isDefaultLobbyWSMessageBodyResponse(message.response)) {
                this.lobbyRouterService.toWaitingRoom(message.response.lobby.id);
            }
        });
    }

}
