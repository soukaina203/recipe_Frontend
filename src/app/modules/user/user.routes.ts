import { Routes } from "@angular/router";
import { DahboardComponent } from "./dahboard.component";
import { NotesComponent } from "./notes/notes.component";
import { NotesListComponent } from "./notes/list/list.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { ProfileComponent } from "../admin/profile/profile.component";
import { LikedRecipesComponent } from "./liked-recipes/liked-recipes.component";

export default [

    {
        path     : '',
        component: NotesListComponent,
    },


    {
        path     : 'Recipes',
        component: NotesListComponent,
    },

    {
        path     : 'recipe/:component/:id',
        component: RecipeDetailComponent,
    },
    {
        path: 'profile', component: ProfileComponent,

    },
    {
        path: 'likedRecipes', component: LikedRecipesComponent,

    },


] as Routes;
