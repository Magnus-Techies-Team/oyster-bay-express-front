import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { moduleUrl } from '@main-module';


@Injectable()
export class MainRouterService {
    
    private moduleUrl: string = moduleUrl;
    
    constructor(private router: Router) {
    }
    
    toMainPage(): void {
        this.router.navigate(['/' + this.moduleUrl]);
    }
    
}
