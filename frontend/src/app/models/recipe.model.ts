import { Ingredient } from "./ingredient.model";

export class Recipe {
    constructor(
        public _id: string,
        public name: string, 
        public description: string, 
        public imgPath: string,
        public ingredients: Ingredient[]
    ) { }
}