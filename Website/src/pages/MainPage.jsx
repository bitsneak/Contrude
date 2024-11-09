import React from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import Workspace from '../components/Workspace'


const MainPage = () => {
  return (
    <div className='flex h-screen'>
      <Sidebar/>
      
      <div className='flex-grow flex flex-col'>
        <Topbar></Topbar>
        <Workspace></Workspace>
      </div>
    </div>
  )
}

export default MainPage
