import { InjectionToken } from '@angular/core';
import { IConfig } from '@shared';

export const APP_CONFIG: InjectionToken<IConfig> = new InjectionToken<IConfig>('Application Configuration');
