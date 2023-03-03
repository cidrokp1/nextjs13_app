"use client"
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications'; 
import Perfil from '../../app/perfil/page';
import Notificacoes from '../../app/notificacoes/page';
import Settings from '../../app/settings/page'; 
import { useModalContext } from '@/context/ModalContext';

 
export default function Navbar() {

    const { openModal, closeModal } = useModalContext();


    return (
        <>
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
                                <a className='nav-link' onClick={() => {
                                    openModal({
                                        title: "Notificações",
                                        // submitBtnText: "Salvar",
                                        body: <Notificacoes /> 
                                    });
                                }}><NotificationsIcon /></a>
                            </li>
                            <li className="nav-item"> 
                                <a className='nav-link' onClick={() => {
                                    openModal({
                                        title: "Perfil do User",
                                        // submitBtnText: "Salvar",
                                        body: <Perfil /> 
                                    });
                                }}><AccountCircleIcon /></a>
                            </li>
                            <li className="nav-item"> 
                                <a className='nav-link' onClick={() => {
                                    openModal({
                                        title: "Preferências", 
                                        body: <Settings /> 
                                    });
                                }}><SettingsIcon /></a>
                            </li>
                        </ul>
                    </div>
                </div>

            </nav>
 
        </>
    )
}