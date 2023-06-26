import { useCallback, useRef, useState } from 'react';
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

const useHandleScroll = () => {
  const [showButton, setShowButton] = useState(true);

  const scrollOffset = useRef(0);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      // Check if the user is scrolling up or down by confronting the new scroll position with your own one
      const currentOffset = event.nativeEvent.contentOffset.y;
      const direction = currentOffset > 0 && currentOffset > scrollOffset.current ? 'down' : 'up';
      // If the user is scrolling down (and the action-button is still visible) hide it
      const isActionButtonVisible = direction === 'up';
      if (isActionButtonVisible !== showButton) {
        setShowButton(isActionButtonVisible);
        // LayoutAnimation.configureNext(CustomLayoutLinear);
      }
      // Update your scroll position
      scrollOffset.current = currentOffset;
    },
    [showButton]
  );

  return { handleScroll, showButton };
};

export default useHandleScroll;
