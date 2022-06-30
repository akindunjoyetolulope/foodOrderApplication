import { useState, useCallback } from "react";

const useHttp = () => {
  const [ispending, setIsPending] = useState(true);
  const [isErr, setIsErr] = useState(null);

  const sendReq = useCallback(async (config, applyData) => {
    setIsPending(true);
    setIsErr(null);
    try {
      const response = await fetch(config.url, {
        method: config.method ? config.method : "GET",
        body: config.body ? JSON.stringify(config.body) : null,
        headers: config.header ? config.header : {},
      });
      if (!response.ok) {
        throw Error("request failed!!");
      }

      const data = await response.json();
      applyData(data);
    } catch (err) {
      setIsErr(err.messge || "something went wrong");
    }
    setIsPending(false);
  },[]);

  return { ispending, isErr, sendReq };
};

export default useHttp;
