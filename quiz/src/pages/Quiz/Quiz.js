import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios, { formToJSON } from 'axios'
import './Quiz.css'

const PERGUNTAS = [
  {
    pergunta: 'Qual é o percentual da contribuição mínima para o Previ Futuro?',
    opcoes: [
      '5% do salário',
      '7% do salário',
      '10% do salário',
      '15% do salário'
    ],
    respostaCorreta: 'B',
    numPergunta: '1'
  },
  {
    pergunta:
      'Quais são os benefícios adicionais que os participantes do Previ Futuro têm direito?',
    opcoes: [
      'Dedução de até 12% no IR',
      'Clube de Benefícios',
      'Empréstimos e Financiamento Imobiliário',
      'Todas as opções'
    ],
    respostaCorreta: 'D',
    numPergunta: '2'
  },
  {
    pergunta:
      'Que opção tem apenas pessoas que podem ser beneficiárias do Previ Futuro?',
    opcoes: [
      'Filhos de qualquer idade, pais e cônjuge',
      'Cônjuge, ex-cônjuge e filhos menores de 24 anos',
      'Irmãos de qualquer idade, ex-cônjuge e',
      'Nenhuma das opções'
    ],
    respostaCorreta: 'B',
    numPergunta: '3'
  },
  {
    pergunta:
      'Quando posso responder ao questionário de Análise do Perfil de Investidor (API)?',
    opcoes: [
      'Somente em janeiro',
      'Em janeiro e em junho',
      'Em junho e em dezembro',
      'A qualquer momento'
    ],
    respostaCorreta: 'D',
    numPergunta: '4'
  },
  {
    pergunta:
      'Qual é o prazo de carência para migração de perfil de investimento?',
    opcoes: ['3 meses', '4 meses', '6 meses', '12 meses'],
    respostaCorreta: 'C',
    numPergunta: '5'
  },
  {
    pergunta:
      'Qual é o percentual da contrapartida do BB nas contribuições mínimas do Previ Futuro?',
    opcoes: ['50%', '80%', '100%', 'Nenhuma'],
    respostaCorreta: 'C',
    numPergunta: '6'
  },
  {
    pergunta:
      'O que é possível fazer na Previ para manter o nível da aposentadoria quando ocorre uma redução de salário?',
    opcoes: [
      'Redução da Renda de Aposentadoria',
      'Redução da cobertura de risco',
      'Preservação do Salário de Participação',
      'Nenhuma das alternativas'
    ],
    respostaCorreta: 'C',
    numPergunta: '7'
  },
  {
    pergunta:
      'Imagine que você teve uma redução de salário e tem um financiamento imobiliário na Previ. Qual é a melhor opção para arcar com o valor da prestação?',
    opcoes: [
      'Contratar um empréstimo para pagar as prestações',
      'Aguardar, pois a prestação diminui automaticamente',
      'Cancelar as contribuições para a Previ',
      'Cancelar os Pecúlios da Previ'
    ],
    respostaCorreta: 'B',
    numPergunta: '8'
  },
  {
    pergunta:
      'O que é considerado no cálculo da Pontuação Individual do Participante (PIP) no Previ Futuro?',
    opcoes: [
      'Crescimento salarial',
      'Tempo de vinculação ao plano',
      'Crescimento do salário médio anual',
      'Todas as opções'
    ],
    respostaCorreta: 'D',
    numPergunta: '9'
  },
  {
    pergunta: 'Quantos perfis de investimento o Previ Futuro possui?',
    opcoes: ['2 perfis', '4 perfis', '8 perfis', 'Nenhum'],
    respostaCorreta: 'C',
    numPergunta: '10'
  },
  {
    pergunta:
      'O que diferencia a estratégia de alocação dos ativos nos perfis Ciclo de Vida?',
    opcoes: [
      'Data da aposentadoria',
      'Data-alvo da aposentadoria',
      'Data de contratação no BB',
      'Data do encerramento do plano'
    ],
    respostaCorreta: 'B',
    numPergunta: '11'
  },
  {
    pergunta: 'Quais são os perfis do tipo Risco Alvo?',
    opcoes: [
      'Conservador, Moderado, Ajustado e Agressivo',
      'Conservador, Moderado, Arrojado e Agressivo',
      'Conservador, Moderno, Arrojado e Avançado',
      'Cauteloso, Moderado, Ajustado e Avançado'
    ],
    respostaCorreta: 'B',
    numPergunta: '12'
  },
  {
    pergunta: 'Quais são os perfis do tipo Data Alvo?',
    opcoes: [
      'Conservador, moderado, arrojado e agressivo',
      'Cauteloso, moderado, ajustado, avançado',
      'Ciclo de vida 2030, ciclo de vida 2040, ciclo de vida 2050, ciclo de vida 2060',
      'Conservador, moderno, arrojado e avançado'
    ],
    respostaCorreta: 'C',
    numPergunta: '13'
  },
  {
    pergunta:
      'Imagine que você contratou um Empréstimo Simples na Previ considerando seu orçamento mensal atual, porém foi surpreendido com uma despesa extra momentânea. Entre as alternativas, qual seria a melhor opção para organizar suas finanças sem perder qualidade de vida e segurança?',
    opcoes: [
      'Reduzir a prestação do empréstimo, com uma Renegociação ou Renovação',
      'Suspender momentaneamente gastos com seguros, previdência e plano de saúde',
      'Pedir dinheiro emprestado a um colega, pagando quando puder',
      'Todas as alternativas anteriores'
    ],
    respostaCorreta: 'A',
    numPergunta: '14'
  },
  {
    pergunta:
      'Qual das opções a seguir é uma característica da Previdência Complementar no Brasil?',
    opcoes: [
      'Administrada por entidades abertas e fechadas',
      'Filiação facultativa',
      'Pode ser utilizada para dedução tributária',
      'Todas as alternativas anteriores'
    ],
    respostaCorreta: 'D',
    numPergunta: '15'
  },
  {
    pergunta: 'Quais valores formam o saldo de conta do Previ Futuro?',
    opcoes: [
      'Apenas as contribuições pessoais',
      'Apenas as contribuições patronais',
      'Contribuições pessoais, patronais e rentabilidade.',
      'Nenhuma das alternativas'
    ],
    respostaCorreta: 'C',
    numPergunta: '16'
  },
  {
    pergunta: 'Como posso consultar o meu saldo de conta do Previ Futuro?',
    opcoes: [
      'Não é possível consultar',
      'Pelo Autoatendimento no site ou no app',
      'Pelo Fale Conosco',
      'Pelas redes sociais da Previ'
    ],
    respostaCorreta: 'B',
    numPergunta: '17'
  },
  {
    pergunta:
      'Qual é a opção que melhor representa um dos objetivos da previdência complementar?',
    opcoes: [
      'Garantir qualidade de vida, com saúde, educação e segurança',
      'Garantir renda adicional ao benefício do INSS, com a manutenção do padrão de vida',
      'Garantir retorno de investimentos com altos rendimentos e superávits',
      'Garantir o mesmo salário da ativa após a aposentadoria'
    ],
    respostaCorreta: 'B',
    numPergunta: '18'
  },
  {
    pergunta:
      'Quais são as condições para receber a Renda Mensal de Aposentadoria no Previ futuro?',
    opcoes: [
      'Ter 50 anos ou estar aposentado pelo INSS',
      'Ter cumprido a carência de 120 contribuições',
      'Ter rescindido o vínculo empregatício com o BB',
      'Todas as opções acima'
    ],
    respostaCorreta: 'D',
    numPergunta: '19'
  },
  {
    pergunta:
      'Quando ocorre uma redução salarial, por quanto tempo fica disponível a opção de preservação do salário de participação?',
    opcoes: [
      '90 dias corridos do dia 20 do mês da perda de remuneração',
      'Indefinidamente, a partir da perda de remuneração',
      '2 dias úteis após a perda de remuneração',
      '1 ano após a aposentadoria, quando a perda for maior que 50% do salário'
    ],
    respostaCorreta: 'A',
    numPergunta: '20'
  },
  {
    pergunta: 'O Previ Futuro é um plano de benefício de que tipo?',
    opcoes: [
      'Contribuição Variável',
      'Benefício Definido',
      'Contribuição Definida',
      'Nenhuma das alternativas'
    ],
    respostaCorreta: 'A',
    numPergunta: '21'
  },
  {
    pergunta: 'O que influencia no valor da aposentadoria do Previ Futuro?',
    opcoes: [
      'Tempo de contribuição',
      'Valor da contribuição',
      'Rentabilidade dos investimentos',
      'Todas as opções acima'
    ],
    respostaCorreta: 'D',
    numPergunta: '22'
  },
  {
    pergunta: 'Quais são as coberturas disponíveis para adesão na Capec?',
    opcoes: [
      'Morte, Invalidez, Especial e Mantença',
      'Morte, Pensão e Funerária',
      'Morte, Invalidez, Licença-saúde e Funerária',
      'Pensão por Morte, Residencial e Especial'
    ],
    respostaCorreta: 'A',
    numPergunta: '23'
  },
  {
    pergunta: 'Quem pode aderir ao Previ Família?',
    opcoes: [
      'Quem já é associado da Previ',
      'Cunhados de associados',
      'Filhos de associados',
      'Todas as opções acima'
    ],
    respostaCorreta: 'D',
    numPergunta: '24'
  },
  {
    pergunta: 'Qual é o valor mínimo da contribuição no Previ Família?',
    opcoes: [
      '7% do salário',
      'R$ 100 mensais',
      'R$ 500 mensais',
      '12% do salário'
    ],
    respostaCorreta: 'B',
    numPergunta: '25'
  }
]

