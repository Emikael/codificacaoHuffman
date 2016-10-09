/**
 * Definição das propriedades do canvas.
 */

let canvas = $("#canvas")[0];
let context = canvas.getContext("2d");
let larguraDoDesenho = $("#canvas").width();
context.font = "16px Arial";

let pontoX = 60;
let pontoY = 20;
let indiceTexto = 0;

let alfabeto = [];
let resultadoCodificacao = [];
let frequenciasRelativas = [];
let dicionarioDeHuffman = [];
let arvoreBinaria = [];
let ciclos = 0;
let finalizado = false;
let desenhoDaArvoreFinalizado = false;
let verificaPontoX = false;
let verificaPontoY = false;
let execucaoDoAlgoritmoFinalizada = false;
let isMostrouMensagem = false;

/**
 * Executa todos os processos do algoritmo.
 */
function executarTudo() {
    if (document.getElementById("textoACodificar").value == '') {
        alert("Digite uma palavra para ser codificada");
        return;
    }
    while(!execucaoDoAlgoritmoFinalizada) {
        executar();
    }
    $(".botoesExecutar").addClass("disabled");
}

/**
 * Faz o debug do algoritmo, executando passo a passoa cada ação.
 */
function executarDebug() {

    if (!isMostrouMensagem) {
        Materialize.toast('Modo debug, continue precionando o botão até o fim do processo.', 4000);
        isMostrouMensagem = true;
    }

    if (document.getElementById("textoACodificar").value == '') {
        alert("Digite uma palavra para ser codificada");
        return;
    }

    if (execucaoDoAlgoritmoFinalizada) {
        $(".botoesExecutar").addClass("disabled");
        Materialize.toast('Processo finalizado.', 4000);
        return;
    }

    $(".collapsible-header").addClass("active");
    $(".collapsible").collapsible({accordion: false});

    executar();
}

/**
 * Executa o algoritmo de fato.
 */
function executar() {
    if (desenhoDaArvoreFinalizado) {
        desenhaResultado();
        execucaoDoAlgoritmoFinalizada = true;
    }

    if (finalizado && !desenhoDaArvoreFinalizado) {
        desenhar();
        desenhoDaArvoreFinalizado = true;
    }

    /**
     * Cria a tabela inicial.
     */
    if (!finalizado) {
        if (ciclos == 0) {
            let texto = document.getElementById("textoACodificar").value; // string da textfield
            analisaFrequenciasDoAlfabeto(texto);
            primeriaOrdenacao();
            desenhaTabelas();
        } else {
            /**
             * Cria as demais tabelas.
             */
            codificacaoDeHufmann();
            ordenarDicionario();
            desenhaTabelas();
        }
    }
}
/**
 * Limpar os campos para que seja possível executar novamente.
 */
function limpar() {
    $(".botoesExecutar").removeClass("disabled");
    context.clearRect(0, 0, canvas.width, canvas.height);
    $("#tabelasDeSaida").empty();
    $("#textoACodificar").val('').focus();
    // $("#textoACodificar").focus();
    pontoX = 60;
    pontoY = 20;
    indiceTexto = 0;
    alfabeto = [];
    resultadoCodificacao = [];
    frequenciasRelativas = [];
    dicionarioDeHuffman = [];
    arvoreBinaria = [];
    ciclos = 0;
    finalizado = false;
    desenhoDaArvoreFinalizado = false;
    verificaPontoX=false;
    verificaPontoY=false;
    execucaoDoAlgoritmoFinalizada = false;
}

function analisaFrequenciasDoAlfabeto(texto) {
    let tamanho = texto.length;
    let contadorDoAlfabeto = 0;
    /**
     * Verifica cada posição.
     */
    for (let i = 0; i < tamanho; i++) {
        /**
         * Cada posição verifica todas as outras posições.
         */
        for (let j = 0; j < tamanho; j++) {

            if (texto[i] == texto[j]) {
                let caracter = alfabeto.indexOf(texto[i]);
                /**
                 * Se o caracter for -1 significa que ele não está adiciona ao array.
                 */
                if (caracter == -1) {
                    alfabeto.push(texto[i]);
                    frequenciasRelativas[contadorDoAlfabeto]=1;
                    contadorDoAlfabeto++;
                } else{
                    frequenciasRelativas[caracter]++;

                }
                break;
            }
        }
    }

    for (let i = 0; i < texto.length; i++) {
        let numeroDeFrequencias = frequenciasRelativas[i]/texto.length;
        frequenciasRelativas[i]= numeroDeFrequencias.toFixed(2);
    }

    for (let i = 0; i < alfabeto.length; i++) {
        resultadoCodificacao.push([alfabeto[i], null]);
    }

}

