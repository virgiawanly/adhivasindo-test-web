import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  public languages: string[] = ['en', 'id'];

  constructor(public translate: TranslateService) {
    // Add languges to translate service
    this.translate.addLangs(this.languages);

    // Set default language
    let browserLang = localStorage.getItem('adhivisindoAdmin@lang') ?? translate.getBrowserLang();

    // Set used language for translate service
    translate.use(browserLang?.match(/en|id/) ? browserLang : 'en');
  }

  /**
   * Set app language.
   *
   * @param lang
   * @return void
   */
  public setLanguage(lang: any) {
    this.translate.use(lang);
    localStorage.setItem('adhivisindoAdmin@lang', lang);
  }
}
