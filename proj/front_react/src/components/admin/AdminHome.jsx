
import Sidebar from './../Sidebar'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Professors from './Professors';
import SideBarAdmin from './SideBarAdmin'

const AdminHome = () => {

  return (
   
   <>

   <SideBarAdmin />
   <div class="lg:ml-64">
    <Professors/>
  </div>
   </>
  )
}

export default AdminHome
