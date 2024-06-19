import { Routes } from '@angular/router';
import { ExampleComponent } from 'app/modules/admin/example.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { RecipesComponent } from './recipes/recipes.component';
import { EditRecipeComponent } from './recipes/edit-recipe/edit-recipe.component';
import { CreateRecipeComponent } from './recipes/create-recipe/create-recipe.component';
import { CategoriesComponent } from './categories/categories.component';
import { EditCatrgoryComponent } from './categories/edit-catrgory/edit-catrgory.component';
import { CreateCatrgoryComponent } from './categories/create-catrgory/create-catrgory.component';

export default [
    {
        path     : '',
        component: ExampleComponent,
    },
    {
        path     : 'profile',
        component: ProfileComponent,
    },


    {
        path     : 'users',
        component: UsersComponent,
    },
    {
        path     : 'user/create',
        component: CreateUserComponent,
    },
    {
        path     : 'user/:id',
        component: EditUserComponent,
    },


    {
        path     : 'recipes',
        component: RecipesComponent,
    },
    {
        path     : 'recipe/create',
        component: CreateRecipeComponent,
    },
    {
        path     : 'recipe/:id',
        component: EditRecipeComponent,
    },


    {
        path     : 'categories',
        component: CategoriesComponent,
    },
    {
        path     : 'category/create',
        component: CreateCatrgoryComponent,
    },
    {
        path     : 'category/:id',
        component: EditCatrgoryComponent,
    },



] as Routes;
