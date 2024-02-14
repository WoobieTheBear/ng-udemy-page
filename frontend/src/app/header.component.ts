import { Component } from '@angular/core';
import { ToggleDirective } from './toggle.directive';
import { RouterModule } from '@angular/router';
import { RecipeService } from './recipe/recipe.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    ToggleDirective
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private recipeService: RecipeService) {}
  save(){
    this.recipeService.persistData();
  }
  load(){
    this.recipeService.loadData();
  }
}
