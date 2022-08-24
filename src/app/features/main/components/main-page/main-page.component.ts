import { Component, OnInit } from '@angular/core';
import { UserFacade } from '@core/+state/user/state/facade';

@Component({
    selector: 'app-main',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {

    constructor(private userFacade: UserFacade) { }

    ngOnInit(): void {
    }

    public onLogoutClick(): void {
        this.userFacade.logOut();
    }

}
