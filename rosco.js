const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const glossary = [
    { letter: 'A', words: ['ATMOSFERA', 'ATMÓSFERA'], clue: 'Empieza por A. Capa de gases que rodea la Tierra y es fundamental para la vida.' },
    { letter: 'B', words: ['BIODIVERSIDAD'], clue: 'Empieza por B. Variedad de seres vivos que habitan en el planeta.' },
    { letter: 'C', words: ['CONTAMINACIÓN', 'CONTAMINACION'], clue: 'Empieza por C. Lo que puede llevar a hacer este planeta inhabitable.' },
    { letter: 'D', words: ['DEFORESTACION', 'DEFORESTACIÓN'], clue: 'Empieza por D. Eliminación de árboles y plantas de un área boscosa.' },
    { letter: 'E', words: ['ECOSISTEMA'], clue: 'Empieza por E. Comunidad de seres vivos y su entorno físico interactuando como una unidad.' },
    { letter: 'F', words: ['FOTOVOLTAICA'], clue: 'Empieza por F. Tecnología que convierte la luz solar directamente en electricidad.' },
    { letter: 'G', words: ['GASES'], clue: 'Empieza por G. Sustancias como el CO2 o el metano que contribuyen al efecto invernadero.' },
    { letter: 'H', words: ['HIDRAULICA', 'HIDRÁULICA', 'HIDROELECTRICA', 'HIDROELÉCTRICA'], clue: 'Empieza por H. Tipo de energía renovable que utiliza la fuerza del agua para generar electricidad.' },
    { letter: 'I', words: ['INVERNADERO'], clue: 'Empieza por I. El efecto ........ se produce cuando los gases en la atmósfera absorben el calor de la Tierra y lo mantienen dentro de la atmósfera. Esto hace que la Tierra se mantenga más caliente de lo que sería si no tuviera atmósfera.' },
    { letter: 'J', words: ['RECICLAJE'], clue: 'Contiene la J. Proceso de convertir materiales usados en nuevos productos para prevenir el desperdicio.' },
    { letter: 'K', words: ['KILOWATIO'], clue: 'Empieza por K. Unidad de medida de potencia eléctrica, importante en el consumo energético sostenible.' },
    { letter: 'L', words: ['LLUVIA ACIDA', 'LLUVIA ÁCIDA'], clue: 'Empieza por LL. Precipitación con alto nivel de acidez causada por la contaminación atmosférica. 2 palabras' },
    { letter: 'M', words: ['MEDIO AMBIENTE', 'MEDIOAMBIENTE'], clue: '2 palabras. La primera empieza por M. Sistema formado por elementos naturales y artificiales que están interrelacionados y que son modificados por la acción humana. 2 palabras' },
    { letter: 'N', words: ['NATURAL'], clue: 'Empieza por N. Se dice del recurso que proviene directamente de la naturaleza sin procesar.' },
    { letter: 'O', words: ['ODS', 'OBJETIVOS DE DESARROLLO SOSTENIBLE'], clue: 'Siglas (la primera la O) mediante las cuales nos referimos a los objetivos globales diseñados para lograr un futuro más sostenible para todos.' },
    { letter: 'P', words: ['PLASTICO', 'PLÁSTICO'], clue: 'Empieza por P. Material sintético muy contaminante con larga vida en el medio ambiente.' },
    { letter: 'Q', words: ['QUIMICOS', 'QUÍMICOS'], clue: 'Empieza por Q. Sustancias artificiales que pueden ser contaminantes para el medio ambiente.' },
    { letter: 'R', words: ['RESPONSABLE'], clue: 'Empieza por R. Tipo de consumo en el cual la persona se informa y reflexiona antes durante y después de una compra.' },
    { letter: 'S', words: ['SOSTENIBILIDAD'], clue: 'Empieza por S. Capacidad de satisfacer las necesidades actuales sin comprometer las del futuro.' },
    { letter: 'T', words: ['HUERTO'], clue: 'Contiene la T. Terreno en el que se cultivan y recolectan hortalizas, verduras y plantas aromáticas.' },
    { letter: 'U', words: ['URBANISMO'], clue: 'Empieza por U. Planificación de ciudades y territorios, que si se realiza de manera sostenible, minimiza el daño ambiental y social.' },
    { letter: 'V', words: ['VERTEDERO'], clue: 'Empieza por V. Lugar donde se depositan los residuos, a menudo causando problemas ambientales.' },
    { letter: 'W', words: ['WATER', 'AGUA'], clue: 'Empieza por W. En inglés, recurso natural que cubre casi las tres cuartas partes del planeta. La mayor parte es salada.' },
    { letter: 'X', words: ['OXIGENO', 'OXÍGENO'], clue: 'Empieza por O. Gas sin color ni olor, forma parte del aire que respiramos.' },
    { letter: 'Y', words: ['YACIMIENTO'], clue: 'Empieza por Y. Depósito natural de minerales que deben extraerse de forma sostenible.' },
    { letter: 'Z', words: ['OZONO'], clue: 'Contiene la Z, capa que envuelve la Tierra y minimiza la radiación que llega a la corteza terrestre.' }
];

