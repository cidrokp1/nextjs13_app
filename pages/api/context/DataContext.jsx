"use client"

import React, { createContext, useState, useEffect } from "react";
// import alertify from "alertifyjs";
// import "alertifyjs/build/css/alertify.css"; 


const DataContext = createContext({});

export const DataProvider = ({ children }) => {
 
  const [alertas, setAlertas] = useState({});
  fetch(process.env.REACT_APP_API_URL + "/api/alertas")
  .then((res) => res.json())
  .then((data) => setAlertas(data));
  

  const [isLoading, setIsLoading] = useState(false);

  const [maxWidthPages, setMaxWidthPages] = useState(localStorage.getItem("largura") === "grande" ? "grande" : "");

  const axiosOptions = {
    withCredentials: true,
    mode: "no-cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  };

  const handleErrors = (error) => {
    console.log(
      "Erro: \n" +
      error.message +
      "\n" +
      JSON.stringify(error.response?.data)
      // JSON.stringify(error.response)
    );
    console.log(error);
    const errorMessage =
      process.env.REACT_APP_DEBUG === "true"
        ? JSON.stringify(error.response?.data)
        : "";
    alertify.error("Erro:  \n" + error.message + "\n" + errorMessage);
    setIsLoading(false);
  };

  useEffect(() => {
    localStorage.setItem("largura", maxWidthPages);
  }, [maxWidthPages]);

  return (
    <DataContext.Provider
      value={{
        axiosOptions,
        setIsLoading,
        handleErrors,
        alertas,
        maxWidthPages,
        setMaxWidthPages
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
