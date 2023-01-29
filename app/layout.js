"use client"
import a from 'next/link'
import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';

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
        <nav className="navbar navbar-dark  navbar-expand-md bg-dark">  
          <div className="container-fluid"> 
            <a className="navbar-brand" href={'/'}>Logo</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarToggler">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className='nav-link' href={'/gestao'}>Gestão</a>
                </li> 
               <li className="nav-item">
                  <a className='nav-link' href={'/candidaturas'}>Candidaturas</a>
                </li>
               <li className="nav-item">
                  <a className='nav-link' href={'/dashboards'}>Dashboards</a>
                </li>
              </ul>

              <ul className='navbar-nav ms-auto mb-2 mb-lg-0'> 
               <li className="nav-item">
                  <a className='nav-link' href={'/notificacoes'}><NotificationsIcon/></a>
                </li>
               <li className="nav-item">
                  <a className='nav-link' href={'/perfil'}><AccountCircleIcon/></a>
                </li>
               <li className="nav-item">
                  <a className='nav-link' href={'/settings'}><SettingsIcon/></a>
                </li>
              </ul>
            </div>
          </div> 
        
        </nav>
        <div className='container py-3'>
          {children}
        </div>
          <footer className="footer bg-dark text-white">
            footer information
          </footer>
        </div>
      </body>
    </html>
  )
}
