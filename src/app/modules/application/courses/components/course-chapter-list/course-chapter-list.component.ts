import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { Chapter } from '../../../../../../types/chapters';
import { HttpFormattedErrorResponse } from '../../../../../../types/http';
import { HttpService } from '../../../../../core/services/http.service';
import { ToastService } from '../../../../../core/services/toast.service';
import { MDModalModule } from '../../../../../shared/components/modals';
import { ChapterCreateModalComponent } from '../chapter-create-modal/chapter-create-modal.component';
import { ChapterEditModalComponent } from '../chapter-edit-modal/chapter-edit-modal.component';

@Component({
  selector: 'app-course-chapter-list',
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
    ChapterCreateModalComponent,
    ChapterEditModalComponent,
  ],
  templateUrl: './course-chapter-list.component.html',
  styleUrl: './course-chapter-list.component.scss',
})
export class CourseChapterListComponent {
  private _unsubscribeAll$: Subject<void> = new Subject<void>();
  private _chapterSearchListener$: Subject<string> = new Subject();

  @Input({ required: true }) courseId?: number;

  isLoadingChapters: boolean = false;
  isDeletingChapter: boolean = false;
  chapters: Chapter[] = [];
  chapterSearch: string = '';
  chapterToEdit: Chapter | null = null;
  chapterToDelete: Chapter | null = null;

  constructor(
    private _httpService: HttpService,
    private _toastService: ToastService,
    private _translateService: TranslateService
  ) {}

  ngOnInit() {
    this.getChapters();
    this._chapterSearchListener$.pipe(debounceTime(500), takeUntil(this._unsubscribeAll$)).subscribe((search) => {
      this.chapterSearch = search;
      this.getChapters();
    });
  }

  ngOnDestroy() {
    this._unsubscribeAll$.next();
    this._unsubscribeAll$.complete();
  }

  getChapters() {
    if (!this.courseId) {
      return;
    }

    this.isLoadingChapters = true;
    this._httpService
      .get(`admin-panel/courses/${this.courseId}/chapters`, {
        params: {
          paginate: false,
          search: this.chapterSearch ?? '',
          sort: 'order',
          order: 'asc',
        },
      })
      .subscribe({
        next: (res: any) => {
          this.chapters = res.data;
        },
        error: (error: HttpFormattedErrorResponse) => {
          if (error.status !== 401) {
            this._toastService.error(error.message, this._translateService.instant('failed'));
          }
        },
      })
      .add(() => {
        this.isLoadingChapters = false;
      });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.chapters, event.previousIndex, event.currentIndex);
    this.reorderChapter(this.chapters[event.currentIndex].id, event.currentIndex + 1);
  }

  reorderChapter(chapterId: number, order: number) {
    this._httpService
      .patch(`admin-panel/chapters/reorder`, {
        course_id: this.courseId,
        chapter_id: chapterId,
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

  setChapterToEdit(chapter: Chapter) {
    this.chapterToEdit = chapter;
  }

  setChapterToDelete(chapter: Chapter) {
    this.chapterToDelete = chapter;
  }

  deleteChapter() {
    if (this.isDeletingChapter || !this.chapterToDelete) {
      return;
    }

    this.isDeletingChapter = true;
    this._httpService
      .delete(`admin-panel/chapters/${this.chapterToDelete?.id}`)
      .subscribe({
        next: (res: any) => {
          this._toastService.success(res.message, this._translateService.instant('success'));
          this.getChapters();
        },
        error: (error: HttpFormattedErrorResponse) => {
          if (error.status !== 401) {
            this._toastService.error(error.message, this._translateService.instant('failed'));
          }
        },
      })
      .add(() => {
        this.isDeletingChapter = false;
      });
  }

  onSearchChapter(search: string) {
    this._chapterSearchListener$.next(search);
  }
}
