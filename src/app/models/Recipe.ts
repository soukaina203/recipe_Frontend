import { Category } from "./Category"

export class Recipe{
    id:number
    title:string
    description:string
    ingredients:string
    instructions:string
    image:string
    idUser:number
    idCategory:number
    category:Category
}
