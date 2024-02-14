import { Component, Input } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../recipe.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  standalone: true,
  imports: [ 
    RouterModule,
    CommonModule
  ],
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent {
  @Input() itemRecipe: Recipe = {} as Recipe;
  @Input() recipeId: number = 0;

  constructor(private recipeService: RecipeService){}

}
