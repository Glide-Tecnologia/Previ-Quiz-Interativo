import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cadastro from './pages/Cadastro/Cadastro'
import Quiz from './pages/Quiz/Quiz'
import Resultado from './pages/Resultado/Resultado'
import Conclusao from './pages/Conclusao/Conclusao'
import StandBy from './pages/StandBy/StandBy'
import './App.css'

function App () {

  return (
    <BrowserRouter>
        <img src='img/bg.jpg' className='bg' />
        <img src="img/previ_logo.png" className='previ-logo' />
      
      
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/cadastro' element={<Cadastro />}></Route>
        <Route path='/quiz' element={<Quiz />}></Route>
        <Route path='/resultado' element={<Resultado />}></Route>
        <Route path='/conclusao' element={<Conclusao />}></Route>
        <Route path='/espera' element={<StandBy />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
