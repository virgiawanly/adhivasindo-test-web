import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, switchMap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isAuthenticated = new BehaviorSubject(false);

  constructor(private _http: HttpClient) {
    // Check if the user is authenticated by checking the token.
    this._isAuthenticated.next(!!this.apiToken);
  }

  /**
   * Sets the API token in the local storage.
   *
   * @param {string | null} token - The API token to be set. If null, the token will be removed from the local storage.
   */
  set apiToken(token: string | null) {
    if (token) {
      localStorage.setItem(environment.api_token_identifier, token);
    } else {
      localStorage.removeItem(environment.api_token_identifier);
    }
  }

  /**
   * Retrieves the API token.
   *
   * @return {string | null} The API token or null if it doesn't exist.
   */
  get apiToken(): string | null {
    return localStorage.getItem(environment.api_token_identifier) ?? null;
  }

  /**
   * Login the user.
   *
   * @param {Object} credentials
   * @param {string} credentials.email
   * @param {string} credentials.password
   * @returns Observable<any>
   */
  login(credentials: { email: string; password: string }): Observable<any> {
    if (this._isAuthenticated.getValue()) {
      return throwError(() => new Error('User is already logged in.'));
    }

    return this._http.post(`${environment.api_url}/admin-panel/auth/login`, credentials).pipe(
      switchMap((res: any) => {
        this.apiToken = res?.data?.token;
        this._isAuthenticated.next(true);

        return of(res);
      })
    );
  }

  /**
   * Logout the user.
   *
   * @returns Observable<boolean>
   */
  logout(): Observable<boolean> {
    this.apiToken = null;
    this._isAuthenticated.next(false);

    return of(true);
  }

  /**
   * Check if the user is authenticated.
   *
   * @return boolean
   */
  check(): boolean {
    return this._isAuthenticated.getValue();
  }

  /**
   * Observe the authentication status.
   *
   * @return Observable<boolean>
   */
  observe(): Observable<boolean> {
    return this._isAuthenticated.asObservable().pipe(map((authenticated: boolean) => authenticated && !!this.apiToken));
  }
}
