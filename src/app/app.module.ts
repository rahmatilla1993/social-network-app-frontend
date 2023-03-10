import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./material-module";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AUTH_INTERCEPTOR} from "./helper/auth-interceptor.service";
import {ERROR_INTERCEPTOR} from "./helper/error-interceptor.service";
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import {AppRoutingModule} from "./app-routing.module";
import { NavigationComponent } from './layout/navigation/navigation.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import { IndexComponent } from './layout/index/index.component';
import { ProfileComponent } from './user/profile/profile.component';
import { UserPostsComponent } from './user/user-posts/user-posts.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { AddPostComponent } from './user/add-post/add-post.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavigationComponent,
    IndexComponent,
    ProfileComponent,
    UserPostsComponent,
    EditUserComponent,
    AddPostComponent,
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MaterialModule,
        HttpClientModule,
        FormsModule,
        AppRoutingModule,
        MatTooltipModule
    ],
  providers: [AUTH_INTERCEPTOR, ERROR_INTERCEPTOR],
  bootstrap: [AppComponent]
})
export class AppModule { }
