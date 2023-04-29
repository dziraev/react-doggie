import { useEffect, useState } from 'react';

export const useQuery = <K>(
  url: string,
  deps: React.DependencyList = [],
  config?: Omit<RequestInit, 'method'>
) => {
  const [status, setStatus] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState<K | null>(null);

  useEffect(() => {
    console.log('@@@@');
    setIsLoading(true);
    try {
      fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
        ...config,
        headers: {
          'Content-Type': 'application/json',
          ...(config?.headers && config.headers)
        }
      }).then(async (response) => {
        const responseData = (await response.json()) as K;
        setStatus(response.status);
        setData(responseData);
      });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, deps);

  return { data, error, isLoading, status };
};
