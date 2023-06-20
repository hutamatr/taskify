import { type StateCreator } from 'zustand';

export interface ITabsBar {
  isTabsBarShow: boolean;
  onTabsBarShowHandler: (isExtended: boolean) => void;
}

export const tabsBarSlice: StateCreator<ITabsBar, [], [], ITabsBar> = (set) => ({
  isTabsBarShow: true,
  onTabsBarShowHandler: (isExtended) => {
    set({ isTabsBarShow: isExtended });
  },
});
