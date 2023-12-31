import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Loader.css'
import './Home.css'
import DataVaultComponent from './DataVault'

function Home () {
  const navigate = useNavigate()

  
  const redireconar = () => {
    setTimeout(() => {
      navigate('/cadastro')
    }, 500)
  }

  let countTouch = 0
  const TelaDeEspera = () => {
    console.log('1 ')
    countTouch += 1
    if(countTouch == 3){
      setTimeout(() => {
        navigate('/espera')
      }, 500)
    }
    
  }

  const dataFetchedRef = useRef(false)

  useEffect(() => {
    if (dataFetchedRef.current) return
    dataFetchedRef.current = true
    console.log('Teste 1 ')
  }, [])

  return (
    <div>
      <div className='btn-espera' onClick={TelaDeEspera}></div>
      <div
        className='home'
        onTouchStart={() => redireconar()}
        onClick={() => redireconar()}
      >
        <iframe
          className='loader-frame'
          src='http://localhost/configuracao/'
          title='Loader'
        ></iframe>
        
        
        {/* <img src='img/azul marinho.png' className='azul-marinho' /> */}
        <div className='touch'>
          <img src='img/touch.png' className='touch__img' />
          <div className='touch__txt'>
            <span>TOQUE</span> PARA TESTAR <br></br>SEUS CONHECIMENTOS
          </div>
        </div>
        <div className='titulo-home'>QUIZ</div>
        <DataVaultComponent />
      </div>
    </div>
  )
}

export default Home
