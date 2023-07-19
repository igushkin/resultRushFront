import {Component, OnInit} from '@angular/core';
import {Goal} from "../../../model/Goal";
import {ActivatedRoute} from "@angular/router";
import {Milestone} from "../../../model/Milestone";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../dialog/confirm-dialog/confirm-dialog.component";
import {
  MilestoneEditDialogComponent
} from "../../../dialog/edit-dialog/milestone-edit-dialog/milestone-edit-dialog.component";
import {ServiceWrapper} from "../../../service/ServiceWrapper";

@Component({
  selector: 'app-goal-page',
  templateUrl: './goal-page.component.html',
  styleUrls: ['./goal-page.component.css']
})
export class GoalPageComponent implements OnInit {

  goal?: Goal;
  milestones: Milestone[];
  milestoneDialog?: MilestoneEditDialogComponent;
  tmpDescription?: string;
  descriptionPlceholder: string = "Writing down your goals helps you to clarify exactly what you want to achieve, which helps guide your daily actions towards goal achievement. Written down goals are more powerful than goals you keep in your mind 🙌🏻.";

  constructor(private serviceWrapper: ServiceWrapper, private route: ActivatedRoute, private dialog: MatDialog) {
    this.milestones = [];
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
}
