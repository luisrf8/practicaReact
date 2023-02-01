import React from 'react'
import { Routes , Route } from 'react-router-dom'

// Pages 
import Home from "../pages/Home/Home"
export default function Router() {
  return (
    <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/artist' exact element={<h1>Artistas</h1>}/>
        <Route path='/settings' element={<h1>Configuracion de cuenta</h1>} exact/>
    </Routes>
  )
}
