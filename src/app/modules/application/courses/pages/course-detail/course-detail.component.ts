import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { Course } from '../../../../../../types/courses';
import { HttpFormattedErrorResponse } from '../../../../../../types/http';
import { HttpService } from '../../../../../core/services/http.service';
import { ToastService } from '../../../../../core/services/toast.service';
import { MnDropdownComponent } from '../../../../../shared/components/dropdown';
import { MDModalModule } from '../../../../../shared/components/modals';
import { PageTitleComponent } from '../../../../../shared/components/page-title/page-title.component';
import { CourseEditModalComponent } from '../../components/course-edit-modal/course-edit-modal.component';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [PageTitleComponent, CommonModule, TranslateModule, LucideAngularModule, MnDropdownComponent, MDModalModule, CourseEditModalComponent],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss',
})
export class CourseDetailComponent {
  isLoadingCourse: boolean = false;
  isDeletingCourse: boolean = false;
  course: Course | null = null;
  courseId: string | null = null;

  constructor(
    private _toastService: ToastService,
    private _location: Location,
    private _router: Router,
    private _httpService: HttpService,
    private _activatedRoute: ActivatedRoute,
    private _translateService: TranslateService
  ) {
    this.courseId = this._activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    if (this.courseId) {
      this.getCourse();
    }
  }

  getCourse() {
    this.isLoadingCourse = true;
    this._httpService
      .get(`admin-panel/courses/${this.courseId}`, {
        params: {
          relations: 'competencies,tools',
        },
      })
      .subscribe({
        next: (res: any) => {
          this.course = res.data;
        },
        error: (error: HttpFormattedErrorResponse) => {
          if (error.status !== 401) {
            this._toastService.error(error.message, this._translateService.instant('failed'));
            this._router.navigateByUrl('/application/course');
          }
        },
      })
      .add(() => {
        this.isLoadingCourse = false;
      });
  }

  deleteCourse() {
    if (this.isDeletingCourse || !this.course) {
      return;
    }

    this.isDeletingCourse = true;
    this._httpService
      .delete(`admin-panel/courses/${this.course.id}`)
      .subscribe({
        next: (res: any) => {
          this._toastService.success(res.message, this._translateService.instant('success'));
          this._router.navigateByUrl('/application/courses', { replaceUrl: true });
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

  back() {
    this._location.back();
  }
}
