import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipeItemComponent } from './recipe-item.component';
import { Recipe } from '../../models/recipe.model';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [
    RecipeItemComponent, 
    CommonModule
  ],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipeList: Recipe[] = [];
  updateSub: Subscription = {} as Subscription;

  constructor(
    private recipeService: RecipeService,
    private active: ActivatedRoute,
    private router: Router,
  ) {}

  createRecipe(): void {
    this.router.navigate(['new'], {relativeTo: this.active});
  }

  ngOnInit(): void {
    this.updateSub = this.recipeService.updated.subscribe(
      (recipes: Recipe[]) => this.recipeList = recipes
    )
    this.recipeService.loadData();
  }
  ngOnDestroy(): void {
    this.updateSub.unsubscribe();
  }
}
