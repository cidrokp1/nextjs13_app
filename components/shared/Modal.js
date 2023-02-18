"use client"
import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";  
import { useModalContext } from "@/context/ModalContext";
const Modal = () => {
  const {
    modal: { open, body, maxWidth, title, footer, submitBtnText, onSubmit },
    closeModal,
  } = useModalContext();



  const handleSubmit = () => {
    //put your validation logic here
    try {
      onSubmit();
    } catch (Ex) { }
    closeModal();
  };

  return (
    <Dialog open={open} maxWidth={maxWidth ? maxWidth : "md"} fullWidth={true}>
      <>
        <DialogTitle textAlign="center">{title}</DialogTitle>
        <DialogContent>
          <div className="my-3">
            {body}
          </div>
        </DialogContent>
        {footer ? (
          footer
        ) : (
          <DialogActions sx={{ p: "1.25rem" }}>
            <Button onClick={closeModal}>Cancelar</Button>
            <Button color="primary" onClick={handleSubmit} variant="contained">
              {submitBtnText ? <>{submitBtnText}</> : <>Ok</>}
            </Button>
          </DialogActions>
        )}
      </>
    </Dialog>
  );
};

export default Modal;
