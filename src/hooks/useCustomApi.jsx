import {useEffect} from 'react';
import {useState} from 'react';
import {useCustomToast} from './useCustomToast';

const useCustomApi = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const {showToast} = useCustomToast();

  useEffect(() => {
    const type = error ? 'danger' : 'success';
    if (message) {
      showToast(message, type);
    }
  }, [message]);

  const callApi = async (apiFunc, params, isBtnLoading = false) => {
    !isBtnLoading && setIsLoading(true);
    isBtnLoading && setIsBtnLoading(true);
    let response;
    try {
      response = await apiFunc(params);
      setSuccess(true);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
      setIsBtnLoading(false);
    }
    return response?.data ? response.data : null;
  };

  return {error, isLoading, callApi, success, setMessage, isBtnLoading};
};

export default useCustomApi;
