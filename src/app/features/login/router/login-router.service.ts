import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RoutePathConstraints } from '@shared/constraints/route-path-constraints';

@Injectable()
export class LoginRouterService {
    
    private featurePath: string = RoutePathConstraints.LOGIN.fullPath;
    
    constructor(private router: Router) {
    }
    
    toLoginPage(): void {
        this.router.navigate([this.featurePath]);
    }
    
}
