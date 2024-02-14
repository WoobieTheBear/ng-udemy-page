import { Routes } from '@angular/router';
import { RecipeComponent } from './recipe/recipe.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { recipeRoutes } from './recipe/recipe.routes';

export const routes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'recipes', component: RecipeComponent, children: recipeRoutes },
    { path: 'shopping-list', component: ShoppingListComponent },
];
