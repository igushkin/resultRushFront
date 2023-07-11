import {Category} from "./Category";
import {Priority} from "./Priority";

export class Goal {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  deadline: Date;
  public category: Category;
  priority: Priority;

  constructor(id: number, title: string, description: string, isCompleted: boolean, deadline: Date, category: Category, priority: Priority) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.isCompleted = isCompleted;
    this.deadline = deadline;
    this.category = category;
    this.priority = priority;
  }
}
