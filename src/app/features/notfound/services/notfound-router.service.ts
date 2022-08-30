import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RoutePathConstraints } from '@shared/constraints/route-path-constraints';

@Injectable()
export class NotfoundRouterService {
    
    private featurePath: string = RoutePathConstraints.NOT_FOUND_PAGE.fullPath;
    
    constructor(private router: Router) {
    }
    
    public toNotfoundPage(): void {
        this.router.navigate([this.featurePath]);
    }
    
}
