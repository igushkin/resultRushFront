import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import 'simplebar';

import {AppComponent} from './app.component';
import { SidebarComponent } from './views/sidebar/sidebar.component';
import { GoalsComponent } from './views/goals/goals.component';
import { CategoriesComponent } from './views/categories/categories.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    GoalsComponent,
    CategoriesComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
