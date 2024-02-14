import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'recipes', 
        loadComponent: () => import('./recipe/recipe.component').then(mod => mod.RecipeComponent),
        loadChildren: () => import('./recipe/recipe.routes').then(mod => mod.recipeRoutes) },
    { path: 'shopping-list', 
        loadComponent: () => import('./shopping-list/shopping-list.component').then(mod => mod.ShoppingListComponent) },
];
