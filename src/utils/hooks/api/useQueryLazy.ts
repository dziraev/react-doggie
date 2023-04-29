import { useCallback, useState } from 'react';

export const useQueryLazy = <K>(url: string, config?: Omit<RequestInit, 'method'>) => {
  const [status, setStatus] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const query = useCallback(async (): Promise<ApiResponse<K>> => {
    setIsLoading(true);
    try {
      const response = await fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
        ...config,
        headers: {
          'Content-Type': 'application/json',
          ...(config?.headers && config.headers)
        }
      });

      setStatus(response.status);

      return await response.json();
    } catch (e) {
      setError((e as Error).message);
      return { success: false, data: { message: (e as Error).message } };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { query, error, isLoading, status };
};
