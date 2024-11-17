import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { HttpFormattedErrorResponse } from '../../../../../../types/http';
import { Lesson } from '../../../../../../types/lessons';
import { HttpService } from '../../../../../core/services/http.service';
import { ToastService } from '../../../../../core/services/toast.service';
import { MDModalModule } from '../../../../../shared/components/modals';
import { LessonCreateModalComponent } from '../lesson-create-modal/lesson-create-modal.component';
import { LessonEditModalComponent } from '../lesson-edit-modal/lesson-edit-modal.component';

@Component({
  selector: 'app-chapter-lesson-list',
  standalone: true,
  imports: [
    CdkDropList,
    CdkDrag,
    LucideAngularModule,
    RouterLink,
    MDModalModule,
    CommonModule,
    TranslateModule,
    FormsModule,
    LessonCreateModalComponent,
    LessonEditModalComponent,
  ],
  templateUrl: './chapter-lesson-list.component.html',
  styleUrl: './chapter-lesson-list.component.scss',
})
export class ChapterLessonListComponent {
  private _unsubscribeAll$: Subject<void> = new Subject<void>();
  private _lessonSearchListener$: Subject<string> = new Subject();

  @Input({ required: true }) courseId?: number;
  @Input({ required: true }) chapterId?: number;

  isLoadingLessons: boolean = false;
  isDeletingLesson: boolean = false;
  lessons: Lesson[] = [];
  lessonSearch: string = '';
  lessonToEdit: Lesson | null = null;
  lessonToDelete: Lesson | null = null;

  constructor(
    private _httpService: HttpService,
    private _toastService: ToastService,
    private _translateService: TranslateService
  ) {}

  ngOnInit() {
    this.getLessons();
    this._lessonSearchListener$.pipe(debounceTime(500), takeUntil(this._unsubscribeAll$)).subscribe((search) => {
      this.lessonSearch = search;
      this.getLessons();
    });
  }

  ngOnDestroy() {
    this._unsubscribeAll$.next();
    this._unsubscribeAll$.complete();
  }

  getLessons() {
    if (!this.chapterId) {
      return;
    }

    this.isLoadingLessons = true;
    this._httpService
      .get(`admin-panel/chapters/${this.chapterId}/lessons`, {
        params: {
          paginate: false,
          search: this.lessonSearch ?? '',
          sort: 'order',
          order: 'asc',
        },
      })
      .subscribe({
        next: (res: any) => {
          this.lessons = res.data;
        },
        error: (error: HttpFormattedErrorResponse) => {
          if (error.status !== 401) {
            this._toastService.error(error.message, this._translateService.instant('failed'));
          }
        },
      })
      .add(() => {
        this.isLoadingLessons = false;
      });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.lessons, event.previousIndex, event.currentIndex);
    this.reorderLesson(this.lessons[event.currentIndex].id, event.currentIndex + 1);
  }

  reorderLesson(lessonId: number, order: number) {
    this._httpService
      .patch(`admin-panel/lessons/reorder`, {
        course_id: this.courseId,
        chapter_id: this.chapterId,
        lesson_id: lessonId,
        order,
      })
      .subscribe({
        next: () => {
          // Do nothing
        },
        error: (error: HttpFormattedErrorResponse) => {
          if (error.status !== 401) {
            this._toastService.error(error.message, this._translateService.instant('failed'));
          }
        },
      });
  }

  setLessonToEdit(lesson: Lesson) {
    this.lessonToEdit = lesson;
  }

  setLessonToDelete(lesson: Lesson) {
    this.lessonToDelete = lesson;
  }

  deleteLesson() {
    if (this.isDeletingLesson || !this.lessonToDelete) {
      return;
    }

    this.isDeletingLesson = true;
    this._httpService
      .delete(`admin-panel/lessons/${this.lessonToDelete?.id}`)
      .subscribe({
        next: (res: any) => {
          this._toastService.success(res.message, this._translateService.instant('success'));
          this.getLessons();
        },
        error: (error: HttpFormattedErrorResponse) => {
          if (error.status !== 401) {
            this._toastService.error(error.message, this._translateService.instant('failed'));
          }
        },
      })
      .add(() => {
        this.isDeletingLesson = false;
      });
  }

  onSearchLesson(search: string) {
    this._lessonSearchListener$.next(search);
  }
}
