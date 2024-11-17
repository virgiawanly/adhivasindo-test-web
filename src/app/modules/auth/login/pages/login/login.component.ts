import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { LucideAngularModule } from 'lucide-angular';
import { HttpFormattedErrorResponse } from '../../../../../../types/http';
import { AuthService } from '../../../../../core/services/auth.service';
import { setUser } from '../../../../../store/user/user.actions';
import { LoginForm } from './login-form';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private store = inject(Store);

  isLoggingIn: boolean = false;
  loginForm: LoginForm = new LoginForm();
  errorMessage: string | null = null;
  year = new Date().getFullYear();

  constructor(
    private _authService: AuthService,
    private _router: Router,
  ) {}

  login() {
    this.loginForm.markAllAsTouched();
    this.errorMessage = null;

    if (this.loginForm.invalid || this.loginForm.disabled || this.isLoggingIn) {
      return;
    }

    this.loginForm.disable();
    this.isLoggingIn = true;
    this._authService
      .login(this.loginForm.value)
      .subscribe({
        next: (res) => {
          this.store.dispatch(setUser({ user: res.data.user ?? null }));
          this._router.navigateByUrl('/');
        },
        error: (error: HttpFormattedErrorResponse) => {
          this.errorMessage = error.message;
        },
      })
      .add(() => {
        this.loginForm.enable();
        this.isLoggingIn = false;
      });
  }
}
