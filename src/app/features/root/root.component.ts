import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserResponse } from '@shared/models/DTO/responses/user/user-response';
import * as UserSelectors from '@core//+state/user/state/selectors';
import { Observable } from 'rxjs';
import { UserFacade } from '@core/+state/user/state/facade';
import { MainRouterService } from '@main';

@Component({
    selector: 'app-root',
    templateUrl: './root.component.html',
    styleUrls: ['./root.component.scss'],
})
export class RootComponent implements OnInit {

    public userInfo: Observable<UserResponse | null> = this.store.select(UserSelectors.getUser);
    
    constructor(private store: Store,
                private userFacade: UserFacade,
                private mainFeatureRouterService: MainRouterService) { 
        
    }

    ngOnInit(): void {
    }
    
    onLogoutClick(): void {
        this.userFacade.logOut();
    }
    
    onMainPageClick(): void {
        this.mainFeatureRouterService.toMainPage();
    }

}
