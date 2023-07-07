import { useCallback, useState } from 'react';

export default function useRefresh(fetcher: () => Promise<void>) {
  const [refreshing, setRefreshing] = useState(false);

  const refreshHandler = useCallback(async () => {
    setRefreshing(true);
    await fetcher();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, [fetcher]);

  return { refreshing, refreshHandler };
}
