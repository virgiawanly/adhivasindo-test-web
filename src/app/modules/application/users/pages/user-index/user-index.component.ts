import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DatatableComponent, NgxDatatableModule, TableColumn } from '@siemens/ngx-datatable';
import { LucideAngularModule } from 'lucide-angular';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { HttpFormattedErrorResponse } from '../../../../../../types/http';
import { Pagination } from '../../../../../../types/pagination';
import { User } from '../../../../../../types/users';
import { HttpService } from '../../../../../core/services/http.service';
import { ToastService } from '../../../../../core/services/toast.service';
import { MDModalModule } from '../../../../../shared/components/modals';
import { PageTitleComponent } from '../../../../../shared/components/page-title/page-title.component';
import { NGXPagination } from '../../../../../shared/components/pagination';

@Component({
  selector: 'app-user-index',
  standalone: true,
  imports: [
    PageTitleComponent,
    NgxDatatableModule,
    LucideAngularModule,
    NGXPagination,
    MDModalModule,
    NgSelectModule,
    CommonModule,
    FormsModule,
    TranslateModule,
  ],
  templateUrl: './user-index.component.html',
  styleUrl: './user-index.component.scss',
})
export class UserIndexComponent implements OnInit, OnDestroy {
  private _unsubscribeAll$: Subject<void> = new Subject<void>();
  private _userSearchListener$: Subject<string> = new Subject();

  @ViewChild('userTable', { static: true }) userTable: DatatableComponent | undefined;

  isLoadingUsers: boolean = false;
  users: User[] = [];
  userSearch: string = '';
  userSortBy: string = 'created_at';
  userSortOrder: string = 'desc';
  userPagination: Pagination = {
    size: 10,
    totalItems: 0,
    totalPages: 0,
    page: 1,
  };

  columns: TableColumn[] = [
    { name: 'name', prop: 'name', width: 200, resizeable: true },
    { name: 'email', prop: 'email', width: 150, resizeable: true },
  ];

  constructor(
    private _httpService: HttpService,
    private _toastService: ToastService,
    private _translateService: TranslateService
  ) {}

  ngOnInit() {
    this.getUsers();
    this._userSearchListener$.pipe(debounceTime(500), takeUntil(this._unsubscribeAll$)).subscribe((search) => {
      this.userSearch = search;
      this.getUsers();
    });
  }

  ngOnDestroy() {
    this._unsubscribeAll$.next();
    this._unsubscribeAll$.complete();
  }

  getUsers() {
    this.isLoadingUsers = true;
    this._httpService
      .get('admin-panel/users', {
        params: {
          size: this.userPagination.size,
          page: this.userPagination.page,
          search: this.userSearch ?? '',
          sort: this.userSortBy,
          order: this.userSortOrder,
        },
      })
      .subscribe({
        next: (res: any) => {
          this.users = res.data.data;
          this.userPagination.totalItems = res.data.total;
          this.userPagination.page = res.data.current_page;
          this.userPagination.totalPages = res.data.last_page;
        },
        error: (error: HttpFormattedErrorResponse) => {
          if (error.status !== 401) {
            this._toastService.error(error.message, this._translateService.instant('failed'));
          }
        },
      })
      .add(() => {
        this.isLoadingUsers = false;
      });
  }

  onPageNumberChange(pageNumber: any): void {
    this.userPagination.page = pageNumber;
    this.getUsers();
  }

  onSearchUser(search: string) {
    this.userPagination.page = 1;
    this._userSearchListener$.next(search);
  }

  onSort(event: any) {
    const sort = event.sorts ? event.sorts[0] : null;

    if (sort) {
      this.userSortBy = sort.prop;
      this.userSortOrder = sort.dir;
    } else {
      this.userSortBy = '';
      this.userSortOrder = 'asc';
    }

    this.getUsers();
  }

  refreshUsers() {
    this.userPagination.page = 1;
    this.getUsers();
  }
}
