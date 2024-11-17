import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageTitleComponent } from '../../../../../shared/components/page-title/page-title.component';
import { Store } from '@ngrx/store';
import { getUser } from '../../../../../store/user/user.selectors';
import { Subject, takeUntil } from 'rxjs';
import { User } from '../../../../../../types/users';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PageTitleComponent, TranslateModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
  private _unsubscribe$: Subject<void> = new Subject<void>();

  user: User | null = null;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store
      .select(getUser)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((user) => {
        this.user = user;
      });
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
