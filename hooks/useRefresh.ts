import { useState } from 'react';

export default function useRefresh(fetcher: () => void) {
  const [refreshing, setRefreshing] = useState(false);

  const refreshHandler = () => {
    setRefreshing(true);
    fetcher();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return { refreshing, refreshHandler };
}
