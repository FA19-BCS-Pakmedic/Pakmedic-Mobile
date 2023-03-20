import React, {useState, useEffect} from 'react';

function useLoading(initialState = false, LoadingComponent) {
  const [loading, setLoading] = useState(initialState);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    return () => {
      setLoading(false);
      setError(null);
      setSuccess(false);
    };
  }, []);

  useEffect(() => {
    console.log(loading, error, success);
  }, [loading, success, error]);

  const withLoading =
    fn =>
    async (...args) => {
      setLoading(true);
      setError(null);
      setSuccess(false);
      try {
        await fn(...args);
        setSuccess(true);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

  const LoadingIndicator = () => {
    return loading ? LoadingComponent || <p>Loading...</p> : null;
  };

  const ErrorIndicator = () => {
    return error ? <p>Error: {error.message}</p> : null;
  };

  const SuccessIndicator = () => {
    return success ? <p>Success!</p> : null;
  };

  return {
    loading,
    withLoading,
    LoadingIndicator,
    ErrorIndicator,
    SuccessIndicator,
  };
}

export default useLoading;
