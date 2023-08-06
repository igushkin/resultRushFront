import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import 'simplebar';
import 'progressbar.js';

import {AppComponent} from './app.component';
import {SidebarComponent} from './views/components/sidebar/sidebar.component';
import {GoalsComponent} from './views/components/goals/goals.component';
import {CategoriesComponent} from './views/components/categories/categories.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDialogModule} from "@angular/material/dialog";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {GoalEditDialogComponent} from "./dialog/edit-dialog/goal-edit-dialog/goal-edit-dialog.component";
import {ConfirmDialogComponent} from "./dialog/confirm-dialog/confirm-dialog.component";
import {CategorySettingsComponent} from "./dialog/settings-dialog/category-settings-dialog/category-settings.component";
import {CategoryEditDialogComponent} from "./dialog/edit-dialog/category-edit-dialog/category-edit-dialog.component";
import {PrioritySettingsComponent} from "./dialog/settings-dialog/priority-settings-dialog/priority-settings.component";
import {PriorityEditDialogComponent} from "./dialog/edit-dialog/priority-edit-dialog/priority-edit-dialog.component";
import {ColorPickerModule} from "ngx-color-picker";
import {HeaderComponent} from "./views/components/header/header.component";
import {AppRoutingModule} from './app-routing.module';
import {MainPageComponent} from './views/pages/main-page/main-page.component';
import {GoalPageComponent} from './views/pages/goal-page/goal-page.component';
import {LoginPageComponent} from './views/pages/login-page/login-page.component';
import {MilestoneEditDialogComponent} from './dialog/edit-dialog/milestone-edit-dialog/milestone-edit-dialog.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CATEGORY_URL_TOKEN} from "./service/impl/CategoryServiceImpl";
import {PRIORITY_URL_TOKEN} from "./service/impl/PriorityServiceImpl";
import {GOAL_URL_TOKEN} from "./service/impl/GoalServiceImpl";
import {MILESTONE_URL_TOKEN} from "./service/impl/MilestoneServiceImpl";
import {MyHttpInterceptor} from "./interceptor/my-http-interceptor.service";
import {LOGIN_URL_TOKEN, REGISTER_URL_TOKEN, TOKEN_KEY} from "./service/impl/AuthService";
import {FooterComponent} from './views/components/footer/footer.component';
import {MatSidenavModule} from "@angular/material/sidenav";


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    GoalsComponent,
    CategoriesComponent,
    GoalEditDialogComponent,
    ConfirmDialogComponent,
    CategoryEditDialogComponent,
    HeaderComponent,
    CategorySettingsComponent,
    PrioritySettingsComponent,
    PriorityEditDialogComponent,
    MainPageComponent,
    GoalPageComponent,
    MilestoneEditDialogComponent,
    LoginPageComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    ColorPickerModule,
    AppRoutingModule,
    HttpClientModule,
    MatSidenavModule
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {appearance: 'outline'}
    },
    {
      provide: CATEGORY_URL_TOKEN,
      useValue: 'https://resultrushe.azurewebsites.net/categories'
      //useValue: 'http://localhost:8080/categories'
    },
    {
      provide: GOAL_URL_TOKEN,
      useValue: 'https://resultrushe.azurewebsites.net/goals'
      //useValue: 'http://localhost:8080/goals'
    },
    {
      provide: PRIORITY_URL_TOKEN,
      useValue: 'https://resultrushe.azurewebsites.net/priorities'
      //useValue: 'http://localhost:8080/priorities'
    },
    {
      provide: MILESTONE_URL_TOKEN,
      useValue: 'https://resultrushe.azurewebsites.net/milestones'
      //useValue: 'http://localhost:8080/milestones'
    },
    {
      provide: REGISTER_URL_TOKEN,
      useValue: 'https://resultrushe.azurewebsites.net/register'
      //useValue: 'http://localhost:8080/register'
    },
    {
      provide: LOGIN_URL_TOKEN,
      useValue: 'https://resultrushe.azurewebsites.net/login'
      //useValue: 'http://localhost:8080/login'
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: MyHttpInterceptor, multi: true
    },
    {
      provide: TOKEN_KEY,
      useValue: 'tokenKey'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
