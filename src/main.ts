// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { JwtInterceptor } from './app/jwt.interceptor';
import { AuthGuard } from './app/auth.guard';

const providers = [
  provideRouter(routes),
  provideHttpClient(),
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  AuthGuard
];

// Bootstrap de la aplicación
bootstrapApplication(AppComponent, { providers })
  .catch(err => console.error(err));