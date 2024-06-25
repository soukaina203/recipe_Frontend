import { items } from './../../../../mock-api/apps/file-manager/data';
import { AsyncPipe, CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';
import { FuseMasonryComponent } from '@fuse/components/masonry';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { Category } from 'app/models/Category';
import { Recipe } from 'app/models/Recipe';

import { NotesService } from 'app/modules/user/notes/notes.service';
import { Label, Note } from 'app/modules/user/notes/notes.types';
import { UowService } from 'app/services/uow.service';
import { cloneDeep } from 'lodash-es';
import { BehaviorSubject, combineLatest, distinctUntilChanged, map, Observable, Subject, takeUntil } from 'rxjs';

@Component({
    selector       : 'notes-list',
    templateUrl    : './list.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [MatSidenavModule, CommonModule ,MatRippleModule,RouterLink, NgClass, MatIconModule, NgIf, NgFor, MatButtonModule, MatFormFieldModule, MatInputModule, FuseMasonryComponent, AsyncPipe],
})
export class NotesListComponent implements OnInit, OnDestroy
{
    labels$: Observable<Label[]>;
    notes$: Observable<Note[]>;
    recipes:Recipe[]=[]
    permanentRecipes:Recipe[]=[]
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    filter$: BehaviorSubject<string> = new BehaviorSubject('notes');
    searchQuery$: BehaviorSubject<string> = new BehaviorSubject(null);
    masonryColumns: number = 3;
    categories:Category[]=[]
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _matDialog: MatDialog,
        private _notesService: NotesService,
        private uow:UowService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the filter status
     */
    get filterStatus(): string
    {
        return this.filter$.value;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.uow.categories.getAll().subscribe((res:any)=>{
            this.categories=res.items
        })
        this.uow.recipes.getAll()
        .subscribe((data:any) => {
            // Store the data
            console.log("===============")
            this.recipes = data.items;
            this.permanentRecipes=data.items
            this._changeDetectorRef.markForCheck(); // Trigger change detection if needed



            // Prepare the chart data
        });

    }
    chooseCategory(idCategory){
        this.recipes=this.permanentRecipes
        this.recipes=this.recipes.filter(e=>e.idCategory==idCategory)
    }
    getAllCategories(){
        this.recipes=this.permanentRecipes
    }
    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Add a new note
     */

    /**
     * Filter by archived
     */
    filterByArchived(): void
    {
        this.filter$.next('archived');
    }

    /**
     * Filter by label
     *
     * @param labelId
     */
    filterByLabel(labelId: string): void
    {
        const filterValue = `label:${labelId}`;
        this.filter$.next(filterValue);
    }

    /**
     * Filter by query
     *
     * @param query
     */
    filterByQuery(query: string): void
    {
        this.searchQuery$.next(query);
    }

    /**
     * Reset filter
     */
    resetFilter(): void
    {
        this.filter$.next('notes');
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
}