function Quiz () {
  const navigate = useNavigate()
  const [newPergunta, setNewPergunta] = useState(PERGUNTAS)
  const [perguntaAtual, setPerguntaAtual] = useState(0)
  const [pontos, setPontos] = useState(0)
  const [respostasDoUsuario, setRespostasDoUsuario] = useState(
    Array(5).fill('')
  )
  const [mostrarBotaoConfirmar, setMostrarBotaoConfirmar] = useState(false)

  const [mostrarRespostaCorreta, setMostrarRespostaCorreta] = useState(false)

  useEffect(() => {
    newPergunta.sort(() => Math.random() - 0.5)
    // newPergunta.slice(0, 5)
    setNewPergunta(prevPerguntas =>
      prevPerguntas.sort(() => Math.random() - 0.5).slice(0, 5)
    )

    console.log('CORTE')

    console.log(newPergunta)
  }, [])

  const selecionarResposta = resposta => {
    if (!mostrarRespostaCorreta) {
      const novasRespostas = [...respostasDoUsuario]
      novasRespostas[perguntaAtual] = resposta
      setRespostasDoUsuario(novasRespostas)
      setMostrarBotaoConfirmar(true)
    }
  }

  const lidarComResposta = () => {
    setMostrarBotaoConfirmar(false)
    if (!mostrarRespostaCorreta) {
      const respostaSelecionada = respostasDoUsuario[perguntaAtual]
      const respostaCorreta = newPergunta[perguntaAtual].respostaCorreta
      const pontosGanhos = respostaSelecionada === respostaCorreta ? 1 : 0 // Adicione pontos se a resposta estiver certa

      const novasRespostas = [...respostasDoUsuario]
      novasRespostas[perguntaAtual] =
        newPergunta[perguntaAtual]['numPergunta'] + '-' + respostaSelecionada // gostaria de adicionar o número da pergunta tbm
      setRespostasDoUsuario(novasRespostas)
      console.log(novasRespostas)

      // Adicione os pontos à variável de pontos
      setPontos(pontos + pontosGanhos)

      localStorage.setItem('respostas', respostasDoUsuario)
      localStorage.setItem('pontos', pontos + pontosGanhos)
      setMostrarRespostaCorreta(true) // Mostra a resposta correta

      setTimeout(() => {
        if (perguntaAtual < 4) {
          setPerguntaAtual(perguntaAtual + 1)
          setMostrarRespostaCorreta(false) // Reinicia o estado para a próxima pergunta
        } else {
          // Fim do quiz, você pode adicionar lógica para calcular a pontuação aqui
          console.log('Respostas do usuário:', respostasDoUsuario)
          console.log('Pontos:', pontos + pontosGanhos)
          // Redirecione o usuário para a página de resultado ou outra ação desejada
          // navigate('/resultado')
          salvar(pontos + pontosGanhos)
        }
      }, 1000) // Espera 3 segundos para a próxima pergunta
    }
  }

  const salvar = async _pontos => {
    try {
      const id = parseInt(localStorage.getItem('idJogador')) // Substitua 1 pelo ID do jogador que deseja atualizar
      const nome = localStorage.getItem('nome')
      const email = localStorage.getItem('email')
      const empresa = localStorage.getItem('empresa')
      const telefone = localStorage.getItem('telefone')

      var data = new Date()
      var tbClientes = localStorage.getItem('tbClientes')
      tbClientes = JSON.parse(tbClientes)

      if (tbClientes == null) tbClientes = []

      var cliente = JSON.stringify({
        Nome: nome,
        Email: email,
        Empresa: empresa,
        Telefone: telefone,
        Pontos: _pontos,
        Date: data
      })

      tbClientes.push(cliente)
      localStorage.setItem('tbClientes', JSON.stringify(tbClientes))

      const response = await axios.put(
        `http://localhost:3001/cadastros/${id}`,
        {
          respostasDoUsuario: JSON.stringify(respostasDoUsuario),
          pontos: _pontos
        }
      )
      console.log('SALVOU')
      navigate('/conclusao')
    } catch (error) {
      console.log('ERRO', error)
      // Lidar com o erro, como redirecionar para a página de erro
    }
  }

  return (
    <div className='quiz'>
      <div className='fundo'></div>
      <div className='quiz-bloco'>
        <div className='pergunta'>
          <div className='letra'>{perguntaAtual + 1}.</div>
          <div
            className='texto'
            dangerouslySetInnerHTML={{
              __html: newPergunta[perguntaAtual].pergunta
            }}
          />
        </div>
        {newPergunta[perguntaAtual].opcoes.map((opcao, index) => (
          <div
            key={index}
            className={`alternativa ${
              respostasDoUsuario[perguntaAtual] ===
              String.fromCharCode(65 + index)
                ? 'alternativa--selecionada'
                : ''
            } ${
              mostrarRespostaCorreta
                ? newPergunta[perguntaAtual].respostaCorreta ===
                  String.fromCharCode(65 + index)
                  ? 'alternativa--certa'
                  : respostasDoUsuario[perguntaAtual] ===
                    newPergunta[perguntaAtual].numPergunta +
                      '-' +
                      String.fromCharCode(65 + index)
                  ? 'alternativa--errada'
                  : ''
                : ''
            }`}
            onClick={() => selecionarResposta(String.fromCharCode(65 + index))}
          >
            {/* <div className='letra'>
              {respostasDoUsuario[perguntaAtual] +
                newPergunta[perguntaAtual].numPergunta+"-"+String.fromCharCode(65 + index)}
            </div> */}
            <div className='texto'>{opcao}</div>
          </div>
        ))}
      </div>
      {mostrarBotaoConfirmar && (
        <div
          className='btn-confirma btn-quiz'
          onClick={() => lidarComResposta('')}
        >
          CONFIRMA
        </div>
      )}
    </div>
  )
}

export default Quiz
