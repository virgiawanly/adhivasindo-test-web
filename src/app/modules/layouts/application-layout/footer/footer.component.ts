import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
    <footer
      class="absolute bottom-0 left-0 right-0 flex h-14 items-center border-t px-4 py-3 dark:border-zink-600 group-data-[layout=horizontal]:ltr:left-0 ltr:md:left-vertical-menu group-data-[sidebar-size=md]:ltr:md:left-vertical-menu-md group-data-[sidebar-size=sm]:ltr:md:left-vertical-menu-sm group-data-[layout=horizontal]:rtl:right-0 rtl:md:right-vertical-menu group-data-[sidebar-size=md]:rtl:md:right-vertical-menu-md group-data-[sidebar-size=sm]:rtl:md:right-vertical-menu-sm"
    >
      <div class="w-full group-data-[layout=horizontal]:mx-auto group-data-[layout=horizontal]:max-w-screen-2xl">
        <div class="grid grid-cols-1 items-center text-center text-slate-400 dark:text-zink-200 lg:grid-cols-2 ltr:lg:text-left rtl:lg:text-right">
          <div>© {{ year }} LMS. All right reserved.</div>
          <div class="hidden lg:block">
            <div class="ltr:text-right rtl:text-left">v1.0.0</div>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: ``,
})
export class FooterComponent {
  year: number = new Date().getFullYear();
}
