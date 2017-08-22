/**
 *  app.module.ts
 *    - The main app module file, where Angular starts
 *  
 ******************************************************************************/

/* Importing modules */
import { NgModule } from '@angular/core';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { Http, RequestOptions, HttpModule, Headers } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* Importing custom components */
import { CustomRouting } from './app.routing';
import { RootComponent } from './pages/root/root.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

/* Importing custom providers */
import { UtilsService } from './services/utils.service';
import { HomeService } from './pages/home/home.service';
import { AuthGuard } from './services/auth-guard.service';
import { LoginService } from './pages/login/login.service';

/* Factory to use as a provider for AuthHttp, making it easier to configure */
export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'session_token',
    globalHeaders: [{ 'Content-Type': 'application/json' }],
    tokenGetter: (() => localStorage.getItem('session_token'))
  }), http, options);
}

/* Creating the app module */
@NgModule({
  declarations: [
    RootComponent,
    HomeComponent,
    LoginComponent,
    NotFoundComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    CustomRouting,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot()
  ],
  providers: [
    AuthGuard,
    HomeService,
    LoginService,
    UtilsService,
    {
      provide: AuthHttp,
      deps: [Http, RequestOptions],
      useFactory: authHttpServiceFactory
    }
  ],
  bootstrap: [RootComponent]
})
export class AppModule {}