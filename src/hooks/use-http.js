import { useState } from "react";
import axios from "../lib/axios";

const useHttp = ({ url, getMovies }) => {
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(url);
      getMovies(response.data.results);
    } catch (error) {
      setError({ error: error.message });
    }
    setIsLoading(false);
  };

  return { sendRequest, error, isLoading };
};

export default useHttp;
