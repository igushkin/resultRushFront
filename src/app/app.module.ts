import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import 'simplebar';

import {AppComponent} from './app.component';
import {SidebarComponent} from './views/sidebar/sidebar.component';
import {GoalsComponent} from './views/goals/goals.component';
import {CategoriesComponent} from './views/categories/categories.component';
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
import {GoalDialogComponent} from "./dialog/goal-dialog/goal-dialog.component";
import {ConfirmDialogComponent} from "./dialog/confirm-dialog/confirm-dialog.component";
import {CategorySettingsComponent} from "./dialog/category-settings-dialog/category-settings.component";
import {CategoryEditDialogComponent} from "./dialog/category-edit-dialog/category-edit-dialog.component";
import {PrioritySettingsComponent} from "./dialog/priority-settings-dialog/priority-settings.component";
import {PriorityEditDialogComponent} from "./dialog/priority-edit-dialog/priority-edit-dialog.component";
import {ColorPickerModule} from "ngx-color-picker";
import {HeaderComponent} from "./views/header/header.component";
import { AppRoutingModule } from './app-routing.module';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { GoalPageComponent } from './pages/goal-page/goal-page.component';
import { MilestoneEditDialogComponent } from './dialog/milestone-edit-dialog/milestone-edit-dialog.component';

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    GoalsComponent,
    CategoriesComponent,
    GoalDialogComponent,
    ConfirmDialogComponent,
    CategoryEditDialogComponent,
    HeaderComponent,
    CategorySettingsComponent,
    PrioritySettingsComponent,
    PriorityEditDialogComponent,
    MainPageComponent,
    GoalPageComponent,
    MilestoneEditDialogComponent
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
    AppRoutingModule
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
