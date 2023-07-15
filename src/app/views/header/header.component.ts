import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CategorySettingsComponent} from "../../dialog/category-settings-dialog/category-settings.component";
import {PrioritySettingsComponent} from "../../dialog/priority-settings-dialog/priority-settings.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private dialog: MatDialog) {
  }

  public showCategorySettings() {
    const dialogRef = this.dialog.open(CategorySettingsComponent,
      {
        autoFocus: false,
        width: '600px'
      });
  }

  public showPrioritySettings() {
    const dialogRef = this.dialog.open(PrioritySettingsComponent,
      {
        autoFocus: false,
        width: '600px'
      });
  }
}
