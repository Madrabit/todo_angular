import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataHandlerService} from '../../service/data-handler.service';
import {Category} from '../../model/Category';
import {EditTaskDialogComponent} from '../../dialog/edit-task-dialog/edit-task-dialog.component';
import {Task} from '../../model/Task';
import {EditCategoryDialogComponent} from '../../dialog/edit-category-dialog/edit-category-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {OperType} from '../../dialog/OperType';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  @Input()
  categories: Category[];

  // выбрали категорию из списка
  @Output()
  selectCategory = new EventEmitter<Category>();

  @Output()
  deleteCategory = new EventEmitter<Category>();

  @Output()
  updateCategory = new EventEmitter<Category>();

  @Input()
  selectedCategory: Category;
  indexMouseMove: number;

  @Output()
  addCategory = new EventEmitter<string>();

  constructor(private dataHandlerService: DataHandlerService,
              private dialog: MatDialog) {
  }

  // метод вызывается автоматически после инициализации компонента
  ngOnInit() {
    // this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
  }


  showTasksByCategory(category: Category) {

    // если не изменилось значение, ничего не делать (чтобы лишний раз не делать запрос данных)
    if (this.selectedCategory === category) {
      return;
    }

    this.selectedCategory = category; // сохраняем выбранную категорию

    // вызываем внешний обработчик и передаем туда выбранную категорию
    this.selectCategory.emit(this.selectedCategory);
  }

  showEditIcon(index: number) {
    this.indexMouseMove = index;

  }

  openEditDialog(category: Category) {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent,
      {
        data: ['Редактирование категории', category.title, OperType.EDIT],
        autoFocus: false
      });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        this.deleteCategory.emit(category);
        return;
      }
      if (typeof (result) === 'string') { // нажали сохранить
        category.title = result as string;

        this.updateCategory.emit(category); // вызываем внешний обработчик
        return;
      }

    });
  }

  openAddCategoryDialog() {
    // то же самое, что и при редактировании, но только передаем пустой объект Task

    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {data: ['Добавление категори', '', OperType.EDIT]});

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // если нажали ОК и есть результат
        this.addCategory.emit(result as string);
      }
    });

  }
}