// Variables de estado del juego
let gameStarted = false;
let currentLetterIndex = 0;
let pendingLetters = [...glossary];
let score = 0;
let timeLeft = 300; // 5 minutos en segundos
let timer;

// Elementos DOM
const roscoElement = document.getElementById('rosco');
const clueElement = document.getElementById('currentClue');
const answerInput = document.getElementById('userAnswer');
const resultContainer = document.getElementById('resultContainer');
const playButton = document.getElementById('playButton');
const checkButton = document.getElementById('checkButton');
const passButton = document.getElementById('passButton');
const timerElement = document.querySelector('.timer');
const scoreElement = document.querySelector('.score');

// Crear el rosco de letras
function createRosco() {
    const radius = 150;
    const centerX = 250;
    const centerY = 125;

    glossary.forEach((item, index) => {
        const angle = (index * (2 * Math.PI / glossary.length)) - (Math.PI / 2); // Empieza en la parte superior
        const x = centerX + radius * Math.cos(angle) - 10;
        const y = centerY + radius * Math.sin(angle) - 10;

        const button = document.createElement('button');
        button.className = 'letter-button';
        button.textContent = item.letter;
        button.id = `letter-${item.letter}`;
        button.style.left = `${x}px`;
        button.style.top = `${y}px`;

        roscoElement.appendChild(button);
    });
}

