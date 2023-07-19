import {Goal} from "./Goal";

export class Milestone {
  id: number;
  title: string;
  deadline?: Date;
  isCompleted: boolean;
  goal: Goal;
  goalId?: number;

  constructor(id: number, title: string, isCompleted: boolean, goal: Goal) {
    this.id = id;
    this.title = title;
    this.isCompleted = isCompleted;
    this.goal = goal;
  }
}
