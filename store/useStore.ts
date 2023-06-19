import { create } from 'zustand';

import { tabsBarSlice, ITabsBar } from './tabsBarSlice';

export const useStore = create<ITabsBar>((...a) => ({
  ...tabsBarSlice(...a),
}));
