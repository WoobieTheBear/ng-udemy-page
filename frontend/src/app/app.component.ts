import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header.component';
import { RecipeComponent } from './recipe/recipe.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ToggleDirective } from './toggle.directive';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipeService } from './recipe/recipe.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    RecipeComponent,
    ShoppingListComponent,
    ToggleDirective,
  ],
  providers: [
    ShoppingListService,
    RecipeService,
    HttpClient,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Course Page';
}
