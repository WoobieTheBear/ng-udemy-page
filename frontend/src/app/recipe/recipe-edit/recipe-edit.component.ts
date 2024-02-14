import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  private recipeIndex: number = -1;
  private recipeSub: Subscription = {} as Subscription;
  private addMode: boolean = true;
  private editRecipe: Recipe = {} as Recipe;
  recipeForm: FormGroup = {} as FormGroup;

  constructor(
    private recipeService: RecipeService,
    private builder: FormBuilder,
    private router: Router,
    private active: ActivatedRoute,
  ) { }

  getIngredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }
  onAddIngredient(name: string, amount: string): void {
    (<FormArray>this.recipeForm.get('ingredients'))
      .push(
        this.builder.group({
          'name': [name, Validators.required],
          'amount': [amount, [
            Validators.required,
            Validators.pattern('[0-9]+')
          ]]
        })
      )
  }
  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }
  onSubmit(): void {
    const { value } = this.recipeForm;
    const updateItem = value;
    if (this.addMode) {
      this.recipeService.addOne(updateItem)
    } else {
      this.recipeService.updateOne(this.editRecipe, updateItem);
    }
    this.recipeService.persistData();
    this.recipeForm.reset();
    this.goBack();
  }
  onCancel(): void {
    this.recipeForm.reset();
    this.goBack();
  }
  goBack(): void {
    this.router.navigate(['/', 'recipes'], { relativeTo: this.active })
  }

  ngOnInit(): void {
    this.recipeSub = this.active.params.subscribe(
      (params: Params) => {
        if (params.hasOwnProperty('id')) {
          this.addMode = false;
          this.recipeIndex = +params['id'];
          this.editRecipe = this.recipeService.byId(this.recipeIndex);
        } else {
          this.addMode = true;
          this.recipeIndex = -1;
          this.editRecipe = new Recipe('', '', '', '', []);
        }
      }
    )
    this.recipeForm = this.builder.group({
      'name': [this.editRecipe.name, Validators.required],
      'imgPath': [this.editRecipe.imgPath, Validators.required],
      'description': [this.editRecipe.description, Validators.required],
      'ingredients': this.builder.array(this.editRecipe.ingredients.map(
        ingredient => {
          return this.builder.group(
            {
              'name': [ingredient.name, Validators.required],
              'amount': [ingredient.amount, Validators.required],
            }
          )
        }
      ))
    })
  }
  ngOnDestroy(): void {
    this.recipeSub.unsubscribe();
  }
}
