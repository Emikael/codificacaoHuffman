# Codificacao de Huffman
A codificação de Huffman é um método de compressão que usa as probabilidades de ocorrência dos símbolos no conjunto de dados a ser comprimido para determinar códigos de tamanho variável para cada símbolo. Ele foi desenvolvido em 1952 por David A. Huffman que era, na época, estudante de doutorado no MIT, e foi publicado no artigo "A Method for the Construction of Minimum-Redundancy Codes".

Um código de Huffman é uma codificação otimizada binária, de tamanho variável, e o código de cada carácter não é prefixo do código de outro carácter. Logo, não há ambigüidade na leitura. Temos a garantia desta propriedade porque a codificação de Huffman é uma codificação prefixa, construída a partir de uma árvore binária. Na construção da codificação, os caracteres são as folhas da árvore binária, e as arestas representam as decisões de utilização de bits (0 ou 1). Árvores binárias também geram codificações prefixadas de tamanho fixo. Neste caso, as folhas devem estar todas no mesmo nível.

### Subestrutura ótima do problema

A construção da árvore de codificação, pelo método de Huffman, utiliza uma abordagem gulosa partindo de baixo para cima. De acordo com os elementos da estratégia gulosa, "um algoritmo guloso obtém uma solução ótima para um problema fazendo uma sequência de escolhas. Para cada ponto de decisão no algoritmo, a opção que parece melhor no momento é escolhida". Também de acordo com a propriedade de escolha gulosa, "uma solução globalmente ótima pode ser alcançada fazendo-se uma escolha localmente ótima (gulosa). E ainda de acordo com a propriedade da subestrutura ótima, "um problema exibe subestrutura ótima se uma solução ótima para o problema contém dentro dela soluções ótimas para os subproblemas". Portanto o método de Huffman considera um conjunto de n folhas representando os caracteres que formam o vocabulário do arquivo e suas respectivas frequências.

A cada etapa, de forma gulosa, as duas árvores com frequências menores são combinadas em uma única árvore e a soma de suas frequências é associada ao nó raiz. Ao final das n−1 etapas, temos a árvore de codificação ótima para o arquivo em questão, na qual as palavras de código binário são identificados pelos rótulos das arestas que compõem o caminho da raiz até a folha que representa o caractere. Seguindo o método de Huffman, as arestas da esquerda são rotuladas com o bit 0 e as arestas da direita com o bit 1, com isso o bit zero significa caminhe para o filho da esquerda e o bit 1 caminhe para o filho da direita, na árvore. E para ser um código ótimo, a árvore deve estar sempre completa, ou seja, cada nó que não é uma folha deve ter dois filhos. Uma codificação ótima possui um alfabeto |C| com |C| folhas, sendo uma folha para cada caractere do alfabeto, e |C|-1 nós internos, além disso todas as frequências são positivas.

A análise do tempo de execução do método de Huffman supõe que Q é implementada como um heap binário. O loop é executado n -1 vezes. Cada operação de heap é feita em tempo O(lg n). Portanto, o loop contribui O(n lg n) para o tempo de execução. Então, o tempo de execução total de Huffman para n caracteres é O(n lg n).

### Pseudocódigo

                enquanto tamanho(alfabeto) > 1:
                S0 := retira_menor_probabilidade(alfabeto)
                S1 := retira_menor_probabilidade(alfabeto)
                X  := novo_nó
                X.filho0 := S0
                X.filho1 := S1
                X.probabilidade := S0.probabilidade + S1.probabilidade
                insere(alfabeto, X)
                fim enquanto

                X = retira_menor_símbolo(alfabeto)

                para cada folha em folhas(X):
                código[folha] := percorre_da_raiz_até_a_folha(folha)
                fim para
            

DEMO https://emikael.github.io/codificacaoHuffman/

# Licença
MIT License

Copyright (c) 2016 Emikael Silveira

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
