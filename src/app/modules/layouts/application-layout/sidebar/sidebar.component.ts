import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, HostListener, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { LUCIDE_ICONS, LucideAngularModule, LucideIconProvider, icons } from 'lucide-angular';
import { SimplebarAngularModule } from 'simplebar-angular';
import { LanguageService } from '../../../../core/services/language.service';
import { CutomDropdownComponent } from '../../../../shared/components/customdropdown';
import { getLayout, getSidebarsize } from '../../../../store/layout/layout.selectors';
import { MENU } from './menu';
import { MenuItem } from './menu.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, SimplebarAngularModule, CutomDropdownComponent, RouterModule, LucideAngularModule, TranslateModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{ provide: LUCIDE_ICONS, multi: true, useValue: new LucideIconProvider(icons) }, LanguageService],
})
export class SidebarComponent {
  menuItems: any;
  isMoreMenu: boolean = false;
  navData: any;
  navbarMenuItems: any = [];
  layout: any;
  size: any;

  private store = inject(Store);

  constructor() {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (document.documentElement.getAttribute('data-layout') == 'horizontal') {
      if (document.documentElement.clientWidth >= 1025) {
        setTimeout(() => {
          this.updateMenu();
        }, 500);
      }
    }
  }

  ngOnInit(): void {
    this.store.select(getLayout).subscribe((data) => {
      this.layout = data;
      if (this.layout == 'horizontal') {
        setTimeout(() => {
          this.updateMenu();
        }, 1500);
      } else {
        this.menuItems = MENU;
      }
    });

    this.store.select(getSidebarsize).subscribe((data) => {
      this.size = data;
    });

    this.navData = MENU;
    this.menuItems = this.navData;
  }

  ngAfterViewInit() {
    if (this.layout == 'horizontal') {
      setTimeout(() => {
        this.updateMenu();
      }, 1500);
    } else {
      this.menuItems = MENU;
    }
  }

  updateMenu() {
    const isMoreMenu = false;
    const navbarHeader = document.querySelector('.navbar-header');
    const navbarNav = document.getElementById('navbar-nav') as any;
    const fullWidthOfMenu = navbarHeader!.clientWidth - 150;
    const menuWidth = fullWidthOfMenu || 0;

    let totalItemsWidth = 0;
    let visibleItems: any = [];
    let hiddenItems: any = [];

    const moreMenuItem = {
      id: 'more',
      label: 'more',
      icon: 'network',
      subItems: null,
      link: 'sidebarMore',
      stateVariables: isMoreMenu,
      click: (e: any) => {
        e.preventDefault();
        this.isMoreMenu = !this.isMoreMenu;
      },
    };

    for (let i = 0; i < this.navData.length; i++) {
      const itemWidth = navbarNav?.children[i]?.offsetWidth;
      totalItemsWidth += itemWidth;

      if (totalItemsWidth <= menuWidth - 50 || window.innerWidth < 768) {
        visibleItems.push(this.navData[i]);
      } else {
        if (!this.navData[i].isTitle) {
          hiddenItems.push(this.navData[i]);
        }
      }
      if (i + 1 === this.navData.length) {
        moreMenuItem.subItems = hiddenItems;
      }
    }

    const updatedMenuItems = hiddenItems.length > 0 ? [...visibleItems, moreMenuItem] : visibleItems;
    this.menuItems = updatedMenuItems;
  }

  hasItems(item: MenuItem) {
    return item.subItems !== undefined ? item.subItems.length > 0 : false;
  }

  hideSidebar() {
    let sidebarOverlay = document.getElementById('sidebar-overlay') as any;
    sidebarOverlay.classList.add('hidden');
    document.documentElement.querySelector('.app-menu')?.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
}
