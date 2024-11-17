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
import { Tool } from '../../../../../../types/tools';
import { HttpService } from '../../../../../core/services/http.service';
import { ToastService } from '../../../../../core/services/toast.service';
import { MDModalModule } from '../../../../../shared/components/modals';
import { PageTitleComponent } from '../../../../../shared/components/page-title/page-title.component';
import { NGXPagination } from '../../../../../shared/components/pagination';
import { ToolCreateModalComponent } from '../../components/tool-create-modal/tool-create-modal.component';
import { ToolEditModalComponent } from '../../components/tool-edit-modal/tool-edit-modal.component';

@Component({
  selector: 'app-tool-index',
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
    ToolCreateModalComponent,
    ToolEditModalComponent,
  ],
  templateUrl: './tool-index.component.html',
  styleUrl: './tool-index.component.scss',
})
export class ToolIndexComponent implements OnInit, OnDestroy {
  private _unsubscribeAll$: Subject<void> = new Subject<void>();
  private _toolSearchListener$: Subject<string> = new Subject();

  @ViewChild('toolTable', { static: true }) toolTable: DatatableComponent | undefined;

  isDeletingTool: boolean = false;
  toolToEdit: Tool | null = null;
  toolToDelete: Tool | null = null;

  isLoadingTools: boolean = false;
  tools: Tool[] = [];
  toolStatus: string = '';
  toolSearch: string = '';
  toolSortBy: string = 'created_at';
  toolSortOrder: string = 'desc';
  toolPagination: Pagination = {
    size: 10,
    totalItems: 0,
    totalPages: 0,
    page: 1,
  };

  columns: TableColumn[] = [
    { name: 'name', prop: 'name', width: 200, resizeable: true },
    { name: 'slug', prop: 'slug', width: 150, resizeable: true },
    { name: 'image', prop: 'image', width: 100, resizeable: true, sortable: false },
    { name: 'options', prop: 'actions', width: 150, resizeable: true, sortable: false },
  ];

  constructor(
    private _httpService: HttpService,
    private _toastService: ToastService,
    private _translateService: TranslateService
  ) {}

  ngOnInit() {
    this.getTools();
    this._toolSearchListener$.pipe(debounceTime(500), takeUntil(this._unsubscribeAll$)).subscribe((search) => {
      this.toolSearch = search;
      this.getTools();
    });
  }

  ngOnDestroy() {
    this._unsubscribeAll$.next();
    this._unsubscribeAll$.complete();
  }

  getTools() {
    this.isLoadingTools = true;
    this._httpService
      .get('admin-panel/tools', {
        params: {
          size: this.toolPagination.size,
          page: this.toolPagination.page,
          search: this.toolSearch ?? '',
          is_active: this.toolStatus ?? '',
          sort: this.toolSortBy,
          order: this.toolSortOrder,
        },
      })
      .subscribe({
        next: (res: any) => {
          this.tools = res.data.data;
          this.toolPagination.totalItems = res.data.total;
          this.toolPagination.page = res.data.current_page;
          this.toolPagination.totalPages = res.data.last_page;
        },
        error: (error: HttpFormattedErrorResponse) => {
          if (error.status !== 401) {
            this._toastService.error(error.message, this._translateService.instant('failed'));
          }
        },
      })
      .add(() => {
        this.isLoadingTools = false;
      });
  }

  setToolToEdit(tool: Tool) {
    this.toolToEdit = tool;
  }

  setToolToDelete(tool: Tool) {
    this.toolToDelete = tool;
  }

  deleteTool() {
    if (this.isDeletingTool || !this.toolToDelete) {
      return;
    }

    this.isDeletingTool = true;
    this._httpService
      .delete(`admin-panel/tools/${this.toolToDelete?.id}`)
      .subscribe({
        next: (res: any) => {
          this._toastService.success(res.message, this._translateService.instant('success'));
          this.toolPagination.page = 1;
          this.getTools();
        },
        error: (error: HttpFormattedErrorResponse) => {
          if (error.status !== 401) {
            this._toastService.error(error.message, this._translateService.instant('failed'));
          }
        },
      })
      .add(() => {
        this.isDeletingTool = false;
      });
  }

  onPageNumberChange(pageNumber: any): void {
    this.toolPagination.page = pageNumber;
    this.getTools();
  }

  onSearchTool(search: string) {
    this.toolPagination.page = 1;
    this._toolSearchListener$.next(search);
  }

  onStatusChange(status: string) {
    this.toolPagination.page = 1;
    this.toolStatus = status;
    this.getTools();
  }

  onSort(event: any) {
    const sort = event.sorts ? event.sorts[0] : null;

    if (sort) {
      this.toolSortBy = sort.prop;
      this.toolSortOrder = sort.dir;
    } else {
      this.toolSortBy = '';
      this.toolSortOrder = 'asc';
    }

    this.getTools();
  }

  refreshTools() {
    this.toolPagination.page = 1;
    this.getTools();
  }
}
