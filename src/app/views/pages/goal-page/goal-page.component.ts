import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Goal} from "../../../model/Goal";
import {ActivatedRoute} from "@angular/router";
import {Milestone} from "../../../model/Milestone";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../dialog/confirm-dialog/confirm-dialog.component";
import {
  MilestoneEditDialogComponent
} from "../../../dialog/edit-dialog/milestone-edit-dialog/milestone-edit-dialog.component";
import {ServiceWrapper} from "../../../service/ServiceWrapper";
import {Circle} from "progressbar.js";
import {DrawingOptions} from "../../../model/DrawingOptions";
import {SessionStorageService} from "../../../service/impl/session-storage.service";
import {Category} from "../../../model/Category";
import {Priority} from "../../../model/Priority";


@Component({
  selector: 'app-goal-page',
  templateUrl: './goal-page.component.html',
  styleUrls: ['./goal-page.component.css']
})
export class GoalPageComponent implements OnInit, AfterViewInit {
  // @ts-ignore
  @ViewChild('myname', {static: false}) input: ElementRef<HTMLDivElement>;

  goal?: Goal;
  milestones: Milestone[];
  milestoneDialog?: MilestoneEditDialogComponent;
  tmpDescription?: string;
  descriptionPlceholder: string = "Writing down your goals helps you to clarify exactly what you want to achieve, which helps guide your daily actions towards goal achievement. Written down goals are more powerful than goals you keep in your mind 🙌🏻.";
  opened: boolean;
  goals: Goal[] = [];
  categories: Category[] = [];
  priorities: Priority[] = [];

  constructor(private serviceWrapper: ServiceWrapper, private route: ActivatedRoute, private dialog: MatDialog, private sessionStorageService: SessionStorageService) {
    this.milestones = [];
    this.opened = sessionStorageService.sidebarOpened;
    this.fullReload();
  }

  ngOnInit(): void {
    let idParam = this.route.snapshot.paramMap.get('id');

    if (!idParam) {
      return;
    }

    let id = Number.parseInt(idParam);

    this.serviceWrapper.goalService.findById(id).subscribe(goal => {
      this.goal = goal;
      this.tmpDescription = this.goal?.description;
      this.updateGoalStat();
      this.drawProgressCircle();
    });
    this.serviceWrapper.milestoneService.getMilestonesByGoalId(id).subscribe(milestones => this.milestones = milestones);
  }

