import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ComponentsModule} from "./components/components.module";
import {RouterModule} from "@angular/router";
import {AdminLayoutModule} from "./layouts/admin-layout/admin-layout.module";
import { ConnexionComponent } from './connexion/connexion.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import {JwtInterceptor} from "./helper/jwt.interceptor";
import {ErrorInterceptor} from "./helper/error.interceptor";
import {MaterialModule} from "./material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AddEmployeComponent } from './employe/add-employe/add-employe.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { AddManagerComponent } from './manager/add-manager/add-manager.component';
import { UpdateManagerComponent } from './manager/update-manager/update-manager.component';
import { ListAdminComponent } from './admin/list-admin/list-admin.component';
import { AddAdminComponent } from './admin/add-admin/add-admin.component';
import { UpdateAdminComponent } from './admin/update-admin/update-admin.component';
import { ListManagerComponent } from './manager/list-manager/list-manager.component';


@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    AddEmployeComponent,
    AddManagerComponent,
    UpdateManagerComponent,
    ListAdminComponent,
    AddAdminComponent,
    UpdateAdminComponent,
    ListManagerComponent

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        ComponentsModule,
        RouterModule,
        AdminLayoutModule,
        HttpClientModule,
        MaterialModule,
        MatCheckboxModule
    ],
  providers: [{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
