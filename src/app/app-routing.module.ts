import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {MainPageComponent} from "./views/pages/main-page/main-page.component";
import {GoalPageComponent} from "./views/pages/goal-page/goal-page.component";
import {LoginPageComponent} from "./views/pages/login-page/login-page.component";

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'goal/:id', component: GoalPageComponent},
  {path: 'login', component: LoginPageComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule {
}
