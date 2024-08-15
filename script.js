const casas = document.querySelectorAll('.casas')

let jogadorAtual = 'X'
let jogoAtivo = true
let preenchimentoCasas = ['', '', '', '', '', '', '', '', '']

//Função que atribui ação ao clicar em uma célula
function cliqueCelula(evento) {
    const casa = evento.target
    const indiceCasa = Array.from(casas).indexOf(casa)
    
    if (preenchimentoCasas[indiceCasa] !== '' || !jogoAtivo) {
        return
    }
    
    preenchimentoCasas[indiceCasa] = jogadorAtual
    casa.textContent = jogadorAtual
    
    conferirVencedor()
    
    if (jogoAtivo && jogadorAtual === 'X') {
        jogadorAtual = 'O'
    } else {
        jogadorAtual = 'X'
    }
    
}

casas.forEach(casa => casa.addEventListener('click', cliqueCelula))

//Chama os elementos HTML
const vitoriaX = document.getElementById('vitoriaX')
const vitoriaO = document.getElementById('vitoriaO')
const empate = document.getElementById('empate')

//Posiciona as condições de vitória possíveis em um "Array"
const condicoesVitoria = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//Função para conferir se há vencedores
function conferirVencedor() {
    let venceuRodada = false
    
    //
    for (let i = 0; i < condicoesVitoria.length; i++) {
        const [a, b, c] = condicoesVitoria[i]
        if (preenchimentoCasas[a] && preenchimentoCasas[a] === preenchimentoCasas[b] && preenchimentoCasas[a] === preenchimentoCasas[c]) {
            venceuRodada = true
            break
        }
    }
    
    if (venceuRodada) {
        jogoAtivo = false
        if (jogadorAtual === 'X') {
            vitoriaX.innerHTML = '<p>Jogador X venceu!</p>'
            vitoriaX.style.display = 'block'
        } else {
            vitoriaO.innerHTML = '<p>Jogador O venceu!</p>'
            vitoriaO.style.display = 'block'
        }
        return
    }
    
    if (!preenchimentoCasas.includes('')) {
        jogoAtivo = false
        empate.innerHTML = '<p>Empate!</p>'
        empate.style.display = 'block'
    }
}

//Botão Reiniciar
const botaoReiniciar = document.getElementById('botaoReiniciar')
const resultados = document.querySelectorAll('.resultados')

//Função para reiniciar jogo ao clicar no botão
function reiniciarJogo() {
    jogoAtivo = true
    jogadorAtual = 'X'
    preenchimentoCasas = ['', '', '', '', '', '', '', '', '']
    casas.forEach(casa => casa.textContent = '')
    resultados.forEach(elemento => {
        elemento.style.display = 'none'
    })
}

//Executando a Função ao clicar no Botão Reiniciar
botaoReiniciar.addEventListener('click', reiniciarJogo)