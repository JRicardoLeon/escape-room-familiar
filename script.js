const questions = [
    {
        question: "Sin contar a los abuelos... ¿quién es el que mejor cocina de la familia?",
        answers: [
            "Diana",
            "Miguel",
            "Ricardo",
            "Pacho",
            "Daniela",
            "Jose"
        ],
        correct: "Ricardo"
    },

    {
        question: '¿Quién tiene mayor probabilidad de decir "Ya estoy list@" cuando todavía ni siquiera ha salido?',
        answers: [
            "Diana",
            "Jose",
            "Alicia",
            "Ricardo"
        ],
        correct: "Alicia"
    },

    {
        question: "Se ha detectado un fenómeno extraño... ¿quién tiene la habilidad que se puede caer la casa y no se despierta?",
        answers: [
            "Diana",
            "Johana",
            "Alicia",
            "Paola"
        ],
        correct: "Johana"
    },

    {
        question: "Durante una época misteriosamente aparecian películas en las gabetas de la ropa. ¿Quién tenía la costumbre de esconderlas ahi?",
        answers: [
            "Sharit",
            "Jose",
            "Miguel",
            "Ricardo",
            "Pacho",
            "Diana"
        ],
        correct: "Pacho"
    }
];



const sounds = {
    "screen-intro": "sounds/intro.mp3",
    "sound-test-3": "sounds/sonido-miedo.mp3",
    "screen-test-2": "sounds/test-2.mp3",
    "screen-test-4": "sounds/test-4.mp3",
    "screen-final": "sounds/final.mp3"
};






let currentQuestion = 0;


/* =========================
   CAMBIAR DE PANTALLA
========================= */

function showScreen(screenId) {

    const screens = document.querySelectorAll(".screen");

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    const targetScreen = document.getElementById(screenId);

    if (targetScreen) {
        targetScreen.classList.add("active");
    }
}


/* =========================
   CARGAR PREGUNTA
========================= */

function loadQuestion() {

    const question = questions[currentQuestion];

    document.getElementById("question-number").textContent =
        currentQuestion + 1;

    document.getElementById("question-text").textContent =
        question.question;

    const answersContainer =
        document.getElementById("answers");

    answersContainer.innerHTML = "";

    document.getElementById("feedback").textContent = "";

    question.answers.forEach(answer => {

        const button = document.createElement("button");

        button.textContent = answer;

        button.classList.add("answer-button");

        button.onclick = () => checkAnswer(answer);

        answersContainer.appendChild(button);
    });
}


/* =========================
   COMPROBAR RESPUESTA
========================= */

function checkAnswer(answer) {

    const question = questions[currentQuestion];

    const feedback =
        document.getElementById("feedback");

    if (answer === question.correct) {

        feedback.textContent = "✅ ¡CORRECTO!";

        setTimeout(() => {

            currentQuestion++;

            if (currentQuestion >= questions.length) {

                showScreen("screen-test-1-complete");

            } else {

                loadQuestion();

            }

        }, 900);

    } else {

        feedback.textContent =
            "❌ ¡NOOO! Intenten nuevamente. 😂";
    }
}


/* =========================
   INICIAR PRUEBA 1
========================= */

document.addEventListener("DOMContentLoaded", () => {

    loadQuestion();

});

/* =========================
   PRUEBA 2 - CASO DE LOS GATOS
========================= */

function checkCatAnswer(answer) {

    const feedback =
        document.getElementById("cat-feedback");

    if (answer === "gatos") {

        feedback.textContent =
            "✅ ¡CASO RESUELTO!";

        setTimeout(() => {

            showScreen("screen-test-2-complete");

        }, 900);

    } else {

        feedback.textContent =
            "❌ Teoría descartada. Revisen nuevamente las evidencias. 😂";

    }
}

/* =========================
   PRUEBA 3 - EXPERIMENTO CULINARIO
========================= */

function checkCookingAnswer(answer) {

    const feedback =
        document.getElementById("cooking-feedback");

    if (answer === "coca") {

        feedback.textContent =
            "✅ ¡EXPERIMENTO CONFIRMADO!";

        setTimeout(() => {

            showScreen("screen-test-3-complete");

        }, 900);

    } else {

        feedback.textContent =
            "❌ Esa receta no aparece en los archivos de Pacho. 😂";

    }
}

/* =========================
   PRUEBA 4 - VIAJE PERDIDO
========================= */

function checkTripAnswer(answer) {

    const feedback =
        document.getElementById("trip-feedback");

    if (answer === "gramalote") {

        feedback.textContent =
            "✅ ¡DESTINO LOCALIZADO!";

        setTimeout(() => {

            showScreen("screen-test-4-complete");

        }, 900);

    } else {

        feedback.textContent =
            "❌ Ese destino no coincide con las evidencias. 🕵️";

    }
}

/* =========================
   PRUEBA 5 - IDIOMA FAMILIAR
========================= */

function checkLanguageAnswer(answer) {

    const feedback =
        document.getElementById("language-feedback");

    if (answer === "sorpresa") {

        feedback.textContent =
            "✅ ¡TRADUCCIÓN CORRECTA!";

        setTimeout(() => {

            showScreen("screen-test-5-complete");

        }, 900);

    } else {

        feedback.textContent =
            "❌ Traducción incorrecta. Consulten nuevamente el diccionario. 😂";

    }
}

function showScreen(screenId) {

    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    const screen = document.getElementById(screenId);
    screen.classList.add('active');

    // Reproducir sonido de la pantalla
    if (sounds[screenId]) {
        const audio = new Audio(sounds[screenId]);
        audio.play();
    }
}