  public openEditDialog(milestone: Milestone): void {

    const dialogRef = this.dialog.open(MilestoneEditDialogComponent, {
      data: [milestone, 'Edit milestone'],
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result as Milestone) {
        this.serviceWrapper.milestoneService.update(result).subscribe(milestone => {
          // @ts-ignore
          this.serviceWrapper.milestoneService.getMilestonesByGoalId(this.goal.id).subscribe(milestones => {
            this.milestones = milestones;
          });
          // @ts-ignore
          this.serviceWrapper.goalService.findById(this.goal.id).subscribe(goal => {
            this.goal = goal;
            this.updateGoalStat();
          });
        });
      }
    });
  }


  openAddDialog(): void {

    if (!this.goal) {
      return;
    }

    let newMilestone = new Milestone(0, '', false, this.goal);
    newMilestone.goalId = newMilestone.goal.id;

    const dialogRef = this.dialog.open(MilestoneEditDialogComponent, {
      data: [newMilestone, 'New milestone'],
      width: '500px',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.serviceWrapper.milestoneService.add(result).subscribe(milestone => {
          // @ts-ignore
          this.serviceWrapper.milestoneService.getMilestonesByGoalId(this.goal.id).subscribe(milestones => {
            this.milestones = milestones;
          });
          // @ts-ignore
          this.serviceWrapper.goalService.findById(this.goal.id).subscribe(goal => {
            this.goal = goal;
            this.updateGoalStat();
          });
        });
      }
    });

  }

  openDeleteDialog(milestone: Milestone) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить milestone: "${milestone.title}"?`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.serviceWrapper.milestoneService.delete(milestone.id).subscribe(milestone => {
          // @ts-ignore
          this.serviceWrapper.milestoneService.getMilestonesByGoalId(this.goal.id)
            .subscribe(milestones => this.milestones = milestones);
          // @ts-ignore
          this.serviceWrapper.goalService.findById(this.goal.id)
            .subscribe(goal => this.goal = goal);
          this.updateGoalStat();
        })
      }
    });
  }

  updateDescription() {
    if (!this.tmpDescription) {
      this.tmpDescription = "";
    }
    if (!this.goal) {
      return;
    }

    this.goal.description = this.tmpDescription;
    this.serviceWrapper.goalService.update(this.goal).subscribe(goal => this.goal = goal);
  }

  getTotalGoals(): number {
    if (!this.goal) {
      return 0;
    }
    // @ts-ignore
    var total = this.goal.completedMilestones + this.goal.uncompletedMilestones;
    return total;
  }

  getCompletedGoals(): number {
    if (!this.goal) {
      return 0;
    }

    return this.goal.completedMilestones ? this.goal.completedMilestones : 0;
  }

  circle?: any;
  counter: number = 0;

  updateGoalStat() {
    if (this.counter == 0) {
      this.counter++;
      return;
    }
    this.drawProgressCircle();
  }

  ngAfterViewInit(): void {

  }

  private drawProgressCircle() {
    let opt = new DrawingOptions();
    opt.color = '#4c6ef8';
    opt.strokeWidth = 5;
    opt.trailWidth = 1;
    opt.easing = 'easeInOut';
    opt.duration = 1400;
    opt.text = {autoStyleContainer: false};
    if (!this.circle) {
      this.circle = new Circle(this.input.nativeElement, opt);
    }

    this.circle.setText(this.getTotalGoals() == 0 ? "0%" : (this.getCompletedGoals() * 100 / this.getTotalGoals()) + "%");
    this.circle.animate(this.getTotalGoals() == 0 ? 0 : (this.getCompletedGoals() / this.getTotalGoals()));
  }

  changeSidebarStatus($event: boolean) {
    this.opened = $event;
    this.sessionStorageService.sidebarOpened = $event;
  }


  onAddCategory(category: Category) {
    this.serviceWrapper.categoryService.add(category).subscribe(category => {
      this.fullReload();
    })
  }

  onUpdateCategory(category: Category) {
    this.serviceWrapper.categoryService.update(category).subscribe(category => {
      this.fullReload();
    });
  }

  onDeleteCategory(category: Category) {
    this.serviceWrapper.categoryService.delete(category.id).subscribe(category => {
      this.fullReload();
    });
  }


  onAddPriority(priority: Priority) {
    this.serviceWrapper.priorityService.add(priority).subscribe(priority => {
      this.fullReload();
    })
  }

  onUpdatePriority(priority: Priority) {
    this.serviceWrapper.priorityService.update(priority).subscribe(priority => {
      this.fullReload();
    });
  }

  onDeletePriority(priority: Priority) {
    this.serviceWrapper.priorityService.delete(priority.id).subscribe(priority => {
      this.fullReload();
    });
  }

  private fullReload() {
    this.reloadPriorities();
    this.reloadGoals();
    this.reloadCategories();
    this.reloadGoal();

  }

  private reloadPriorities(): void {
    this.serviceWrapper.priorityService.findAll().subscribe(priorities => {
      this.priorities = priorities;
    });
  }

  private reloadCategories(): void {
    this.serviceWrapper.categoryService.findAll().subscribe(categories => {
      this.categories = [...categories];
    });
  }

  private reloadGoal() {
    if (!this.goal) {
      return;
    }
    this.serviceWrapper.goalService.findById(this.goal?.id).subscribe(goal => {
      this.goal = goal;
    })
  }

  private reloadGoals(): void {
    this.serviceWrapper.goalService.findAll().subscribe(goals => {
      this.goals = [...goals];
    });
  }
}
