import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, noop, of, tap } from 'rxjs';
import { fetchUser, fetchUserError, fetchUserSuccess, setUser } from './user.actions';
import { HttpService } from '../../core/services/http.service';

@Injectable()
export class UserEffects {
  constructor(
    @Inject(Actions) private actions$: Actions,
    private _httpService: HttpService,
  ) {}

  setUser$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(setUser),
        tap((action) => localStorage.setItem('adhivisindoAdmin@userProfile', JSON.stringify(action.user))),
        exhaustMap(() => of(noop())),
      );
    },
    { dispatch: false },
  );

  fetchUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchUser),
      exhaustMap(() => {
        return this._httpService.get('admin-panel/auth/user').pipe(
          map((res: any) => fetchUserSuccess({ user: res.data.user })),
          catchError((error) => of(fetchUserError({ error }))),
        );
      }),
    );
  });
}
