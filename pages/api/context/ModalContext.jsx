import React, { useState, createContext } from 'react'   
import { useContext } from 'react';
 
//CONTEXT
const ModalContext = createContext({});
 
//PROVIDER
const ModalProvider = ({ children }) => { 
   
  const [modal, setModal] = useState({open: false,  title: "" });


  const openModal = (payload) => {
    setModal({...payload, open: true});
  }
  const closeModal = () => {
    setModal({open: false});
  }

  return (
    <ModalContext.Provider
      value={{  
        modal, 
        openModal,
        closeModal
      }}
    >
    {children}
  </ModalContext.Provider> 
  );
};

//HOOK
const useModalContext = () => {
  const context = useContext(ModalContext);
  return context;
}

export {ModalProvider, useModalContext} ;
