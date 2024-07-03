import { Recipe } from "./Recipe"
import { User } from "./User"

export class commentaire{
    id:number
    content:string
    createdAt:Date
    idUser:number
    idRecipe:number
    user:User;
    recipe:Recipe
}
