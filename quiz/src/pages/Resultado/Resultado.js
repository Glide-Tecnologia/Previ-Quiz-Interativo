import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Resultado.css'

function Resultado () {
  const [ganhadores, setGanhadores] = useState(0)
  const [quantidadeJogadores, setQuantidadeJogadores] = useState(0)
  const [pontos, setPontos] = useState(0)
  const [porcentagem, setPorcentagem] = useState(0)
  const navigate = useNavigate()

  const redireconar = () => {
    setTimeout(() => {
      navigate('/conclusao')
    }, 500)
  }
  useEffect(() => {
    setPontos(localStorage.getItem('pontos'))
    setPorcentagem(
      parseFloat(((ganhadores / quantidadeJogadores) * 100).toFixed(0))
    )
    if (pontos <= 3)
      setPorcentagem(
        100 - parseFloat(((ganhadores / quantidadeJogadores) * 100).toFixed(0))
      )
    if (!(parseFloat(((ganhadores / quantidadeJogadores) * 100).toFixed(0)) >= 0))
      setPorcentagem(0)
    consultarInfo()
  })

  const consultarInfo = async () => {
    let dados
    try {
      const response = await axios.get('http://localhost:3001/ganhadores')
      console.log(response.data[0].ganhadores)
      setGanhadores(response.data[0].ganhadores)
    } catch (error) {
      console.error('Erro ao buscar a quantidade:', error)
    }
    try {
      const response = await axios.get('http://localhost:3001/quantidade')
      console.log(response.data[0].quantidade)
      setQuantidadeJogadores(response.data[0].quantidade)
    } catch (error) {
      console.error('Erro ao buscar a quantidade:', error)
    }
  }
  return (
    <div className='resultado'>
      <img src='img/e2.png' className='e2' />
      <div className='resultado__texto'>
        {pontos > 3 ? (
          <div>
            Você está dentro dos {porcentagem}% <br></br>
            que acertaram mais<br></br>
            de 3 perguntas!<br></br>
          </div>
        ) : (
          <div>
            Você está dentro dos {porcentagem}% <br></br>
            que não acertaram mais<br></br>
            de 3 perguntas!<br></br>
          </div>
        )}
        <br></br>
        <div className='resultado__titulo'>GABARITO:</div>
        <div className='resultado__alternativa'>
          1 | Alternativa B<br></br>2 | Alternativa C<br></br>3 | Alternativa D
          <br></br>4 | Alternativa A<br></br>5 | Alternativa D<br></br>
        </div>
      </div>
      <div className='btn-confirma' onTouchStart={redireconar}>
        CONCLUIR
      </div>
    </div>
  )
}

export default Resultado
