import { useCallback, useState } from 'react';

export default function useRefresh(fetcher: () => void) {
  const [refreshing, setRefreshing] = useState(false);

  const refreshHandler = useCallback(() => {
    setRefreshing(true);
    fetcher();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, [fetcher]);

  return { refreshing, refreshHandler };
}
