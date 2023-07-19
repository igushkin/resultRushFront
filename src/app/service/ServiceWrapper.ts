import {Injectable} from '@angular/core';
import {CategoryServiceImpl} from "./impl/CategoryServiceImpl";
import {PriorityServiceImpl} from "./impl/PriorityServiceImpl";
import {MilestoneServiceImpl} from "./impl/MilestoneServiceImpl";
import {GoalServiceImpl} from "./impl/GoalServiceImpl";

@Injectable({
  providedIn: 'root'
})
export class ServiceWrapper {

  constructor(
    public categoryService: CategoryServiceImpl,
    public goalService: GoalServiceImpl,
    public milestoneService: MilestoneServiceImpl,
    public priorityService: PriorityServiceImpl
  ) {
  }
}
