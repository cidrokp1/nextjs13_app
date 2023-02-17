import { useState, useEffect } from "react";
 

export const useFetchTable = (url, axiosOptions, listItems, updateTable) => {

    const [data, setData] = useState([]);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState("");
    const [isRefetching, setIsRefetching] = useState(false);  
     
    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        setIsRefetching(true);
        fetch(url, axiosOptions)
          .then((response) => {
            setData(response.data);
            setIsError(false);
            setIsLoading(false);
            setIsRefetching(false);
          })
          .catch((error) => {
            setIsError(true);
            setError(error);
            setIsLoading(false);
            setIsRefetching(false);
            console.error(error);
          });
      };
  
      url !== null && !listItems ? fetchData() : setData(listItems);
    }, [updateTable]);


    return { data, setData, isError, error, isRefetching };
}