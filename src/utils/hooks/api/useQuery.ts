import { useEffect, useState } from 'react';

export const useQuery = <K>(request: () => Promise<any>, deps: React.DependencyList = []) => {
  const [status, setStatus] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState<K | null>(null);

  useEffect(() => {
    setIsLoading(true);
    try {
      request().then(async (response) => {
        setStatus(response.status);
        setData(response.data);
        setIsLoading(false);
      });
    } catch (e) {
      setError((e as Error).message);
      setIsLoading(false);
    }
  }, deps);

  return { data, error, isLoading, status };
};
