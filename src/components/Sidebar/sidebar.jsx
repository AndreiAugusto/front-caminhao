import React from 'react';
import '../../app.css';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';
import {BiLogOut} from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

export function Sidebar({openSidebarToggle, OpenSidebar}) {

    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <ul className='sidebar-list d-flex align-items-start flex-column'>
            <li className='sidebar-list-item' onClick={() => navigate('/dashboard')}>
                Dashboard
            </li>
            <li className='sidebar-list-item' onClick={() => navigate('/manutencao')}>
                Manutençoes
            </li>
            <li className='sidebar-list-item' onClick={() => navigate('/caminhao')}>
                Caminhões
            </li>
            <li className='sidebar-list-item' onClick={() => navigate('/oficina')}>
                Oficinas
            </li>
            <li onClick={logout} className='sidebar-list-item'>
                <BiLogOut className='icon'/>Sair
            </li>
        </ul>
    </aside>
  )
}
