import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../recipe.service';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css'
})
export class RecipeDetailsComponent implements OnInit, OnDestroy {
  private recipeId: number = 0;
  private recipeSub: Subscription = {} as Subscription;
  detailRecipe: Recipe = {} as Recipe;

  constructor(
    private recipeService: RecipeService, 
    private listService: ShoppingListService,
    private active: ActivatedRoute,
    private router: Router,
  ) {}

  toList(): void {
    this.listService.addAll(this.detailRecipe.ingredients);
  }
  onEdit(): void {
    this.router.navigate(['edit'], {relativeTo: this.active})
  }
  onDelete(): void {
    this.recipeService.deleteById( this.detailRecipe._id );
    this.router.navigate([''], {relativeTo: this.active});
  }

  ngOnInit(): void {
    this.recipeSub = this.active.params.subscribe( 
      params => {
        this.recipeId = +params['id'];
        this.detailRecipe = this.recipeService.byId( this.recipeId );
      }
    )
  }
  ngOnDestroy(): void {
      this.recipeSub.unsubscribe();
  }
}
