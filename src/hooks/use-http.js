import { useState } from "react";
import axios from "../lib/axios";

const useHttp = ({ url, getMovies, getActor }) => {
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(url);

      if (response.data.results) {
        getMovies(response.data.results);
      } else {
        getActor(response.data);
      }
    } catch (error) {
      setError({ error: error.message });
    }
    setIsLoading(false);
  };

  return { sendRequest, error, isLoading };
};

export default useHttp;
