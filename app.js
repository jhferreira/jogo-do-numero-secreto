//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do número Secreto';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número entre 1 e 10';

let listaDeNumerosSorteados = [];
let numeroLimite = 10;

let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;


exibirMensagemInicial();

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    //responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
    if ('speechSynthesis' in window){
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR';
        utterance.rate = 1.2;
        window.speechSynthesis.speak(utterance);
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1','Jogo do número secreto');
    exibirTextoNaTela('p','Escolha um número entre 1 e 10:');
}

function verificarChute(){
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você acertou o número secreto com ${tentativas} ${palavraTentativas}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto){
            exibirTextoNaTela('p', 'Número secreto é menor!');
        } else {
            exibirTextoNaTela('p', 'Número secreto é maior!');
        }
        tentativas++;
        //tentativas = tentativas + 1;
        limparCampo();
    }
}

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let  quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}