function primeriaOrdenacao(){

    for (let i = 0; i < alfabeto.length; i++) {
        dicionarioDeHuffman.push([alfabeto[i], frequenciasRelativas[i]]);
    }

    dicionarioDeHuffman.sort(function(a, b) {return a[1] - b[1]});
    /**
     * Primeria lista ordenada com suas respetivas frequencias.
     */
    dicionarioDeHuffman.reverse();

    for (var i = 0; i < dicionarioDeHuffman.length; i++) {
        arvoreBinaria.push([i,dicionarioDeHuffman[i][0]])
    }
}

/**
 * Implementação do algoritmo de Huffman.
 */
function codificacaoDeHufmann(){

    let tamanho = dicionarioDeHuffman.length;
    let dicionarioTemporario = [];
    verificaPontoX = false;
    verificaPontoY = false;

    /**
     * Garante que não chegou ao fim do dicionario.
     */
    if (tamanho > -1) {
        for (let i = 0; i < tamanho-2; i++) {
            dicionarioTemporario[i] = dicionarioDeHuffman[i];
        }

        var x = dicionarioDeHuffman[tamanho-1];
        var y = dicionarioDeHuffman[tamanho-2];
        dicionarioTemporario.push(["(" + x[0] + "," + y[0] + ")", parseFloat(x[1]) + parseFloat(y[1])]);

        for (let i = 0; i < arvoreBinaria.length; i++) {
            if (!verificaPontoX) {
                if (x[0] === arvoreBinaria[i][1]) {
                    arvoreBinaria.push([i,"("+x[0]+","+y[0]+")"]);
                    verificaPontoX = true;
                }
            }
            if (!verificaPontoY) {
                if (y[0] === arvoreBinaria[i][1]) {
                    arvoreBinaria.push([i,"(" + x[0] + "," + y[0] + ")"]);
                    verificaPontoY = true;
                }
            }
        }

    }

    dicionarioDeHuffman = dicionarioTemporario;
    if (dicionarioDeHuffman[0][1]>=0.98) {
        dicionarioDeHuffman[0][1] = Math.round(dicionarioDeHuffman[0][1]);
    }
}

/**
 * Ordena dicionario.
 */
function ordenarDicionario() {
    dicionarioDeHuffman.sort(function(a, b) {return a[1] - b[1]});
    dicionarioDeHuffman.reverse();
}

/**
 * Desenha as tabelas com os resultados da compressão.
 */
function desenhaTabelas() {
    let div = document.createElement("div");
    div.setAttribute("class", "card card-1 adjust");

    let table = document.createElement('table');
    let thead = document.createElement("thead");
    let tr = document.createElement('tr');
    let th1 = document.createElement('th');

    let th2 = document.createElement('th');
    let text1 = document.createTextNode("Símbolo");
    let text2 = document.createTextNode("Frequencia");

    th1.appendChild(text1);
    th2.appendChild(text2);
    tr.appendChild(th1);
    tr.appendChild(th2);

    thead.appendChild(tr);
    table.appendChild(thead);
    let tbody = document.createElement("tbody");

    for (let i = 0; i < dicionarioDeHuffman.length; i++) {
        let tr = document.createElement('tr');

        let td1 = document.createElement('td');
        let td2 = document.createElement('td');

        let text1 = document.createTextNode(dicionarioDeHuffman[i][0]);
        let text2 = document.createTextNode(dicionarioDeHuffman[i][1]);

        td1.appendChild(text1);
        td2.appendChild(text2);
        tr.appendChild(td1);
        tr.appendChild(td2);

        tbody.appendChild(tr);
    }

    table.appendChild(tbody);
    table.setAttribute("class", "responsive-table bordered highlight centered");
    div.appendChild(table);
    document.getElementById("tabelasDeSaida").appendChild(div);

    if (dicionarioDeHuffman[0][1] >= 0.98) {
        finalizado = true;
    }
    ciclos--;
}

function desenhar() {
    desenhaCelula("black", ((larguraDoDesenho/2) - (pontoX/2)), 10, "/","");
    let alturaDaArvore = (arvoreBinaria.length - alfabeto.length)/2;
    calculaPontosDoDesenho(arvoreBinaria.length-2, ((larguraDoDesenho/2) - (pontoX/2)), 10, alturaDaArvore);
}

