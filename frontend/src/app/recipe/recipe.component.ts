import { Component } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [
    SharedModule,
    RouterOutlet,
    RouterModule,
    RecipeListComponent,
    RecipeDetailsComponent,
  ],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export class RecipeComponent {
  selectedRecipe: Recipe = {} as Recipe;
}
