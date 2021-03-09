import { AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';

interface Response<T> extends AxiosResponse<T> {
  data: T;
}

export default function usePromise<T>(
  promiseCreator: () => Promise<AxiosResponse>,
  deps: any,
): [boolean, Response<T> | null, any] {
  const [loading, setLoading] = useState<boolean>(false);
  const [resolved, setResolved] = useState<Response<T> | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const process = async () => {
      setLoading(true);
      try {
        const resolved = await promiseCreator();
        setResolved(resolved);
      } catch (error) {
        setError(error);
      }

      setLoading(false);
    };

    process();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return [loading, resolved, error];
}
