import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideEcharts } from 'ngx-echarts';


bootstrapApplication(AppComponent, appConfig  // Spread syntax to include other configurations from appConfig
).catch(err => console.error(err));
