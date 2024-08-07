import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
import { NgxEchartsModule } from 'ngx-echarts';
import { provideEcharts } from 'ngx-echarts';



export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),HttpClient,provideHttpClient(),NgxEchartsModule,provideEcharts()]
};
