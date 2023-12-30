import React from 'react'
import Logout from '../auth/Logout'
import Sidebar from '../Sidebar'
import Tooth from './Tooth'
import Profil from './Profil'
import Group from './Group'
import Groupe from './Groupe_student'

import NotFound404 from '../auth/NotFound404'
import { useParams } from 'react-router-dom'
import Student from './Student'
import PW from './PW'
import Dashboard from './Dashboard'
import Statistiques from './Statistiques'

const ProfHome = () => {
  const { componentName } = useParams();

  const renderComponent = () => {
    switch (componentName) {
      case 'dashboard':
        return (
          <div className='w-4/5'>
            <Dashboard />
            <Sidebar />
          </div>);
           case 'groupe':
            return (
              <div className='w-4/5'>
                <Groupe />
                <Sidebar />
              </div>);
      case 'teeth':
        return (
          <div className='w-4/5'>
            <Tooth />
            <Sidebar />
          </div>);
      case 'profil':
        return (<div className='w-4/5'>
          <Profil />
          <Sidebar />
        </div>);
      case 'group':
        return (
          <div className='w-4/5'>
            <Group />
            <Sidebar />
          </div>);
      case 'student':
        return (
          <div className='w-4/5'>
            <Student />
            <Sidebar />
          </div>);
      case 'pw':
        return (
          <div className='w-4/5'>
            <PW />
            <Sidebar />
          </div>);
      case 'stats':
        return (
          <div className='w-4/5'>
            <Statistiques />
            <Sidebar />
          </div>);
      default:
        window.location = '/we';
    }
  };
  return (
    <div className='bg-gray-300 ml-64 flex flex-col items-center  min-h-screen font-[Poppins]'>

      {renderComponent()}

    </div>
  )
}

export default ProfHome
