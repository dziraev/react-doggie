import { useCallback, useState } from 'react';

export const useMutation = <T, K>(request: (body: T) => Promise<any>) => {
  const [status, setStatus] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const mutation = useCallback(async (body: T): Promise<ApiResponse<K>> => {
    setIsLoading(true);
    try {
      return await request(body).then(async (response) => {
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

  return { mutation, error, isLoading, status };
};
