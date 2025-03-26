// Lista de números já sorteados
let listaDeNumerosSortidos = [];
// Quantidade máxima de números sorteados
const quantMaxima = 10;
// Contador de tentativas
let cont = 1;

// Exibe texto na tela
function exibirTextoNaTela(tag, texto) {
    document.querySelector(tag).innerHTML = texto;
}

// Exibe a mensagem inicial do jogo
function mensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}
mensagemInicial();

// Limpa o campo de entrada
function limparCampo() {
    document.querySelector('input').value = '';
}

// Gera um número aleatório sem repetir
function gerarNumeroAleatorio() {
    if (listaDeNumerosSortidos.length >= quantMaxima) {
        // Reinicia a lista quando todos os números forem sorteados
        listaDeNumerosSortidos = []; 
    }

    let numeroEscolhido;
    do {
        numeroEscolhido = Math.floor(Math.random() * quantMaxima) + 1;
    } while (listaDeNumerosSortidos.includes(numeroEscolhido));

    listaDeNumerosSortidos.push(numeroEscolhido);
    console.log(`Número secreto: ${numeroEscolhido}`);
    return numeroEscolhido;
}

// Define o número secreto
let numeroSecreto = gerarNumeroAleatorio();

// Verifica o chute do jogador
function verificarChute() {
    let chute = parseInt(document.querySelector('input').value);

    // Verifica se a entrada é válida
    if (isNaN(chute) || chute < 1 || chute > 10) {
        exibirTextoNaTela('h1', 'OPS!');
        exibirTextoNaTela('p', 'Por favor, insira um número válido entre 1 e 10!');
        return;
    }

    // Verifica se acertou o número
    if (chute === numeroSecreto) {
        let palavraTentativa = cont > 1 ? 'tentativas' : 'tentativa';
        exibirTextoNaTela('h1', 'Acertou!');
        exibirTextoNaTela('p', `Você descobriu o número secreto com ${cont} ${palavraTentativa}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        let mensagem = chute > numeroSecreto ? 'O número secreto é menor' : 'O número secreto é maior';
        exibirTextoNaTela('h1', 'Errou!');
        exibirTextoNaTela('p', mensagem);
        cont++;
        limparCampo();
    }
}

// Reinicia o jogo
function novoJogo() {
    mensagemInicial();
    limparCampo();
    numeroSecreto = gerarNumeroAleatorio();
    cont = 1;
    document.getElementById('reiniciar').setAttribute('disabled', true);
}