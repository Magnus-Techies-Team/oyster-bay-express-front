import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RoutePathConstraints } from '@shared/constraints/route-path-constraints';

@Injectable()
export class CreateQuizRouterService {
    
    private featurePath = RoutePathConstraints.CREATE_QUIZ.fullPath;
    
    constructor(private router: Router) {
    }
    
    toCreateQuizPage(): void {
        this.router.navigate([this.featurePath]);
    }
    
}
