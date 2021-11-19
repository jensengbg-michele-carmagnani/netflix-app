import { useEffect, useState } from "react";
import axios from "../lib/axios";

const useHttp = (url) => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(url);
        setMovies(response.data.results);
      } catch (error) {
        setError(true);
        switch(error){

        }
      }
      setIsLoading(false);
    };
    sendRequest();
  }, []);
  return { movies, error, isLoading };
};

export default useHttp;
