import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { LanguageService } from '../../../core/services/language.service';
import { ToastService } from '../../../core/services/toast.service';
import { loadSavedLayoutState } from '../../../store/layout/layout.actions';
import { fetchUser } from '../../../store/user/user.actions';
import { getFetchUserError, getIsFetchingUser } from '../../../store/user/user.selectors';
import { FooterComponent } from './footer/footer.component';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';

@Component({
  selector: 'app-application-layout',
  standalone: true,
  imports: [CommonModule, SidebarComponent, TopbarComponent, RouterModule, FooterComponent, LoadingScreenComponent],
  templateUrl: './application-layout.component.html',
  styleUrl: './application-layout.component.scss',
  providers: [LanguageService],
})
export class ApplicationLayoutComponent {
  private _unsubscribe$: Subject<void> = new Subject();
  private _store = inject(Store);

  layoutType!: string;
  isLoading: boolean = false;
  isInitialLoaded: boolean = false;

  constructor(private _toastService: ToastService) {}

  ngOnInit() {
    this.getUserProfile();
    this.setLayoutMode();
    this._store
      .select(getIsFetchingUser)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((data) => {
        this.isLoading = data;
        if (!this.isLoading) {
          setTimeout(() => {
            this.isInitialLoaded = true;
          }, 500);
        }
      });
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  getUserProfile() {
    // Use this to fetch user every time
    this._store.dispatch(fetchUser());

    // Uncomment this to use local storage user
    // const userProfile = localStorage.getItem('adhivisindoAdmin@userProfile');
    // if (userProfile) {
    //   this._store.dispatch(setUser({ user: JSON.parse(userProfile ?? '{}') }));
    // } else {
    //   this._store.dispatch(fetchUser());
    // }

    this._store
      .select(getFetchUserError)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((error) => {
        if (error) {
          this._toastService.error(error.message);
        }
      });
  }

  setLayoutMode() {
    this._store.dispatch(loadSavedLayoutState());
    this._store
      .select('layout')
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((data: any) => {
        this.layoutType = data.LAYOUT;
        document.documentElement.setAttribute('data-layout', data.LAYOUT);
        document.documentElement.setAttribute('data-mode', data.LAYOUT_MODE);
        document.documentElement.setAttribute('data-topbar', data.TOPBAR_COLOR);
        document.documentElement.setAttribute('data-sidebar', data.SIDEBAR_COLOR);
        document.documentElement.setAttribute('data-skin', data.LAYOUT_SKIN);
        document.documentElement.setAttribute('data-navbar', data.LAYOUT_NAVIGATION);
        document.documentElement.setAttribute('data-content', data.LAYOUT_WIDTH);
        document.documentElement.setAttribute('dir', data.LAYOUT_DIRECTION);

        if (data.LAYOUT === 'vertical') {
          document.documentElement.setAttribute('data-sidebar-size', data.SIDEBAR_SIZE);
        }
      });
  }
}
