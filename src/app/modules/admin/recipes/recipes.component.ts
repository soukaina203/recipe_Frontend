import { UowService } from './../../../services/uow.service';
import { CommonModule } from '@angular/common';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';
import { Observable, Subject, takeUntil } from 'rxjs';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { User } from 'app/models/User';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from 'app/services/user.service';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatModule } from 'app/mat.module';
import { Recipe } from 'app/models/Recipe';
@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule,
    MatPaginatorModule,
    MatModule,
    MatMenuModule, MatDividerModule, NgApexchartsModule,
    MatTableModule, MatSortModule, NgClass,
    RouterModule,
    FormsModule,
    MatProgressBarModule, CurrencyPipe, DatePipe],
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent {
    @ViewChild('recentTransactionsTable', { read: MatSort })
    recentTransactionsTableMatSort: MatSort;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    count = 0;
    paginatorEvent = new Subject<PageEvent>(/*{ pageIndex: 0, pageSize: 5, length: 0 }*/);
    list: User[] = [];
    isSearchBarOpened: boolean = false
    data: any;
    accountBalanceOptions: ApexOptions;
    recentTransactionsDataSource: MatTableDataSource<any> = new MatTableDataSource();
    recentTransactionsTableColumns: string[] = ['id', 'name', 'email',
        'role', 'actions'];

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    permanentData:MatTableDataSource<any> = new MatTableDataSource();

    myForm: FormGroup;
    //===================
    nom: string = ''
    prenom: string = ''
    email: string = ''
    idRole: number = 0
    searchValue: string = '';

    recipes$: Observable<Recipe[]>;

    constructor(private uow: UowService,
        private fb: FormBuilder
    ) {
    }
    openSearchBar() {
        if(this.isSearchBarOpened){
            this.isSearchBarOpened = false
            this.ngOnInit()
        }else(
            this.isSearchBarOpened = true
        )

    }
    delete(id) {
        console.log(id)
        this.uow.recipes.delete(id).subscribe((e) => {
            console.log(e)
            e ?
                this.ngOnInit() : console.error("Error while deleting ")
        })
    }

    choosenRole(id: number) {
        this.idRole = id
    }

    search() {
        // Implement your search logic here
        if (this.searchValue === "") {
            this.recentTransactionsDataSource.data = this.permanentData.data
        } else {
            this.recentTransactionsDataSource.data = this.recentTransactionsDataSource.data.filter(recipe =>
                recipe.title.toLowerCase().includes(this.searchValue.toLowerCase()) ||
                recipe.category?.nom.toLowerCase().includes(this.searchValue.toLowerCase()) ||
                recipe.user?.nom.toLowerCase().includes(this.searchValue.toLowerCase()) ||
                recipe.user?.prenom.toLowerCase().includes(this.searchValue.toLowerCase())
            );



        }
    }






    ngOnInit(): void {
        this.recipes$ = this.uow.recipes.getAll();
        this.recipes$.subscribe((data: Recipe[]) => {
            console.log(data)
            this.recentTransactionsDataSource.data = data; // expects an array of data not an observable
            this.recentTransactionsDataSource.paginator = this.paginator;
            this.permanentData.data=data
        });


    }

    /**
     * After view init
     */
    ngAfterViewInit(): void {
        // Make the data source sortable
        this.recentTransactionsDataSource.sort = this.recentTransactionsTableMatSort;
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    submit() {
        console.log(this.email)
        if (this.email === '') {
            this.email = '*'
        }

        if (this.prenom === '') {
            this.prenom = '*'
        }
        if (this.nom === '') {
            this.nom = '*'
        }



        // this.uow.recipes.searchUsers(this.nom, this.prenom, this.email, this.idRole).subscribe((res: any) => {
        //     this.recentTransactionsDataSource.data = res.query.result
        // })
    }
}
