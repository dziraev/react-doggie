import { useCallback, useState } from 'react';

export const useQueryLazy = <K>(request: <T>() => Promise<any>) => {
  const [status, setStatus] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const query = useCallback(async (): Promise<ApiResponse<K>> => {
    setIsLoading(true);
    try {
      return await request<K>().then(async (response) => {
        setStatus(response.status);
        return response.data;
      });
    } catch (e) {
      setError((e as Error).message);
      return { success: false, data: { message: (e as Error).message } };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { query, error, isLoading, status };
};
