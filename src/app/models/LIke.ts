import { Recipe } from "./Recipe"
import { User } from "./User"

export class Like{
id:number
idUser:number
idRecipe:number
user:User
recipe:Recipe
}
