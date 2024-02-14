import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "../models/recipe.model";
import { ApiService } from "../services/api.service";

@Injectable({
    providedIn: 'root',
})
export class RecipeService {
    private recipeList: Recipe[] = [];
    updated: EventEmitter<Recipe[]> = new EventEmitter<Recipe[]>();

    constructor(private api: ApiService) { }

    readAll(): Recipe[] {
        return this.recipeList;
    }
    byId(id: number): Recipe {
        return this.recipeList[id];
    }
    deleteById(id: string): void {
        console.log('deleteById()', id)
        this.api.deleteData(id).subscribe({
            next: data => {
                console.log('loadData()', data);
                this.recipeList = <Recipe[]>data;
                this.updated.emit(this.recipeList);
            },
            error: err => console.error('onSend()', err),
        });
    }
    addOne(recipe: Recipe) {
        this.recipeList.push(recipe);
    }
    updateOne(original: Recipe, updated: Recipe) {
        this.recipeList[this.recipeList.indexOf(original)] = updated;
    }
    persistData() {
        this.api.sendData(this.recipeList).subscribe({
            next: data => {
                console.log('persistData()', data);
                this.recipeList = <Recipe[]>data;
                this.updated.emit(this.recipeList);
            },
            error: err => console.error('onSend()', err),
        });
    }
    loadData(){
        this.api.getData().subscribe({
            next: data => {
                console.log('loadData()', data);
                this.recipeList = <Recipe[]>data;
                this.updated.emit(this.recipeList);
                /*
                this.recipeList.splice(0, this.recipeList.length);
                for( const item of data){
                    const recipe = <Recipe>item;
                    this.recipeList.push(recipe);
                }
                */
            },
            error: err => console.error('onSend()', err),
        });
    }
}