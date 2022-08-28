import { Component, OnInit } from '@angular/core';
import { QuizTagsConstraints } from '@shared/constraints/quiz-tags-constraints';
import { QuizApiService } from '@core/services/api/quiz-api.service';
import { PlayGameInitStatus } from '@main/models';
import { IQuizTag, IShortQuiz } from '@quiz/models/data-models';
import { debounceTime, distinctUntilChanged, filter, Subject, switchMap } from 'rxjs';
import { LobbyApiService } from '@core/services/api/lobby-api.service';
import { IAvailableLobby } from '@lobby/models/data-models/available-lobbies';

@Component({
    selector: 'app-play-game',
    templateUrl: './play-game.component.html',
    styleUrls: ['./play-game.component.scss'],
})
export class PlayGameComponent implements OnInit {

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
  
    constructor(private quizApiService: QuizApiService,
                private lobbyApiService: LobbyApiService) { }

    ngOnInit(): void {
        this.getAllQuizzes();
        this.getAllAvailableLobbies();
        this.initSelectedTagsSubject();
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
            this.availableLobbies = Array.from(lobbies.values());
        });
    }

    public onSelectQuizClick(quizId: string): void {
        this.selectedQuizId = quizId;
    }

    public getTagsToDisplay(): string {
        return this.selectedTags.map(tag => tag.displayName).join(', ');
    }

    public onCreateLobbyClick(): void {

    }

    public onJoinLobbyClick(): void {

    }

}