// Actualizar el temporizador
function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerElement.textContent = `Tiempo: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    if (timeLeft <= 0) {
        endGame();
    } else {
        timeLeft--;
    }
}

// Actualizar la puntuación
function updateScore() {
    scoreElement.textContent = `Puntos: ${score}/${glossary.length}`;
}

// Mostrar la pista actual
function showCurrentClue() {
    if (pendingLetters.length > 0) {
        const currentItem = pendingLetters[currentLetterIndex];
        clueElement.textContent = `${currentItem.letter}: ${currentItem.clue}`;

        // Resaltar la letra actual
        document.querySelectorAll('.letter-button').forEach(btn => btn.classList.remove('active'));
        document.getElementById(`letter-${currentItem.letter}`).classList.add('active');
    } else {
        endGame(true);
    }
}

// Función para calcular la distancia de Levenshtein (diferencia entre palabras)
function levenshteinDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix = [];

    // Incrementar a lo largo de la primera columna de cada fila
    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    // Incrementar a lo largo de la primera fila de cada columna
    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    // Rellenar el resto de la matriz
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // sustitución
                    matrix[i][j - 1] + 1,     // inserción
                    matrix[i - 1][j] + 1      // eliminación
                );
            }
        }
    }

    return matrix[b.length][a.length];
}

// Mostrar pista del cryptex
function showTip() {
    // Array de pistas sobre el edelweiss sin mencionar su nombre
    const edelweissTips = [
        "Es una flor alpina que simboliza la pureza y crece en zonas montañosas de Europa.",
        "Es una flor con pétalos blancos aterciopelados en forma de estrella.",
        "Su nombre científico es Leontopodium alpinum y significa 'pie de león alpino'.",
        "Esta flor crece a gran altitud, entre 1800-3000 metros, en terrenos rocosos.",
        "Es una flor protegida en muchos países alpinos y símbolo de sostenibilidad en la montaña."
    ];

    // Elegir una pista aleatoria
    const randomTip = edelweissTips[Math.floor(Math.random() * edelweissTips.length)];

    // Mostrar la pista en un mensaje temporal
    const edelweissAlert = document.createElement('div');
    edelweissAlert.style.position = 'fixed';
    edelweissAlert.style.top = '50px';
    edelweissAlert.style.left = '50%';
    edelweissAlert.style.transform = 'translateX(-50%)';
    edelweissAlert.style.padding = '15px 20px';
    edelweissAlert.style.backgroundColor = '#2ecc71';
    edelweissAlert.style.color = 'white';
    edelweissAlert.style.fontSize = '20pt';
    edelweissAlert.style.borderRadius = '5px';
    edelweissAlert.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    edelweissAlert.style.zIndex = '1000';
    edelweissAlert.style.maxWidth = '80%';
    edelweissAlert.style.textAlign = 'center';
    edelweissAlert.innerHTML = `<strong>¡PISTA CRYPTEX!</strong><br>${randomTip}`;

    //document.body.appendChild(edelweissAlert);
    roscoElement.appendChild(edelweissAlert);

    // Eliminar después de 30 segundos
    setTimeout(() => {
        edelweissAlert.style.opacity = '0';
        edelweissAlert.style.transition = 'opacity 1s';
        setTimeout(() => {
            //document.body.removeChild(edelweissAlert);
            roscoElement.removeChild(edelweissAlert);
        }, 1000);
    }, 30000);
}

// Comprobar la respuesta
function checkAnswer() {
    if (!gameStarted || pendingLetters.length === 0) return;

    const currentItem = pendingLetters[currentLetterIndex];
    const userAnswer = answerInput.value.trim().toUpperCase();
    const correctAnswers = currentItem.words.map(w => w.toUpperCase());
    const letterButton = document.getElementById(`letter-${currentItem.letter}`);

    // Comprobar si coincide con alguna de las respuestas aceptadas
    let isExactMatch = correctAnswers.includes(userAnswer);

    // Comprobar distancia de Levenshtein con la mejor coincidencia
    let isCloseMatch = false;
    let bestMatch = correctAnswers[0];
    let minDistance = 100;

    for (const answer of correctAnswers) {
        const distance = levenshteinDistance(userAnswer, answer);
        if (distance < minDistance) {
            minDistance = distance;
            bestMatch = answer;
        }
    }

    if (minDistance === 1 && userAnswer.length > 3) {
        isCloseMatch = true;
    }

    if (isExactMatch || isCloseMatch) {
        // Respuesta correcta
        letterButton.classList.remove('active');
        letterButton.classList.add('correct');

        resultContainer.innerHTML = `¡Correcto!`;

        score++;
        updateScore();

        // Comprobar si hay que mostrar pista del edelweiss (cada 5 aciertos)
        if (score > 0 && score % 5 === 0) {
            showTip();
        }

        // Eliminar la letra de pendientes
        pendingLetters.splice(currentLetterIndex, 1);

        if (pendingLetters.length === 0) {
            endGame(true);
            return;
        }
    } else {
        // Respuesta incorrecta
        letterButton.classList.remove('active');
        letterButton.classList.add('incorrect');
        // Mostramos la primera respuesta como la "correcta" por defecto
        resultContainer.innerHTML = `Incorrecto. La respuesta correcta es: <span class="incorrect-answer">${correctAnswers[0]}</span>`;

        // Eliminar la letra de pendientes
        pendingLetters.splice(currentLetterIndex, 1);

        if (pendingLetters.length === 0) {
            endGame(true);
            return;
        }
    }

    // Actualizar índice para la siguiente letra
    currentLetterIndex = currentLetterIndex % pendingLetters.length;

    // Limpiar el campo de respuesta y mostrar la siguiente pista
    answerInput.value = '';
    showCurrentClue();
}

// Pasar palabra
function passWord() {
    if (!gameStarted || pendingLetters.length === 0) return;

    const currentItem = pendingLetters[currentLetterIndex];
    const letterButton = document.getElementById(`letter-${currentItem.letter}`);

    // Marcar visualmente como saltada (opcional)
    letterButton.classList.remove('active');
    letterButton.classList.add('skipped');

    // Mover la letra al final de la cola
    const current = pendingLetters[currentLetterIndex];
    pendingLetters.splice(currentLetterIndex, 1);
    pendingLetters.push(current);

    // Ajustar el índice si es necesario
    if (currentLetterIndex >= pendingLetters.length) {
        currentLetterIndex = 0;
    }

    // Limpiar el campo de respuesta y mostrar la siguiente pista
    answerInput.value = '';
    resultContainer.textContent = '';

    // Quitar la clase skipped después de un momento
    setTimeout(() => {
        letterButton.classList.remove('skipped');
    }, 300);

    showCurrentClue();
}

// Iniciar el juego
function startGame() {
    if (gameStarted) return;

    // Reiniciar el estado del juego
    gameStarted = true;
    currentLetterIndex = 0;
    pendingLetters = [...glossary];
    score = 0;
    timeLeft = 300;

    // Reiniciar visual
    document.querySelectorAll('.letter-button').forEach(btn => {
        btn.classList.remove('active', 'correct', 'incorrect', 'skipped');
    });

    // Activar controles
    playButton.disabled = true;
    checkButton.disabled = false;
    passButton.disabled = false;
    answerInput.disabled = false;
    answerInput.focus();

    // Iniciar temporizador
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);

    // Mostrar primera pista
    resultContainer.textContent = '';
    updateScore();
    showCurrentClue();
}

// Finalizar el juego
function endGame(completed = false) {
    gameStarted = false;
    clearInterval(timer);

    // Desactivar controles
    checkButton.disabled = true;
    passButton.disabled = true;
    answerInput.disabled = true;
    playButton.disabled = false;

    // Mostrar resultado final
    if (completed) {
        resultContainer.innerHTML = `<div class="game-over">¡Juego completado! Tu puntuación final es: ${score}/${glossary.length}</div>`;
    } else {
        resultContainer.innerHTML = `<div class="game-over">¡Se acabó el tiempo! Tu puntuación final es: ${score}/${glossary.length}</div>`;
    }

    // Mostrar todas las respuestas incorrectas
    clueElement.textContent = "¡Fin del juego!";
}

// Event Listeners
playButton.addEventListener('click', startGame);
checkButton.addEventListener('click', checkAnswer);
passButton.addEventListener('click', passWord);

// Permitir enviar respuesta con Enter
answerInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkAnswer();
    }
});

// Inicializar el juego
createRosco();
updateScore();