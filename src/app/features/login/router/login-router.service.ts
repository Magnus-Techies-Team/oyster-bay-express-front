import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { moduleUrl } from '@login-module';

@Injectable()
export class LoginRouterService {
    
    private moduleUrl: string = moduleUrl;
    
    constructor(private router: Router) {
    }
    
    toLoginPage(): void {
        this.router.navigate([this.moduleUrl]);
    }
    
}
