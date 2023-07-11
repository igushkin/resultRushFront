import {Component, OnInit} from '@angular/core';
import {Category} from "../../model/Category";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})

export class CategoriesComponent implements OnInit {
  categories: Category[];

  constructor() {
    this.categories = [];
  }

  ngOnInit(): void {

  }
}
