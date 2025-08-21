import { AsyncPipe, CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';
import { FuseMasonryComponent } from '@fuse/components/masonry';
import { UowService } from 'app/services/uow.service';
import { environment } from 'environments/environment';
import { combineLatest,  map, merge, shareReplay, startWith, Subject, switchMap } from 'rxjs';

@Component({
    selector: 'notes-list',
    templateUrl: './list.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,

    imports: [MatSidenavModule,
         CommonModule,
         FormsModule,
         MatRippleModule,
         RouterLink,
          MatIconModule,
          MatButtonModule,
          MatFormFieldModule,
          MatInputModule,
           FuseMasonryComponent,
           ReactiveFormsModule,
        ],
})
export class NotesListComponent   {
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    filterStatus = ''
    searchValue: string = '';
    recipePicture=environment.url
    private uow = inject(UowService)

    readonly categories$ = this.uow.categories.getAll()
    // readonly category$ = new Subject<number>()
    readonly category = new FormControl(0)
    readonly search = new FormControl('')
    // readonly search$ = new Subject<string>()
    readonly cache = this.uow.recipes.getAll().pipe(shareReplay(1));



    readonly recipes$ = merge(
        this.category.valueChanges.pipe(startWith('')),
        this.search.valueChanges.pipe(startWith(''))
      ).pipe(
        switchMap(() => this.cache.pipe(
          map(list => {
            const id = Number(this.category.value);
            const searchValue = this.search.value.toLowerCase();
            return list.filter(recipe =>
              (id === 0 || recipe.idCategory === id) &&
              recipe.title.toLowerCase().includes(searchValue)
            );
          })
        ))
      );
}
