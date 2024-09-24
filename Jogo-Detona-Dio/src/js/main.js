// Estado do jogo, onde guardamos elementos da interface (view), valores de controle (values) e as ações que controlam a lógica do jogo (actions)
const state = {

    view: {
        // Seleciona todos os quadrados do jogo, o elemento do inimigo, o tempo restante e a pontuação
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },

    values: {
        // Velocidade do jogo (intervalo de tempo para alterar os quadrados)
        gameVelocity: 1000,
        // Posição atual onde o inimigo (quadrado) está
        hitPosition: 0,
        // Pontuação do jogador
        result: 0,
        // Tempo atual restante do jogo
        curretTime: 60,
    },

    actions: {
        // Timer para trocar o quadrado inimigo aleatoriamente a cada segundo
        timerId: setInterval(randomSquare, 1000),
        // Timer para contar o tempo decrescente a cada segundo
        countDownTimerId: setInterval(countDown, 1000),
    },
};

// Função para controlar o contador regressivo do jogo
function countDown() {
    // Diminui o tempo restante
    state.values.curretTime--;
    // Atualiza o elemento que exibe o tempo restante na interface
    state.view.timeLeft.textContent = state.values.curretTime;



    // Se o tempo acabar, interrompe os timers e exibe o resultado final
    if (state.values.curretTime <= 0) {
        // Para o contador de tempo e o timer que controla a aleatoriedade dos quadrados
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        // Exibe uma mensagem de fim de jogo com o resultado do jogador
        alert("Game Over! O seu resultado foi: " + state.values.result);
    }
}



// Função para tocar um som específico, baseado no nome do arquivo de áudio
function playSound(audioName) {
    // Cria um novo objeto de áudio com o arquivo correspondente
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    // Define o volume do áudio
    audio.volume = 0.2;
    // Reproduz o som
    audio.play();
}



// Função que seleciona aleatoriamente um quadrado e coloca o inimigo lá
function randomSquare() {
    // Remove a classe 'enemy' de todos os quadrados
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    // Gera um número aleatório entre 0 e 8 (para escolher um dos 9 quadrados)
    let randomNumber = Math.floor(Math.random() * 9);
    // Seleciona o quadrado aleatório correspondente
    let randomSquare = state.view.squares[randomNumber];
    // Adiciona a classe 'enemy' ao quadrado selecionado
    randomSquare.classList.add("enemy");
    // Armazena a posição do quadrado atual onde o inimigo está
    state.values.hitPosition = randomSquare.id;
}








// Função para adicionar listeners de clique em cada quadrado
function addListenerHitBox() {
    // Para cada quadrado, adiciona um evento de 'mousedown'
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            // Se o quadrado clicado for o mesmo onde está o inimigo
            if (square.id === state.values.hitPosition) {
                // Incrementa a pontuação do jogador
                state.values.result++;
                // Atualiza a pontuação na interface
                state.view.score.textContent = state.values.result;
                // Reseta a posição do inimigo (para evitar duplicidade de pontos)
                state.values.hitPosition = null;
                // Toca o som de acerto
                playSound("hit");
            }
        });
    });
}



// Função para inicializar o jogo, adicionando os listeners aos quadrados
function initialize() {
    addListenerHitBox();
}

// Inicializa o jogo ao carregar a página
initialize();
