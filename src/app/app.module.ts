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
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {EditGoalDialogComponent} from "./dialog/edit-goal-dialog/edit-goal-dialog.component";
import {ConfirmDialogComponent} from "./dialog/confirm-dialog/confirm-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    GoalsComponent,
    CategoriesComponent,
    EditGoalDialogComponent,
    ConfirmDialogComponent
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
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
