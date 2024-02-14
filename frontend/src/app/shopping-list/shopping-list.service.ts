import { Ingredient } from "../models/ingredient.model";

export class ShoppingListService {
    private ingredients: Ingredient[] = [];

    readAll(): Ingredient[] {
        return this.ingredients;
    }
    addAll(ingredients: Ingredient[]){
        Array.prototype.push.apply( this.ingredients, ingredients );
    }
    addOne(ingredient: Ingredient){
        this.ingredients.push(ingredient);
    }
    deleteOne(ingredient: Ingredient): void {
        const id = this.ingredients.indexOf(ingredient)
        this.ingredients.splice(id, 1);
    }
    updateOne(original: Ingredient, updated: Ingredient){
        this.ingredients[this.ingredients.indexOf(original)] = updated;
    }
}