import { useCallback, useEffect, useState } from "react";

// This options will be passed by default if the user doesn't add their own options as an argument

const useFetch = (endpointProps: string) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [endpoint, setEndpoint] = useState(endpointProps);

  const fetchJSON = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(endpoint, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
      });
      const data = await response.json();

      if (response.status === 200) return setData(data?.results);
    } catch (err: any) {
      console.log(err);
      return setError(err);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchJSON();
  }, [fetchJSON]);

  const refetch = () => {
    fetchJSON();
  };

  return {
    data,
    loading,
    error,
    refetch,
    setEndpoint,
  };
};

export default useFetch;
