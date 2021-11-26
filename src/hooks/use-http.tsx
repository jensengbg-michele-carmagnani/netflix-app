import { useState } from "react";
import axios from "../lib/axios";
import { Https, Result } from "../../types/UseHttp";
import { errorMsg } from "../../types/MovieDetails";


const useHttp: React.FC<Https> = ({ url, getMovies, getActor }) => {
  const [error, setError] = useState<errorMsg>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendRequest = async ():Promise<any> => {
    setIsLoading(true);
    setError({ message: "", errorType: "" });
    try {
      const response = await axios.get(url);

      if (response.data.results) {
        getMovies(response.data.results);
      } else {
        getActor(response.data);
      }
    } catch (error) {
      setError({ message: error.message, errorType: error.error });
    }
    setIsLoading(false);
  };

  return { sendRequest, error, isLoading };
};

export default useHttp;
