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
      try {
        const data = await fetcher(values, jwt);
        setData(data);
        setError(null);
      } catch (error) {
        const requestError =
          error instanceof RequestError
            ? error
            : new RequestError("An error occured, please try again");
        setError(requestError);
        setData(null);
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
