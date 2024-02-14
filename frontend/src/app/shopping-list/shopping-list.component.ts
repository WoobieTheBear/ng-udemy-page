import { Component, OnInit } from '@angular/core';
import { ShoppingListAddComponent } from './shopping-list-add.component';
import { Ingredient } from '../models/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [
    SharedModule,
    ShoppingListAddComponent
  ],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit {
  listItemSelected: Ingredient = {} as Ingredient;
  ingredients: Ingredient[] = []

  constructor(private listService: ShoppingListService){}

  onSelectItem(item: Ingredient){
    this.listItemSelected = item;
  }
  onCleared(){
    this.listItemSelected = {} as Ingredient;
  }

  ngOnInit(): void {
      this.ingredients = this.listService.readAll();
  }
}
