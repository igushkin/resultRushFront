export class Category {
  id: number;
  title: string;
  color: string;
  completedGoals: number = 0;
  uncompletedGoals: number = 0;
  totalGoals: number = 0;
  categoryId: number = 0;


  constructor(id: number, title: string, color: string, completedGoals: number, uncompletedGoals: number, totalGoals: number) {
    this.id = id;
    this.title = title;
    this.color = color;
    this.completedGoals = completedGoals;
    this.uncompletedGoals = uncompletedGoals;
    this.totalGoals = totalGoals;
  }
}
