import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import 'simplebar';

import {AppComponent} from './app.component';
import { SidebarComponent } from './views/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
