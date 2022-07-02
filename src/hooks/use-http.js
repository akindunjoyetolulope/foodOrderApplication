import { useState, useCallback } from "react";


const useHttp = () => {
  const [isPending, setIsPending] = useState(false);
  const [didSubmit, setdidSubmit] = useState(false);
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
      setIsPending(false);
      setIsErr(err.message || "something went wrong");
    }
    setIsPending(false);
    setdidSubmit(true)
  },[]);

  return { isPending, isErr, sendReq, didSubmit};
};

export default useHttp;
