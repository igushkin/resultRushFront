import {Component} from '@angular/core';
import {DataHandlerService} from "./service/data-handler.service";
import {Goal} from "./model/Goal";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ResultRushFrontEnd';
  goals: Goal[] = [];

  constructor(private dataHandler: DataHandlerService) {
    this.dataHandler.getAllGoals().subscribe(goals => this.goals = goals);
  }
}
