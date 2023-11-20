import React, { useRef, useState, useEffect } from 'react'
import Keyboard from 'react-simple-keyboard'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import InputMask from 'react-input-mask'
import SimpleKeyboard from 'react-simple-keyboard/' // Substitua 'caminho/para/simple-keyboard' pelo caminho real para a biblioteca no seu projeto
import 'react-simple-keyboard/build/css/index.css'
import './Cadastro.css'

function Cadastro () {
  const [inputs, setInputs] = useState({})
  const [unidade, setUnidade] = useState('')
  const [layoutName, setLayoutName] = useState('default')
  const [inputName, setInputName] = useState('default')
  const keyboard = useRef()
  const selectRef = useRef(null)
  const [erro, setErro] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [fieldsChecked, setFieldsChecked] = useState(false)
  const [telInput, setTelInput] = useState(false)

  const navigate = useNavigate()

  const inputRef = useRef(null)

  const salvar = async () => {
    if (
      inputs.name &&
      inputs.empresa &&
      inputs.email &&
      isEmailValid(inputs.email) &&
      inputs.telefone &&
      isChecked
    ) {
      try {
        const response = await axios.post('http://localhost:3001/cadastros', {
          nome: inputs.name,
          empresa: inputs.empresa,
          email: inputs.email,
          telefone: inputs.telefone
        })
        localStorage.setItem('idJogador', response.data.id)
        navigate('/quiz')
      } catch (error) {
        navigate('/erro')
      }
    } else {
      setErro(true)
    }
  }

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const customLayout = {
    // Defina o layout brasileiro personalizado aqui
    default: [
      '1 2 3 4 5 6 7 8 9 0 {bksp}',
      'Q W E R T Y U I O P',
      'A S D F G H J K L Ç',
      'Z X C V B N M . - _',
      '@ {space} .com .com.br'
    ],
    shift: [
      '1 2 3 4 5 6 7 8 9 0 {bksp}',
      'Q W E R T Y U I O P',
      'A S D F G H J K L Ç',
      '{shift} Z X C V B N M , .',
      '{space}'
    ],
    display: {
      '{bksp}': 'delete'
    }
  }

  const isEmailValid = email => {
    // Expressão regular para validar um e-mail
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

    return emailPattern.test(email)
  }

  useEffect(() => {
    const time = setTimeout(() => {
      setFieldsChecked(false)
    }, 1000)
    return () => clearTimeout(time)
  }, [fieldsChecked])

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }

  function openPopup () {
    const popup = document.getElementById('popup')
    popup.classList.add('show')
  }

  function closePopup () {
    const popup = document.getElementById('popup')
    popup.classList.remove('show')
  }

  const onChangeAll = inputs => {
    let telTemp = (inputs.telefone = inputs.telefone?.replace(/[a-zA-Z]/g, ''))
    let inputTest = keyboard.current.getInput('telefone')
    console.log('Valor real: ' + inputTest)

    console.log('TAMANHO:' + telTemp?.toString().length)
    // if (telTemp?.toString().length == 1 && telTemp != '(') {
    //   telTemp = '(' + telTemp
    // }
    // // console.log(telTemp?.toString().splice(2,0))
    // if (telTemp?.toString().length == 3) {
    //   telTemp =  telTemp + ')'
    // }

    telTemp = telTemp?.replace(/\D/g, '')
    // telTemp = telTemp?.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    if (telTemp?.toString().length == 14) {
      telTemp = telTemp?.replace(/(\d{0,2})(\d{0,4})(\d{0,4})/, '($1) $2-$3')
    }
    else{
      telTemp = telTemp?.replace(/(\d{0,2})(\d{0,5})(\d{0,4})/, '($1) $2-$3')
    }

    inputs.telefone = telTemp
    // Convertendo a string para um array de caracteres
    let telArray = inputs.telefone?.split('')

    // Limitando o array a 15 caracteres usando splice
    telArray?.splice(15)

    // Convertendo o array de volta para uma string
    inputs.telefone = telArray?.join('')

    setInputs({ ...inputs })
    keyboard.current.setInput(inputs.telefone, 'telefone')
    console.log('Inputs changed', inputs.telefone)
  }

  // Você ainda pode obter o valor de entrada usando o método getInput se precisar
  // const inputValue = simpleKeyboard.getInput()

  // console.log(inputValue)

  const handleShift = () => {
    const newLayoutName = layoutName === 'default' ? 'shift' : 'default'
    setLayoutName(newLayoutName)
  }

  const onKeyPress = button => {
    console.log('Button pressed', button)
    if (button === '{bksp}' && inputName === 'telefone') {
      console.log('APAGANDO')
      let minhaString = inputs.telefone
      let novaString = minhaString.slice(0, -1)

      inputs.telefone = novaString

      setInputs({ ...inputs })
      keyboard.current.setInput(inputs.telefone, 'telefone')
    }
    if (button === '{shift}' || button === '{lock}') handleShift()
  }

  const onChangeInput = event => {
    console.log('ENTROU')
    const inputVal = event.target.value
    const formattedValue =
      inputName === 'telefone' ? formatPhoneNumber(inputVal) : inputVal
    console.log('Formato: ' + formattedValue)
    console.log(inputName)

    // setInputs({
    //   ...inputs,
    //   [inputName]: inputVal
    // })
    setInputs({
      ...inputs,
      [inputName]: formattedValue
    })

    // keyboard.current.setInput(inputVal)
    keyboard.current.setInput(formattedValue)
  }

  const getInputValue = inputName => {
    return inputs[inputName] || ''
  }
  const openSelect = () => {
    console.log('Abir Combo')
    if (selectRef.current) {
      selectRef.current.click()
    }
  }

  // useEffect(() => {
  //   console.log('Telefone')
  //   var tel = inputs.telefone
  //   if (tel?.toString().length > 14) {
  //     setTelInput(true)
  //   } else {
  //     setTelInput(false)
  //   }
  //   // console.log(tel.length)
  //   if (tel) {
  //     let phoneNumber = tel.replace(/\D/g, '')

  //     // Aplica a máscara (99) 99999-9999
  //     // let formattedPhoneNumber = phoneNumber.replace(
  //     //   /(\d{2})(\d{5})(\d{4})/,
  //     //   '($1) $2-$3'
  //     // )

  //     let formattedPhoneNumber = phoneNumber

  //     // Convertendo a string para um array de caracteres
  //     let telArray = formattedPhoneNumber?.split('')

  //     // Limitando o array a 15 caracteres usando splice
  //     telArray.splice(15)

  //     // Convertendo o array de volta para uma string
  //     let novaTel = telArray.join('')

  //     setInputs({
  //       ...inputs,
  //       telefone: novaTel
  //     })
  //   }
  // }, [inputs.telefone])

  const formatPhoneNumber = value => {
    // Remove caracteres não numéricos
    const phoneNumber = value.replace(/\D/g, '')

    // Aplica a máscara (99) 99999-9999
    const formattedPhoneNumber = phoneNumber.replace(
      /(\d{2})(\d{5})(\d{4})/,
      '($1) $2-$3'
    )

    return formattedPhoneNumber
  }

  return (
    <div className='cadastro'>
      <div className='fundo'></div>
      {telInput && <div className='bloquear-numero'></div>}
      <div className='text-4'>CADASTRO</div>
      <div className='btn-cadastro' onTouchStart={() => salvar()}>
        CONFIRMA
      </div>
      <div className='inputs'>
        <input
          id='name'
          autoComplete='off'
          ref={inputRef}
          type='text'
          value={getInputValue('name')}
          onFocus={() => setInputName('name')}
          placeholder={'Nome'}
          onChange={onChangeInput}
          className={!inputs.name && erro ? 'input--error' : ''}
        />
        <input
          id='email'
          autoComplete='off'
          type='text'
          value={getInputValue('email')}
          onFocus={() => setInputName('email')}
          placeholder={'Email'}
          onChange={onChangeInput}
          className={
            (!inputs.email || !isEmailValid(inputs.email)) && erro
              ? 'input--error'
              : ''
          }
        />
        <input
          id='empresa'
          autoComplete='off'
          type='text'
          value={getInputValue('empresa')}
          onFocus={() => setInputName('empresa')}
          placeholder={'Empresa'}
          onChange={onChangeInput}
          className={!inputs.empresa && erro ? 'input--error' : ''}
        />
        <input
          id='telefone'
          autoComplete='off'
          type='text'
          value={getInputValue('telefone')}
          onFocus={() => setInputName('telefone')}
          placeholder={'Telefone'}
          onChange={onChangeInput}
          mask='(99) 99999-9999'
          className={!inputs.telefone && erro ? 'input--error' : ''}
        />
        <label className='checkbox-container'>
          <input
            type='checkbox'
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <span className='checkmark'></span>
        </label>
        <div
          className={`termo-text ${erro && !isChecked ? 'text--error' : ''}`}
        >
          Eu li e aceito os{' '}
          <span className='termos' onTouchStart={() => openPopup()}>
            termos e condições
          </span>
          .
        </div>
      </div>
      <div id='popup' className='popup'>
        <div className='popup-content'>
          <button className='close-button' onTouchStart={() => closePopup()}>
            Fechar
          </button>
          {/* <iframe src='Políticas%20de%20Privacidade%20AAV.pdf#toolbar=0'></iframe> */}
          <div className='termos-texto'>
            <h1>TERMOS E CONDIÇÕES</h1>
            Ao preencher este formulário, você concorda com o tratamento de seus
            dados pela Previ, única e exclusivamente para contata-lo
            futuramente. Os dados aqui coletados serão tratados em conformidade
            com a Lei Geral de Proteção de Dados (Lei n. 13.709/2018) e demais
            normas setoriais sobre o tema.
          </div>
        </div>
      </div>
      <div className='keyboard'>
        <Keyboard
          keyboardRef={r => (keyboard.current = r)}
          inputName={inputName}
          layoutName={layoutName}
          onChangeAll={onChangeAll}
          onKeyPress={onKeyPress}
          layout={customLayout}
        />
      </div>
    </div>
  )
}

export default Cadastro
