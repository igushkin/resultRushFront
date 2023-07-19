export class CategoryStat {
  totalGoals: number;
  completedGoals: number;
  uncompletedGoals: number;

  constructor(total: number, completed: number, uncompleted: number) {
    this.totalGoals = total;
    this.completedGoals = completed;
    this.uncompletedGoals = uncompleted;
  }
}
