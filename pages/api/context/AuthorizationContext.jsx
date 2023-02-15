"use client"

import React , { createContext, useState, useEffect } from "react"; 

  
const AuthorizationContext = createContext({});

export const AuthorizationProvider = ({ children }) => { 
 

  const [login, setLogin] = useState({});
  fetch(process.env.REACT_APP_API_URL + "/api/admin/login/")
  .then((res) => res.json())
  .then((data) => setLogin(data));
  
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [isAdmin, setIsAdmin] = useState(false);
  const [isGestor, setIsGestor] = useState(false);

   

  //AUTENTICAÇÃO E AUTORIZAÇÃO
  useEffect(() => {
    // console.log("Env: " + process.env.REACT_APP_API_URL) 
 
    login && setIsAuthenticated("true");
      
    login.roles && setIsAdmin(login.roles.some((item)=>
      item.selected && item.name === "Admin"
    )); 
 
    login.roles && setIsGestor(login.roles.some((item)=>
    item.selected && item.name === "Gestor"
  ));  

    login.roles && login.roles.some((item)=>
      item.selected && item.name === "Admin"
    ) && 
    console.log(login);  
  }, [login]);

  
  
  return (
    <AuthorizationContext.Provider
      value={{  
        login,
        isAdmin,
        isGestor,  
        isAuthenticated, 
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthorizationContext.Provider>
  );
};

export default AuthorizationContext;
