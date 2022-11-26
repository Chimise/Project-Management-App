import { useCallback, useState } from "react";
import RequestError from "../utils/RequestError";
import useAuth from "./useAuth";

function useRequest<Data = any, Body = any>(fetcher: {
  (values: Body, token: string): Promise<Data>;
}) {
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<RequestError | null>(null);
  const {token} = useAuth();
  const jwt = token || '';

  const sendRequest = useCallback(
    async (values: Body) => {
      setData(null);
      setError(null);
      try {
        const data = await fetcher(values, jwt);
        setData(data);
      } catch (error) {
        const requestError =
          error instanceof RequestError
            ? error
            : new RequestError("An error occured, please try again");
        setError(requestError);
        
      }
    },
    [fetcher, jwt]
  );

  return {
    data,
    error,
    sendRequest
  }
}

export default useRequest;
