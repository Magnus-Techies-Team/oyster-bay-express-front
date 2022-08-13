import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { IConfig } from '@shared';
import { APP_CONFIG } from '@shared/constraints/config-injection-token';

fetch('./assets/configs/config.json')
    .then(response => response.json())
    .then((config: IConfig) => {
        if (environment.production) {
            enableProdMode();
        }

        platformBrowserDynamic([
            { 
                provide: APP_CONFIG, 
                useValue: config, 
            },
        ]).bootstrapModule(AppModule)
            .catch(err => console.error(err));
    });
