"use client"

import React , { createContext, useState, useEffect } from "react"; 

  
const AuthorizationContext = createContext({});

export const AuthorizationProvider = ({ children }) => { 
 
  // fetch(process.env.REACT_APP_API_URL + "/api/admin/login/")
  // fetch("http://localhost:8000/admin")
  // .then((res) => res.json())
  // .then((data) => setLogin(data.login))
  // .catch((err) => console.log(err));
  
  const [login, setLogin] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [isAdmin, setIsAdmin] = useState(true);
  const [isGestor, setIsGestor] = useState(false);

   

  // // AUTENTICAÇÃO E AUTORIZAÇÃO
  // useEffect(() => {
  //   console.log("Env: " + process.env.NEXT_PUBLIC_LOCAL_API)  

  //   login && setIsAuthenticated("true");
      
  //   login.roles && setIsAdmin(login.roles.some((item)=>
  //     item.selected && item.name === "Admin"
  //   )); 
 
  //   login.roles && setIsGestor(login.roles.some((item)=>
  //   item.selected && item.name === "Gestor"
  // ));  

  //   login.roles && login.roles.some((item)=>
  //     item.selected && item.name === "Admin"
  //   ) && 
  //   console.log(login);  
  // }, [login]);

  
  
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
