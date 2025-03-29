import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export const useCustomInstance = <T>(instance: AxiosInstance): ((
  config: AxiosRequestConfig,
) => Promise<T>) => {
  return (config: AxiosRequestConfig) => {
    const source = Axios.CancelToken.source();
    const promise = instance({
      ...config,
      cancelToken: source.token,
    }).then(({ data }) => data);

    // @ts-ignore
    promise.cancel = () => {
      source.cancel('Query was cancelled by React Query');
    };

    return promise;
  };
};

export default useCustomInstance;