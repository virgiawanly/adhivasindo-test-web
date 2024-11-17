import { CommonModule, DOCUMENT } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, HostListener, Inject, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { LUCIDE_ICONS, LucideAngularModule, LucideIconProvider, icons } from 'lucide-angular';
import { SimplebarAngularModule } from 'simplebar-angular';
import { User } from '../../../../../types/users';
import { AuthService } from '../../../../core/services/auth.service';
import { DrawerModule } from '../../../../shared/components/drawer';
import { MnDropdownComponent } from '../../../../shared/components/dropdown';
import { MDModalModule } from '../../../../shared/components/modals';
import { changeMode, changesidebarcolor, changesidebarsize, changetopbarcolor } from '../../../../store/layout/layout.actions';
import { getLayout, getLayoutmode, getSidebarcolor, getSidebarsize, getTopbarcolor } from '../../../../store/layout/layout.selectors';
import { getUser } from '../../../../store/user/user.selectors';
import { LanguageService } from '../../../../core/services/language.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    DrawerModule,
    MnDropdownComponent,
    LucideAngularModule,
    SimplebarAngularModule,
    RouterModule,
    CommonModule,
    MDModalModule,
    TranslateModule,
  ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{ provide: LUCIDE_ICONS, multi: true, useValue: new LucideIconProvider(icons) }],
})
export class TopbarComponent {
  private store = inject(Store);

  user: User | null = null;
  type: any = 'all';
  mode: any;
  size: any;
  layout: any;

  cookieLang: any;
  languageFlag: any;
  languages = [
    { text: 'English', flag: 'assets/images/flags/us.svg', lang: 'en' },
    { text: 'Indonesia', flag: 'assets/images/flags/id.svg', lang: 'id' },
  ];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private _authService: AuthService,
    private _router: Router,
    public languageService: LanguageService,
    private _translateService: TranslateService
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const windowSize = document.documentElement.clientWidth;

    // Get Layout
    this.store.select(getLayout).subscribe((data) => {
      this.layout = data;
    });

    if (this.layout == 'vertical') {
      if (windowSize > 768 && windowSize < 1024) {
        this.store.dispatch(changesidebarsize({ size: 'sm' }));
      } else {
        this.store.dispatch(changesidebarsize({ size: 'lg' }));
      }
    } else {
      this.store.dispatch(changesidebarsize({ size: 'lg' }));
    }
  }

  ngOnInit(): void {
    this.store.select(getUser).subscribe((user) => {
      this.user = user;
    });

    this.cookieLang = localStorage.getItem('adhivisindoAdmin@lang') ?? this._translateService.getBrowserLang() ?? 'en';
    const val = this.languages.filter((x) => x.lang === this.cookieLang);
    if (val.length === 0) {
      if (this.languageFlag === undefined) {
        this.languageFlag = 'assets/images/flags/us.svg';
      }
    } else {
      const selected = this.languages.find((x) => x.lang === this.cookieLang);
      this.languageFlag = selected?.flag;
    }
  }

  windowScroll() {
    const scrollUp = document.documentElement.scrollTop;
    if (scrollUp >= 50) {
      document.getElementById('page-topbar')?.classList.add('is-sticky');
    } else {
      document.getElementById('page-topbar')?.classList.remove('is-sticky');
    }
  }

  changeLayoutMode() {
    this.store.select(getLayoutmode).subscribe((mode) => {
      this.mode = mode;
    });

    if (this.mode == 'light') {
      this.store.dispatch(changeMode({ mode: 'dark' }));
      this.store.dispatch(changesidebarcolor({ sidebar: 'dark' }));
      this.store.dispatch(changetopbarcolor({ topbar: 'dark' }));
      this.store.select(getLayoutmode).subscribe((mode) => {
        document.documentElement.setAttribute('data-mode', mode);
      });
      this.store.select(getSidebarcolor).subscribe((color) => {
        document.documentElement.setAttribute('data-sidebar', color);
      });
      this.store.select(getTopbarcolor).subscribe((topbar) => {
        document.documentElement.setAttribute('data-topbar', topbar);
      });
    } else {
      this.store.dispatch(changeMode({ mode: 'light' }));
      this.store.dispatch(changesidebarcolor({ sidebar: 'light' }));
      this.store.dispatch(changetopbarcolor({ topbar: 'light' }));
      this.store.select(getLayoutmode).subscribe((mode) => {
        document.documentElement.setAttribute('data-mode', mode);
      });
      this.store.select(getSidebarcolor).subscribe((color) => {
        document.documentElement.setAttribute('data-sidebar', color);
      });
      this.store.select(getTopbarcolor).subscribe((topbar) => {
        document.documentElement.setAttribute('data-topbar', topbar);
      });
    }
  }

  changeSidebar() {
    const windowSize = document.documentElement.clientWidth;
    let sidebarOverlay = document.getElementById('sidebar-overlay') as any;

    if (windowSize < 768) {
      this.document.body.classList.add('overflow-hidden');
      // Check if the sidebar overlay is hidden
      if (sidebarOverlay.classList.contains('hidden')) {
        sidebarOverlay.classList.remove('hidden');
        this.document.documentElement.querySelector('.app-menu')?.classList.remove('hidden');
      } else {
        sidebarOverlay.classList.add('hidden');
        this.document.documentElement.querySelector('.app-menu')?.classList.add('hidden');
      }
      this.store.dispatch(changesidebarsize({ size: 'lg' }));
    } else {
      this.store.select(getSidebarsize).subscribe((size) => {
        this.size = size;
      });
      this.store.dispatch(changesidebarsize({ size: this.size === 'sm' ? 'lg' : 'sm' }));
    }
  }

  logout() {
    this._authService.logout().subscribe(() => {
      this._router.navigate(['/auth/login']);
    });
  }

  getNameInitials(name?: string | null): string | null {
    if (name) {
      return name
        .split(' ')
        .map((name) => name.charAt(0))
        .slice(0, 2)
        .join('');
    } else {
      return null;
    }
  }

  setLanguage(text: string, lang: string, flag: string) {
    this.languageFlag = flag;
    this.cookieLang = lang;
    this.languageService.setLanguage(lang);
    localStorage.setItem('adhivisindoAdmin@lang', lang);
  }
}
