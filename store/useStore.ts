import { create } from 'zustand';

import { type ITabsBar, tabsBarSlice } from './tabsBarSlice';

export const useStore = create<ITabsBar>((...a) => ({
  ...tabsBarSlice(...a),
}));
