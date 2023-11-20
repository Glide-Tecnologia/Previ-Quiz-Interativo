import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Conclusao.css'

function Conclusao () {
  const [pontos, setPontos] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    setPontos(localStorage.getItem('pontos'))
  }, [])

  const redireconar = () => {
    setTimeout(() => {
      navigate('/home')
    }, 500)
  }
  return (
    <div className='conclusao'>
      <div className='fundo'></div>
      {pontos > 3 ? (
        <div className='conclusao__texto'>
          <div className='conclusao__titulo'>Parabéns!</div>
          Você mostrou o quanto está engajado com os temas que envolvem
          a Previ.
          <br></br>
          <br></br>
          <br></br>
          Até a próxima!
        </div>
      ) : (
        <div className='conclusao__texto'>
          <div className='conclusao__titulo'>Não desista!</div>
          Cada desafio é uma chance de aprender. A vitória está logo ali.
          <br></br>
          <br></br>
          Continue tentando!
        </div>
      )}
      <div className='btn-confirma' onTouchStart={redireconar}>
        TELA INICIAL
      </div>
    </div>
  )
}

export default Conclusao
