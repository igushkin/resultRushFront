import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DataHandlerService} from "./service/data-handler.service";
import {Goal} from "./model/Goal";
import {Category} from "./model/Category";
import {CategoryStat} from "./model/CategoryStat";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class AppComponent {

}
/*export class AppComponent {
  title = 'ResultRushFrontEnd';
  goals: Goal[] = [];
  categories: Category[] = [];
  stat: Map<number, CategoryStat> = new Map<number, CategoryStat>();

  constructor(private dataHandler: DataHandlerService) {
    this.dataHandler.getAllGoals().subscribe(goals => this.goals = goals);
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
    this.dataHandler.getCategoriesStat().subscribe(stat => this.stat = stat);
  }

  // добавление задачи
  onAddGoal(goal: Goal) {
    this.dataHandler.addGoal(goal).subscribe(goal => this.updateGoalsAndStat());
  }

  onDeleteGoal(goal: Goal) {
    this.dataHandler.deleteGoal(goal.id).subscribe(goal => this.updateGoalsAndStat());
  }

  onUpdateCategory(category: Category) {
    this.dataHandler.updateCategory(category).subscribe(ca => {
      this.updateCategories();
      this.updateGoals();
    });
  }

  onDeleteCategory(category: Category) {
    this.dataHandler.deleteCategory(category).subscribe(ca => {
      this.updateCategories();
      this.updateGoalsAndStat();
    });
  }

  private updateCategories(): void {
    this.dataHandler.getAllCategories().subscribe(x => {
      this.categories = [...x];
    });
  }

  private updateGoalsAndStat(): void {
    this.updateGoals(); // обновить список задач
    // обновить переменные для статистики
    this.updateStat();
  }

  private updateGoals(): void {
    /!*    this.dataHandler.searchTasks(
          this.selectedCategory,
          this.searchTaskText,
          this.statusFilter,
          this.priorityFilter
        ).subscribe((tasks: Task[]) => {
          this.tasks = tasks;
        });*!/
    this.dataHandler.getAllGoals().subscribe(goals => {
      this.goals = [...goals];
    });
    console.log(this.goals);
  }

  // обновить статистику
  private updateStat(): void {
    this.dataHandler.getCategoriesStat().subscribe(stat => this.stat = stat);
  }
}*/
