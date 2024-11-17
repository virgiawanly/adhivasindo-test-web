import { Action, createReducer, on } from '@ngrx/store';
import {
  LAYOUT_DIRECTION,
  LAYOUT_MODE_TYPES,
  LAYOUT_TYPES,
  LAYOUT_WIDTH_TYPES,
  LEFT_SIDEBAR_SIZE,
  NAVIGATION_TYPES,
  SIDEBAR_COLOR_TYPES,
  SKIN_LAYOUT_TYPES,
  TOPBAR_COLOR_TYPES,
} from '../../config/layout';
import {
  changeDirection,
  changeMode,
  changeSkin,
  changelayout,
  changenavigation,
  changesidebarcolor,
  changesidebarsize,
  changetopbarcolor,
  changewidthLayout,
  loadSavedLayoutState,
} from './layout.actions';

export interface LayoutState {
  LAYOUT: string;
  LAYOUT_SKIN: string;
  LAYOUT_MODE: string;
  LAYOUT_DIRECTION: string;
  LAYOUT_WIDTH: string;
  SIDEBAR_SIZE: string;
  LAYOUT_NAVIGATION: string;
  SIDEBAR_COLOR: string;
  TOPBAR_COLOR: string;
}

export const initialState: LayoutState = {
  LAYOUT: LAYOUT_TYPES.VERTICAL,
  LAYOUT_SKIN: SKIN_LAYOUT_TYPES.DEFAULT,
  LAYOUT_MODE: LAYOUT_MODE_TYPES.LIGHTMODE,
  LAYOUT_DIRECTION: LAYOUT_DIRECTION.LTR,
  LAYOUT_WIDTH: LAYOUT_WIDTH_TYPES.FLUID,
  SIDEBAR_SIZE: LEFT_SIDEBAR_SIZE.DEFAULT,
  LAYOUT_NAVIGATION: NAVIGATION_TYPES.STICKY,
  SIDEBAR_COLOR: SIDEBAR_COLOR_TYPES.DARK,
  TOPBAR_COLOR: TOPBAR_COLOR_TYPES.LIGHT,
};

export const layoutReducer = createReducer(
  initialState,

  on(loadSavedLayoutState, (state) => {
    const savedLayoutState = JSON.parse(localStorage.getItem('adhivisindoAdmin@layoutState') ?? '{}');
    return { ...state, ...savedLayoutState };
  }),

  on(changelayout, (state, action) => {
    localStorage.setItem('adhivisindoAdmin@layoutState', JSON.stringify({ ...state, LAYOUT: action.layout }));
    return { ...state, LAYOUT: action.layout };
  }),

  on(changeSkin, (state, action) => {
    localStorage.setItem('adhivisindoAdmin@layoutState', JSON.stringify({ ...state, LAYOUT_SKIN: action.skin }));
    return { ...state, LAYOUT_SKIN: action.skin };
  }),

  on(changeDirection, (state, action) => {
    localStorage.setItem('adhivisindoAdmin@layoutState', JSON.stringify({ ...state, LAYOUT_DIRECTION: action.dir }));
    return { ...state, LAYOUT_DIRECTION: action.dir };
  }),

  on(changewidthLayout, (state, action) => {
    localStorage.setItem('adhivisindoAdmin@layoutState', JSON.stringify({ ...state, LAYOUT_WIDTH: action.width }));
    return { ...state, LAYOUT_WIDTH: action.width };
  }),

  on(changesidebarsize, (state, action) => {
    localStorage.setItem('adhivisindoAdmin@layoutState', JSON.stringify({ ...state, SIDEBAR_SIZE: action.size }));
    return { ...state, SIDEBAR_SIZE: action.size };
  }),

  on(changenavigation, (state, action) => {
    localStorage.setItem('adhivisindoAdmin@layoutState', JSON.stringify({ ...state, LAYOUT_NAVIGATION: action.navigation }));
    return { ...state, LAYOUT_NAVIGATION: action.navigation };
  }),

  on(changesidebarcolor, (state, action) => {
    localStorage.setItem('adhivisindoAdmin@layoutState', JSON.stringify({ ...state, SIDEBAR_COLOR: action.sidebar }));
    return { ...state, SIDEBAR_COLOR: action.sidebar };
  }),

  on(changetopbarcolor, (state, action) => {
    localStorage.setItem('adhivisindoAdmin@layoutState', JSON.stringify({ ...state, TOPBAR_COLOR: action.topbar }));
    return { ...state, TOPBAR_COLOR: action.topbar };
  }),

  on(changeMode, (state, action) => {
    localStorage.setItem('adhivisindoAdmin@layoutState', JSON.stringify({ ...state, LAYOUT_MODE: action.mode }));
    return { ...state, LAYOUT_MODE: action.mode };
  })
);

export function reducer(state: LayoutState | undefined, action: Action) {
  return layoutReducer(state, action);
}
