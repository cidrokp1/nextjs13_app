"use client"

import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/shared/navbar'; 
import Modal from '../components/shared/Modal';
import { AuthorizationProvider } from '@/context/AuthorizationContext';
import { DataProvider } from '@/context/DataContext'; 
import { ModalProvider } from '@/context/ModalContext';


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className='body'>
        <div className='body-layout'>
          <AuthorizationProvider>
            <DataProvider>
              <ModalProvider>
                <Modal />
                <Navbar />
                <div className='container py-3'>
                  {children}
                </div>
              </ModalProvider>
            </DataProvider>
          </AuthorizationProvider>
          <footer className="footer bg-dark text-white">
            Kevin Lourenço copyrigth@ 2023
          </footer>
        </div>
      </body>
    </html>
  )
}
