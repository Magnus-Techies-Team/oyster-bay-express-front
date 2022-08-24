import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RoutePathConstraints } from '@shared/constraints/route-path-constraints';


@Injectable()
export class MainRouterService {
    
    private featurePath: string = RoutePathConstraints.MAIN.fullPath;
    
    constructor(private router: Router) {
    }
    
    toMainPage(): void {
        this.router.navigate(['/' + this.featurePath]);
    }
    
}
