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
import {CategoryStat} from "../../../model/CategoryStat";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})

export class CategoriesComponent implements OnInit, AfterViewInit {
  categories: Category[];
  mainColor: string = "#4c6ef8";
  commonCategoryStat: CategoryStat = new CategoryStat(0, 0, 0);

  //@ts-ignore
  @ViewChildren('barfiller') categoryDivs: QueryList<ElementRef<HTMLDivElement>>;

  @Input('stat')
  set setStat(commonCategoryStat: CategoryStat) {
    this.commonCategoryStat = commonCategoryStat;
  }

  @Input('categories')
  set setCategories(categories: Category[]) {

    // @ts-ignore
    let commonCategory = new Category(0, "All", "#4c6ef8", this.commonCategoryStat.completedGoals, this.commonCategoryStat.uncompletedGoals, this.commonCategoryStat.totalGoals);
    this.categories = [commonCategory, ...categories];
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
    this.categoryDivs.changes.subscribe(c => {
      //@ts-ignore
      c.toArray().forEach(item => {
        let div = item as HTMLDivElement;
        this.drawProgressLine(item as ElementRef<HTMLDivElement>);
      })
    });
  }


  private drawProgressLine(div: ElementRef<HTMLDivElement>) {
    // @ts-ignore
    let categoryId = Number.parseInt(div.nativeElement.getAttribute('data-id'));
    // @ts-ignore
    let completedGoals = Number.parseInt(div.nativeElement.getAttribute("data-completed-goals"));
    // @ts-ignore
    let totalGoals = Number.parseInt(div.nativeElement.getAttribute("data-total-goals"));
    // @ts-ignore
    let color = div.nativeElement.getAttribute("data-color");

    let opt = new DrawingOptions();
    // @ts-ignore
    opt.color = color;
    opt.trailColor = '#f8f9ff';
    opt.strokeWidth = 2;
    opt.trailWidth = 2;
    opt.easing = 'easeInOut';
    opt.duration = 1400;
    opt.text = {autoStyleContainer: false};

    let line = new Line(div.nativeElement, opt);

    let progressPercent = totalGoals == 0 ? 0 : completedGoals / totalGoals;
    line.setText(Math.round(progressPercent * 100) + "%");
    line.animate(progressPercent);
  }
}
