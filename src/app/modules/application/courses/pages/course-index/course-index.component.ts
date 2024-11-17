import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DatatableComponent, NgxDatatableModule, TableColumn } from '@siemens/ngx-datatable';
import { LucideAngularModule } from 'lucide-angular';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { Course } from '../../../../../../types/courses';
import { HttpFormattedErrorResponse } from '../../../../../../types/http';
import { Pagination } from '../../../../../../types/pagination';
import { Tool } from '../../../../../../types/tools';
import { HttpService } from '../../../../../core/services/http.service';
import { ToastService } from '../../../../../core/services/toast.service';
import { MDModalModule } from '../../../../../shared/components/modals';
import { PageTitleComponent } from '../../../../../shared/components/page-title/page-title.component';
import { NGXPagination } from '../../../../../shared/components/pagination';
import { CourseCreateModalComponent } from '../../components/course-create-modal/course-create-modal.component';
import { CourseEditModalComponent } from '../../components/course-edit-modal/course-edit-modal.component';

@Component({
  selector: 'app-course-index',
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
    CourseCreateModalComponent,
    CourseEditModalComponent,
    RouterLink,
  ],
  templateUrl: './course-index.component.html',
  styleUrl: './course-index.component.scss',
})
export class CourseIndexComponent implements OnInit, OnDestroy {
  private _unsubscribeAll$: Subject<void> = new Subject<void>();
  private _courseSearchListener$: Subject<string> = new Subject();

  @ViewChild('courseTable', { static: true }) courseTable: DatatableComponent | undefined;

  isDeletingCourse: boolean = false;
  courseToEdit: Course | null = null;
  courseToDelete: Course | null = null;

  isLoadingCourses: boolean = false;
  courses: Course[] = [];
  courseStatus: string = '';
  courseSearch: string = '';
  courseSortBy: string = 'created_at';
  courseSortOrder: string = 'desc';
  coursePagination: Pagination = {
    size: 10,
    totalItems: 0,
    totalPages: 0,
    page: 1,
  };

  columns: TableColumn[] = [
    { name: 'name', prop: 'name', width: 200, resizeable: true },
    { name: 'slug', prop: 'slug', width: 120, resizeable: true },
    { name: 'image', prop: 'image', width: 80, resizeable: true, sortable: false },
    { name: 'status', prop: 'status', width: 80, resizeable: true, sortable: false },
    { name: 'tools', prop: 'tools', width: 100, resizeable: true, sortable: false },
    { name: 'total competencies', prop: 'competencies', width: 100, resizeable: true, sortable: false },
    { name: 'options', prop: 'actions', width: 150, resizeable: true, sortable: false },
  ];

  constructor(
    private _httpService: HttpService,
    private _toastService: ToastService,
    private _translateService: TranslateService
  ) {}

  ngOnInit() {
    this.getCourses();
    this._courseSearchListener$.pipe(debounceTime(500), takeUntil(this._unsubscribeAll$)).subscribe((search) => {
      this.courseSearch = search;
      this.getCourses();
    });
  }

  ngOnDestroy() {
    this._unsubscribeAll$.next();
    this._unsubscribeAll$.complete();
  }

  getCourses() {
    this.isLoadingCourses = true;
    this._httpService
      .get('admin-panel/courses', {
        params: {
          size: this.coursePagination.size,
          page: this.coursePagination.page,
          search: this.courseSearch ?? '',
          is_active: this.courseStatus ?? '',
          sort: this.courseSortBy,
          order: this.courseSortOrder,
          relations: 'tools,competencies',
        },
      })
      .subscribe({
        next: (res: any) => {
          this.courses = res.data.data;
          this.coursePagination.totalItems = res.data.total;
          this.coursePagination.page = res.data.current_page;
          this.coursePagination.totalPages = res.data.last_page;
        },
        error: (error: HttpFormattedErrorResponse) => {
          if (error.status !== 401) {
            this._toastService.error(error.message, this._translateService.instant('failed'));
          }
        },
      })
      .add(() => {
        this.isLoadingCourses = false;
      });
  }

  setCourseToEdit(course: Course) {
    this.courseToEdit = course;
  }

  setCourseToDelete(course: Course) {
    this.courseToDelete = course;
  }

  deleteCourse() {
    if (this.isDeletingCourse || !this.courseToDelete) {
      return;
    }

    this.isDeletingCourse = true;
    this._httpService
      .delete(`admin-panel/courses/${this.courseToDelete?.id}`)
      .subscribe({
        next: (res: any) => {
          this._toastService.success(res.message, this._translateService.instant('success'));
          this.coursePagination.page = 1;
          this.getCourses();
        },
        error: (error: HttpFormattedErrorResponse) => {
          if (error.status !== 401) {
            this._toastService.error(error.message, this._translateService.instant('failed'));
          }
        },
      })
      .add(() => {
        this.isDeletingCourse = false;
      });
  }

  onPageNumberChange(pageNumber: any): void {
    this.coursePagination.page = pageNumber;
    this.getCourses();
  }

  onSearchCourse(search: string) {
    this.coursePagination.page = 1;
    this._courseSearchListener$.next(search);
  }

  onStatusChange(status: string) {
    this.coursePagination.page = 1;
    this.courseStatus = status;
    this.getCourses();
  }

  onSort(event: any) {
    const sort = event.sorts ? event.sorts[0] : null;

    if (sort) {
      this.courseSortBy = sort.prop;
      this.courseSortOrder = sort.dir;
    } else {
      this.courseSortBy = '';
      this.courseSortOrder = 'asc';
    }

    this.getCourses();
  }

  refreshCourses() {
    this.coursePagination.page = 1;
    this.getCourses();
  }

  formatToolsText(course: Course) {
    return course.tools?.map((tool: Tool) => tool.name).join(', ') ?? '-';
  }
}
