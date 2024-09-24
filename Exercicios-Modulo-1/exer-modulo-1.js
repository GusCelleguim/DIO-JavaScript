// Lista de alunos
const alunosMelhores = ["Gustavo", "Lucas", "João", "Maria", "Ana", "Pedro", "Carlos", "Felipe", "Rafael", "Bruno"];

// Exemplo de teste
console.log(alunosMelhores[0]); // Gustavo

// Classe que representa as notas dos alunos
class NotaDosAlunos {
    constructor() {
        this.notas = [10, 8, 7, 9, 6, 10, 5, 8, 7, 10];
    }

    getNota(alunoIndex) {
        return this.notas[alunoIndex];
    }
}

// Função para comparar as notas de dois alunos
function comparacaoDeNotas() {
    const notas = new NotaDosAlunos();
    const aluno1Index = 0; // Índice de Gustavo
    const aluno2Index = 1; // Índice de Lucas

    const aluno1Nota = notas.getNota(aluno1Index);
    const aluno2Nota = notas.getNota(aluno2Index);

    if (aluno1Nota > aluno2Nota) {
        console.log('O aluno ' + alunosMelhores[aluno1Index] + ' tem a maior nota.');
    } else if (aluno1Nota < aluno2Nota) {
        console.log('O aluno ' + alunosMelhores[aluno2Index] + ' tem a maior nota.');
    } else {
        console.log('Os alunos ' + alunosMelhores[aluno1Index] + ' e ' + alunosMelhores[aluno2Index] + ' têm a mesma nota.');
    }
}

// Exemplo de chamada da função de comparação
comparacaoDeNotas();

// Função para calcular a soma das notas de todos os alunos
function somaDeTodosAlunos() {
    const notas = new NotaDosAlunos();
    let soma = 0;

    for (let i = 0; i < notas.notas.length; i++) {
        soma += notas.getNota(i);
    }

    return soma;
}

// Exemplo de soma de notas
console.log('A soma das notas de todos os alunos é: ' + somaDeTodosAlunos());

// Valor para a tabuada
const valorInserido = 1;

// Tabuada do valor inserido
for (let i = 0; i <= 10; i++) {
    console.log(`${valorInserido} x ${i} = ${valorInserido * i}`);
}

// Array de números ímpares
const numerosImpares = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];

// Exibindo os números ímpares
for (let i = 0; i < numerosImpares.length; i++) {
    console.log(numerosImpares[i]);
}


// importação de um arquivo em js


function getAlunos() {
    return alunosMelhores;
}



//faça um programa aonde voce recebe quantidade de numeros que o usuario deseja inserir, e depois exiba o numero par

//numeros impares
// numeros pares

//exemplo de entrada


ConstNumeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

for (let i = 0; i < ConstNumeros.length; i++) {
    if (ConstNumeros[i] % 2 == 0) {
        console.log(ConstNumeros[i] + " é par")
    }else{
        console.log(ConstNumeros[i] + " é impar")
    }
}

console.log("Fim do programa")

//exemplo de saida
