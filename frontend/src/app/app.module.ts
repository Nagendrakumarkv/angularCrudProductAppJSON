import {  NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogComponent } from './dialog/dashboard-popup/dialog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorComponent } from './dialog/error/error.component';
import { ErrorInterceptor } from './error-interceptor';
import { SuccessComponent } from './dialog/success/success.component';

//Angular material modules
import { AngularMaterialModule } from './modules/angular-material.module';

//NGRX
import { StoreModule } from '@ngrx/store';

@NgModule({
    declarations: [
        AppComponent,
        DialogComponent,
        PageNotFoundComponent,
        DashboardComponent,
        ErrorComponent,
        SuccessComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        AngularMaterialModule,

        //NGRX
        StoreModule.forRoot({})
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