function calculaPontosDoDesenho(raiz, pontoMedio, altura, niveisDaArvore){
    let alturaTemp = altura;
    let caminhoParaADireita;
    let caminhoParaAEsquerda;
    let profundidade = niveisDaArvore;

    let direita;
    let descricaoDireita;
    let esquerda;
    let descricaoEsquerda;

    indiceTexto = arvoreBinaria.length;

    let noTemporario1 = arvoreBinaria[raiz];
    let noTemporario2 = arvoreBinaria[raiz+1];

    if (noTemporario1[0] > noTemporario2[0]) {
        direita = noTemporario1[0];
        descricaoDireita = arvoreBinaria[direita][1];
        esquerda = noTemporario2[0];
        descricaoEsquerda = arvoreBinaria[esquerda][1];
    } else {
        direita = noTemporario2[0];
        descricaoDireita = arvoreBinaria[direita][1];
        esquerda = noTemporario1[0];
        descricaoEsquerda = arvoreBinaria[esquerda][1];
    }

    alturaTemp += 50;
    profundidade = profundidade -1;

    caminhoParaADireita = pontoMedio + (profundidade*50);
    caminhoParaAEsquerda =  pontoMedio - (profundidade*50);

    desenhaLinha(pontoMedio + (pontoX/2), alturaTemp - 30, caminhoParaADireita + (pontoX/2), alturaTemp);
    desenhaLinha(pontoMedio + (pontoX/2), alturaTemp - 30, caminhoParaAEsquerda + (pontoX/2), alturaTemp);

    if (descricaoDireita.length > 1) {
        desenhaCelula("black", caminhoParaADireita, alturaTemp, descricaoDireita,"1");
        codigoDeHuffman(descricaoDireita, "1");

    } else {
        desenhaCelula("red", caminhoParaADireita, alturaTemp, descricaoDireita,"1");
        codigoDeHuffman(descricaoDireita, "1");
    }

    if (descricaoEsquerda.length > 1) {
        desenhaCelula("black", caminhoParaAEsquerda, alturaTemp, descricaoEsquerda,"0");
        codigoDeHuffman(descricaoEsquerda, "0");
    } else {
        desenhaCelula("red", caminhoParaAEsquerda, alturaTemp, descricaoEsquerda,"0");
        codigoDeHuffman(descricaoEsquerda, "0");

    }

    /**
     * Arvore da Direita.
     */
    if (descricaoDireita.length > 1) {
        calculaPontosDoDesenho(direita, caminhoParaADireita, alturaTemp, profundidade);
    }

    /**
     * Arvore da Esquerda.
     */

    if (descricaoEsquerda.length>1) {
        calculaPontosDoDesenho(esquerda,caminhoParaAEsquerda,alturaTemp,profundidade);
    }
}

/**
 * Função responsavel por desenhar as celulas na tela.
 * @param color
 * @param x
 * @param y
 * @param texto
 * @param bit
 */
function desenhaCelula(color, x, y, texto, bit) {

    context.strokeStyle = color;
    context.strokeRect(x, y, pontoX, pontoY);
    context.font = "14px Arial";
    context.fillText(texto, x + (1/5 * pontoX), y + (3/4 * pontoY));

    context.font = "16px Arial";
    context.fillText(bit, x - 15, y + (3/4 * pontoY));
}

/**
 * Função responsavel por desenhar as linhas na tela.
 * @param pontoX1
 * @param pontoY1
 * @param pontoX2
 * @param pontoY2
 */
function desenhaLinha(pontoX1, pontoY1, pontoX2, pontoY2) {
    context.beginPath();
    context.moveTo(pontoX1,pontoY1);
    context.lineTo(pontoX2,pontoY2);
    context.strokeStyle = "black";
    context.stroke();
}

/**
 * Implementação do algoritmo de Huffman.
 * @param texto
 * @param valorDaAresta
 */
function codigoDeHuffman(texto, valorDaAresta){
    let caracter;
    let valoresDasArestas;
    let alfabetoTemporario;
    let valor;

    for (let i = 0; i < texto.length; i++) {
        caracter = texto[i];
        for (let j = 0; j < alfabeto.length; j++) {
            alfabetoTemporario = alfabeto[j];
            if (alfabetoTemporario.localeCompare(caracter) == 0) {
                valor = resultadoCodificacao[j][1];
                if (valor == null) {
                    valoresDasArestas = valorDaAresta;
                } else {
                    valoresDasArestas = valor.concat(valorDaAresta);
                }

                resultadoCodificacao[j][1] = valoresDasArestas;

            }
        }
    }
}

function desenhaResultado() {
    let div = document.createElement("div");
    div.setAttribute("class", "card card-1 adjust");

    let table = document.createElement('table');
    let thead = document.createElement("thead");
    let tr = document.createElement('tr');

    let th1 = document.createElement('th');
    let th2 = document.createElement('th');

    let text1 = document.createTextNode("Símbolo");
    let text2 = document.createTextNode("Código");

    th1.appendChild(text1);
    th2.appendChild(text2);

    tr.appendChild(th1);
    tr.appendChild(th2);

    thead.appendChild(tr);
    table.appendChild(thead);
    let tbody = document.createElement("tbody");

    for (let i = 0; i < resultadoCodificacao.length; i++) {
        let tr = document.createElement('tr');

        let td1 = document.createElement('td');
        let td2 = document.createElement('td');

        let text1 = document.createTextNode(resultadoCodificacao[i][0]);
        let text2 = document.createTextNode(resultadoCodificacao[i][1]);

        td1.appendChild(text1);
        td2.appendChild(text2);

        tr.appendChild(td1);
        tr.appendChild(td2);

        tbody.appendChild(tr);
    }

    table.appendChild(tbody);
    table.setAttribute("class", "bordered highlight centered");
    div.appendChild(table);
    document.getElementById("tabelasDeSaida").appendChild(div);
}