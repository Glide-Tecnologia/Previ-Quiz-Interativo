import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './StandBy.css'

function Conclusao () {
  const [pontos, setPontos] = useState(0)
  const navigate = useNavigate()

  let redirectPage = 0

  useEffect(() => {
    setPontos(localStorage.getItem('pontos'))
  }, [])

  const redireconar = () => {
    redirectPage += 1
    if(redirectPage == 3){
      setTimeout(() => {
        navigate('/home')
      }, 500)
    }
    
  }
  return (

    <div className='conclusao'>
      <div className="fundo-espera"></div>

      <img src="img/bg-espera.jpg" className="message" />

      <div className='btn-voltar' onClick={redireconar}>
        
      </div>
    </div>
  )
}

export default Conclusao
