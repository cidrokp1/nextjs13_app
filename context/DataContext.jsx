"use client"

import React, { createContext, useState, useEffect } from "react";
import Notiflix from "notiflix";


const DataContext = createContext({});

export const DataProvider = ({ children }) => {
 
  const [alertas, setAlertas] = useState({});
  // fetch(process.env.REACT_APP_API_URL + "/api/alertas")
  // .then((res) => res.json())
  // .then((data) => setAlertas(data));
  

  // const [maxWidthPages, setMaxWidthPages] = useState(localStorage.getItem("largura") === "grande" ? "grande" : "");
  // useEffect(() => {
  //   localStorage.setItem("largura", maxWidthPages);
  // }, [maxWidthPages]);

 

  const fetchHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };
  
  const url = "http://localhost:8000/api";

  const handleErrors = (error) => {
    console.log(
      "Erro: \n" +
      error.message +
      "\n" +
      JSON.stringify(error.response?.data) 
    );
    console.log(error);
    const errorMessage = process.env.REACT_APP_DEBUG === "true"
        ? JSON.stringify(error.response?.data)
        : "";
    Notiflix.Notify.failure("Erro:  \n" + error.message + "\n" + errorMessage); 
  };


  return (
    <DataContext.Provider
      value={{ 
        fetchHeaders, 
        handleErrors,
        alertas,
        url,
        // maxWidthPages,
        // setMaxWidthPages
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
