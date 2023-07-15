export class CategoryStat {
  total: number;
  completed: number;
  uncompleted: number;

  constructor(total: number, completed: number, uncompleted: number) {
    this.total = total;
    this.completed = completed;
    this.uncompleted = uncompleted;
  }
}
