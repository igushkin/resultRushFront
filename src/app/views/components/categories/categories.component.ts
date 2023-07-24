import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren
} from '@angular/core';
import {Category} from "../../../model/Category";
import {DataHandlerService} from "../../../service/data-handler.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../dialog/confirm-dialog/confirm-dialog.component";
import {
  CategoryEditDialogComponent
} from "../../../dialog/edit-dialog/category-edit-dialog/category-edit-dialog.component";
import {DrawingOptions} from "../../../model/DrawingOptions";
import {Line} from "progressbar.js";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})

export class CategoriesComponent implements OnInit, AfterViewInit {
  categories: Category[];
  mainColor: string = "#4c6ef8";

  //@ts-ignore
  @ViewChildren('barfiller') categoryDivs: QueryList<ElementRef<HTMLDivElement>>;

  @Input('categories')
  set setCategories(categories: Category[]) {
    this.categories = categories;
  }


  @Output()
  updateCategory = new EventEmitter<Category>();
  @Output()
  deleteCategory = new EventEmitter<Category>();

  constructor(public dataHandler: DataHandlerService, private dialog: MatDialog) {
    this.categories = [];
  }

  ngOnInit(): void {

  }


  public openEditCategoryDialog(category: Category): void {

    const dialogRef = this.dialog.open(CategoryEditDialogComponent, {
      data: [category, 'Редактирование задачи'],
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {


      if (result as Category) {
        this.updateCategory.emit(category);
        return;
      }
    });
  }


  public openDeleteDialog(category: Category): void {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить категорию: "${category.title}"?`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.deleteCategory.emit(category);
        return;
      }
    });
  }

  ngAfterViewInit() {
    /*    setTimeout(() => {
            this.drawProgressLines();
          },
          250);*/

    this.categoryDivs.changes.subscribe(c => {
      //@ts-ignore
      c.toArray().forEach(item => {
        let div = item as HTMLDivElement;
        this.drawProgressLine(item as ElementRef<HTMLDivElement>);
      })
    });
  }


  private drawProgressLine(div: ElementRef<HTMLDivElement>) {
    let opt = new DrawingOptions();
    opt.color = '#4c6ef8';
    opt.trailColor = '#f8f9ff';
    opt.strokeWidth = 2;
    opt.trailWidth = 2;
    opt.easing = 'easeInOut';
    opt.duration = 1400;
    opt.text = {autoStyleContainer: false};

    // @ts-ignore
    let categoryId = Number.parseInt(div.nativeElement.getAttribute('data-id'));
    // @ts-ignore
    let completedGoals = Number.parseInt(div.nativeElement.getAttribute("data-completed-goals"));
    // @ts-ignore
    let totalGoals = Number.parseInt(div.nativeElement.getAttribute("data-total-goals"));

    let line = new Line(div.nativeElement, opt);

    line.setText(totalGoals == 0 ? "0%" : (completedGoals * 100 / totalGoals) + "%");
    line.animate(totalGoals == 0 ? 0 : completedGoals / totalGoals);
  }
}
