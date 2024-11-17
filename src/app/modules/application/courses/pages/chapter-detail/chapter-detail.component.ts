import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { Chapter } from '../../../../../../types/chapters';
import { HttpFormattedErrorResponse } from '../../../../../../types/http';
import { HttpService } from '../../../../../core/services/http.service';
import { ToastService } from '../../../../../core/services/toast.service';
import { MnDropdownComponent } from '../../../../../shared/components/dropdown';
import { MDModalModule } from '../../../../../shared/components/modals';
import { PageTitleComponent } from '../../../../../shared/components/page-title/page-title.component';
import { ChapterEditModalComponent } from '../../components/chapter-edit-modal/chapter-edit-modal.component';
import { ChapterLessonListComponent } from '../../components/chapter-lesson-list/chapter-lesson-list.component';

@Component({
  selector: 'app-chapter-detail',
  standalone: true,
  imports: [
    PageTitleComponent,
    CommonModule,
    TranslateModule,
    LucideAngularModule,
    MnDropdownComponent,
    MDModalModule,
    ChapterEditModalComponent,
    RouterLink,
    ChapterLessonListComponent,
  ],
  templateUrl: './chapter-detail.component.html',
  styleUrl: './chapter-detail.component.scss',
})
export class ChapterDetailComponent {
  isLoadingChapter: boolean = false;
  isDeletingChapter: boolean = false;
  chapter: Chapter | null = null;
  courseId: string | null = null;
  chapterId: string | null = null;

  constructor(
    private _toastService: ToastService,
    private _location: Location,
    private _router: Router,
    private _httpService: HttpService,
    private _activatedRoute: ActivatedRoute,
    private _translateService: TranslateService
  ) {
    this.courseId = this._activatedRoute.snapshot.paramMap.get('id');
    this.chapterId = this._activatedRoute.snapshot.paramMap.get('chapterId');
  }

  ngOnInit() {
    if (this.chapterId) {
      this.getChapter();
    }
  }

  getChapter() {
    this.isLoadingChapter = true;
    this._httpService
      .get(`admin-panel/chapters/${this.chapterId}`, {
        params: {
          relations: 'course',
        },
      })
      .subscribe({
        next: (res: any) => {
          this.chapter = res.data;
        },
        error: (error: HttpFormattedErrorResponse) => {
          if (error.status !== 401) {
            this._toastService.error(error.message, this._translateService.instant('failed'));
          }

          this._router.navigateByUrl(`/application/courses/${this.courseId}`);
        },
      })
      .add(() => {
        this.isLoadingChapter = false;
      });
  }

  deleteChapter() {
    if (this.isDeletingChapter || !this.chapter) {
      return;
    }

    this.isDeletingChapter = true;
    this._httpService
      .delete(`admin-panel/chapters/${this.chapter.id}`)
      .subscribe({
        next: (res: any) => {
          this._toastService.success(res.message, this._translateService.instant('success'));
          this._router.navigateByUrl(`/application/courses/${this.courseId}`, { replaceUrl: true });
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

  back() {
    this._location.back();
  }
}
