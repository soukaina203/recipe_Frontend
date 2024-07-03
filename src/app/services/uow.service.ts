import { categories } from './../mock-api/apps/ecommerce/inventory/data';
import { Injectable, inject } from '@angular/core';
import { UserService } from './user.service';
import { RecipeService } from './recipe.service';
import { CategoryService } from './category.service';
import { LikeService } from './like.service';
import { CommentService } from './comment.service';
import { UploadService } from './upload.service';
import { FileUploadService } from './file.upload.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of, tap, take, map } from 'rxjs';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class UowService {
    readonly users= inject(UserService);
    readonly recipes= inject(RecipeService);
    readonly categories= inject(CategoryService);
    readonly likes= inject(LikeService);
    readonly comments= inject(CommentService);
    readonly uploads= inject(UploadService);
    readonly files = inject(FileUploadService);
    readonly auth = inject(AuthService);
    readonly session = inject(SessionService);

  readonly fuseConfirmation = inject(FuseConfirmationService);



    handleError = <T>(e: HttpErrorResponse, source: Observable<T>) => of({ code: -10, message: `${e.status} : ${e.message}` }).pipe(
        tap(_ => console.dir(e)),
        take(1),
        // tap(e => this.snack.open(e.message)),
        map(e => e as T & { code: number, message: string }),
        // switchMap(_ => source),
      );
}
