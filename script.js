const questions = [
    {
        question: "Sin contar a los abuelos... ¿quién de esta lista creen que mejor cocina de la familia?",
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
            "Paola",
            "Alicia",
            "Miguel"
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



function startMission() {

    unlockFinalAudios();

    showScreen("screen-rules");
}


let currentQuestion = 0;


/* =========================
   CAMBIAR DE PANTALLA
========================= */

function showScreen(screenId) {

    const screens =
        document.querySelectorAll(".screen");

    screens.forEach(screen => {

        screen.classList.remove("active");

    });

    const targetScreen =
        document.getElementById(screenId);

    if (targetScreen) {

        targetScreen.classList.add("active");

    }


    /* =====================================================
       CONTROL DE AUDIO
    ===================================================== */

    // Prueba 6 y canciones: sin música ambiental
    if (
        screenId === "screen-test-6" ||
        screenId.startsWith("screen-song-")
    ) {

        stopAllAudio();

    }


    // Prueba 1
    if (
        screenId === "screen-rules" ||
        screenId.startsWith("screen-test-1")
    ) {

        playAudio("relajante");

    }


    // Prueba 2
    else if (
        screenId.startsWith("screen-test-2")
    ) {

        playAudio("miedo");

    }


    // Prueba 3
    else if (
        screenId.startsWith("screen-test-3")
    ) {

        playAudio("cocina");

    }


    // Prueba 4
    else if (
        screenId.startsWith("screen-test-4")
    ) {

        playAudio("naturaleza");

    }


    // Prueba 5
    else if (
        screenId.startsWith("screen-test-5")
    ) {

        playAudio("rosa");

    }


    /* =====================================================
       REVELACIÓN FINAL
    ===================================================== */

    // Cuando aparece la ecografía
    else if (
        screenId === "screen-final-clue"
    ) {

        playFinalAudio("bebe", 0.9);

    }


    // Cuando aparece la revelación final de los papás
    else if (
        screenId === "screen-final-parents-reveal"
    ) {

        stopAllAudio();

    }


    // Cualquier otra pantalla final:
    // detener música anterior
    else if (
        screenId.startsWith("screen-final-")
    ) {

        stopAllAudio();

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

/* =========================
   SISTEMA DE AUDIO
========================= */

const audios = {

    relajante:
        document.getElementById("audio-relajante"),

    miedo:
        document.getElementById("audio-miedo"),

    cocina:
        document.getElementById("audio-cocina"),

    naturaleza:
        document.getElementById("audio-naturaleza"),

    rosa:
        document.getElementById("audio-rosa"),

    polvora:
        document.getElementById("audio-polvora"),

    bebe:
        document.getElementById("audio-cancion-bebe"),
    boda:
        document.getElementById("audio-boda")
};


let currentAudio = null;


/* =========================================================
   DESBLOQUEAR AUDIOS FINALES EN MÓVILES
========================================================= */

let finalAudioUnlocked = false;

function unlockFinalAudios() {

    if (finalAudioUnlocked) {
        return;
    }

    const finalAudios = [
        audios.polvora,
        audios.bebe,
        audios.boda
    ];

    finalAudios.forEach(audio => {

        if (!audio) {
            return;
        }

        audio.volume = 0;

        const promise = audio.play();

        if (promise !== undefined) {

            promise.then(() => {

                audio.pause();
                audio.currentTime = 0;

            }).catch(() => {

                // El navegador todavía puede bloquearlo.
                // Se volverá a intentar en otra interacción.

            });

        }

    });

    finalAudioUnlocked = true;
}


function stopAllAudio() {

    Object.values(audios).forEach(audio => {

        if (!audio) {
            return;
        }

        audio.pause();
        audio.currentTime = 0;

    });

    currentAudio = null;

    // Detener también los intros musicales
    if (typeof musicTracks !== "undefined") {

        Object.values(musicTracks).forEach(song => {

            if (!song) {
                return;
            }

            song.pause();
            song.currentTime = 0;

        });

    }

}


function playAudio(name) {

    const audio = audios[name];

    if (!audio) {
        return;
    }

    // Si ya estamos reproduciendo este mismo audio,
    // no hacemos nada.
    if (currentAudio === audio && !audio.paused) {
        return;
    }

    // Detener cualquier audio anterior
    Object.values(audios).forEach(otherAudio => {

        if (otherAudio !== audio) {

            otherAudio.pause();
            otherAudio.currentTime = 0;

        }

    });

    currentAudio = audio;

    audio.volume = 0.35;

    audio.play().catch(error => {

        console.log("Audio bloqueado:", error);

    });
}

/* =========================================================
   AUDIOS DE LA REVELACIÓN FINAL
========================================================= */

function playFinalAudio(name, volume = 0.8) {

    const audio = audios[name];

    if (!audio) {
        return;
    }

    Object.values(audios).forEach(otherAudio => {

        if (otherAudio !== audio) {

            otherAudio.pause();
            otherAudio.currentTime = 0;

        }

    });

    if (typeof musicTracks !== "undefined") {

        Object.values(musicTracks).forEach(song => {

            song.pause();
            song.currentTime = 0;

        });

    }

    currentAudio = audio;

    audio.currentTime = 0;
    audio.volume = volume;

    audio.play().catch(error => {

        console.log(
            "No se pudo reproducir el audio:",
            error
        );

    });

}

/* =========================
   PRUEBA 6 - ADIVINA LA CANCIÓN
========================= */

const musicTracks = {

    1: document.getElementById("audio-cancion-1"),

    2: document.getElementById("audio-cancion-2"),

    3: document.getElementById("audio-cancion-3"),

    4: document.getElementById("audio-cancion-4")

};


let currentSong = null;


/* Detener todos los intros */

function stopAllSongs() {

    Object.values(musicTracks).forEach(song => {

        song.pause();
        song.currentTime = 0;

    });

    currentSong = null;
}


/* Comenzar la prueba */

function startMusicChallenge() {

    stopAllSongs();

    showScreen("screen-song-1");

}


/* Reproducir una canción */

function playSong(number) {

    stopAllSongs();

    const song = musicTracks[number];

    if (!song) {
        return;
    }

    currentSong = song;

    song.currentTime = 0;

    song.volume = 0.8;

    song.play().catch(error => {

        console.log(
            "No se pudo reproducir el audio:",
            error
        );

    });
}


/* Respuestas correctas */

const correctSongs = {

    1: "el-condor",

    2: "esa-mujer",

    3: "la-reina",

    4: "olvida"

};


/* Comprobar respuesta */

function checkSongAnswer(question, answer) {

    const feedback =
        document.getElementById(
            `song-feedback-${question}`
        );


    if (answer === correctSongs[question]) {

        feedback.textContent =
            "✅ ¡CORRECTO!";

        stopAllSongs();


        setTimeout(() => {

            if (question < 4) {

                showScreen(
                    `screen-song-${question + 1}`
                );

            } else {

                showScreen(
                    "screen-test-6-complete"
                );

            }

        }, 900);


    } else {

        feedback.textContent =
            "❌ No es esa... escuchen nuevamente. 😂";

    }
}
/* =========================
   PRUEBA 7 - ACERTIJOS
========================= */

let currentRiddle = 1;


/* =========================
   INICIAR PRUEBA 7
========================= */

function startRiddleChallenge() {

    currentRiddle = 1;

    showScreen("screen-riddle-1");

}


/* =========================
   RESPUESTA CORRECTA
========================= */

function riddleCorrect(riddleNumber) {

    if (riddleNumber !== currentRiddle) {
        return;
    }

    if (riddleNumber < 7) {

        currentRiddle++;

        showScreen(
            `screen-riddle-${currentRiddle}`
        );

    } else {

        showScreen(
            "screen-test-7-complete"
        );

    }

}

/* =========================================================
   REVELACIÓN FINAL - MINI DISTRACCIÓN
========================================================= */

let finalVote = null;


/* =========================================================
   INICIAR MINI DISTRACCIÓN
========================================================= */

function startFinalDistraction() {

    stopAllAudio();

    showScreen("screen-final-question-1");

}


/* =========================================================
   PASAR LAS 5 PREGUNTAS
========================================================= */

function nextFinalQuestion(questionNumber) {

    if (questionNumber < 5) {

        showScreen(
            `screen-final-question-${questionNumber + 1}`
        );

    } else {

        showScreen("screen-final-reveal-intro");

    }

}


/* =========================================================
   VOTACIÓN NIÑO / NIÑA
========================================================= */

function registerFinalVote(vote) {

    finalVote = vote;

    const feedback =
        document.getElementById("final-vote-feedback");

    if (vote === "niño") {

        feedback.textContent =
            "👦 VOTO REGISTRADO: NIÑO";

    } else {

        feedback.textContent =
            "👧 VOTO REGISTRADO: NIÑA";

    }

    /*
       Esperamos un momento para que vean
       que el voto quedó registrado.
    */

    setTimeout(() => {

        startElleReveal();

    }, 1200);

}


/* =========================================================
   REVELACIÓN "ELLE"
========================================================= */

function startElleReveal() {

    showScreen("screen-final-elle");

    const countdown =
        document.getElementById("countdown-elle");

    const reveal =
        document.getElementById("elle-reveal");

    countdown.style.display = "block";
    reveal.style.display = "none";

    /*
       La cuenta regresiva ya está escrita
       en pantalla.
    */

    setTimeout(() => {

        countdown.style.display = "none";

        reveal.style.display = "block";

    }, 2800);

}


/* =========================================================
   REVELACIÓN REAL - NIÑO
========================================================= */

function startBoyReveal() {

    showScreen("screen-final-boy-countdown");

    const countdown =
        document.getElementById("boy-countdown");

    const reveal =
        document.getElementById("boy-reveal");

    countdown.style.display = "block";
    reveal.style.display = "none";

    /*
       Esperamos a que termine la cuenta regresiva.
       Después aparece:
       
       👶 ¡¡¡NIÑOOOOOOOOOO!!!
       
       y comienza la pólvora.
    */

    setTimeout(() => {

        countdown.style.display = "none";

        reveal.style.display = "block";

        // 🔊 ¡¡¡NIÑOOOOOOOOOO!!!
        playFinalAudio("polvora", 1.0);

    }, 3000);

}


/* =========================================================
   MODIFICAR EL BOTÓN DEL TROLL
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /*
       El botón de "BUENO, AHORA SÍ..."
       llama directamente a la revelación real.
    */

    const elleButton =
        document.querySelector(
            "#elle-reveal button"
        );

    if (elleButton) {

        elleButton.onclick = () => {

            startBoyReveal();

        };

    }

});


/* =========================================================
   CONFETI
========================================================= */

function launchConfetti() {

    const canvas =
        document.getElementById("confetti-canvas");

    if (!canvas) {
        return;
    }

    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = [];

    const confettiCount = 180;

    for (let i = 0; i < confettiCount; i++) {

        pieces.push({

            x: Math.random() * canvas.width,

            y:
                Math.random() *
                canvas.height -
                canvas.height,

            width:
                Math.random() * 10 + 5,

            height:
                Math.random() * 16 + 6,

            speed:
                Math.random() * 4 + 3,

            rotation:
                Math.random() * 360,

            rotationSpeed:
                Math.random() * 8 - 4,

            color: [
                "#ff4757",
                "#1e90ff",
                "#2ed573",
                "#ffa502",
                "#a55eea",
                "#ff6b81",
                "#70a1ff"
            ][
                Math.floor(
                    Math.random() * 7
                )
            ]

        });

    }


    function animateConfetti() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        let activePieces = 0;

        pieces.forEach(piece => {

            if (piece.y < canvas.height + 30) {

                activePieces++;

                piece.y += piece.speed;

                piece.rotation +=
                    piece.rotationSpeed;

                ctx.save();

                ctx.translate(
                    piece.x,
                    piece.y
                );

                ctx.rotate(
                    piece.rotation *
                    Math.PI /
                    180
                );

                ctx.fillStyle =
                    piece.color;

                ctx.fillRect(
                    -piece.width / 2,
                    -piece.height / 2,
                    piece.width,
                    piece.height
                );

                ctx.restore();

            }

        });


        if (activePieces > 0) {

            requestAnimationFrame(
                animateConfetti
            );

        } else {

            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

        }

    }


    animateConfetti();

}


/* =========================================================
   LANZAR CONFETI AL MOSTRAR REVELACIÓN FINAL
========================================================= */

const originalShowScreen =
    showScreen;

showScreen = function(screenId) {

    originalShowScreen(screenId);

    if (screenId === "screen-final-parents-reveal") {

        setTimeout(() => {
            launchConfetti();
        }, 300);

        setTimeout(() => {
            startWeddingReveal();
        }, 7000);

    }

};

/* =========================================
   REVELACIÓN FINAL - BODA
========================================= */

function startWeddingReveal() {

    showScreen("screen-final-wedding");

    const message1 =
        document.getElementById("wedding-message-1");

    const message2 =
        document.getElementById("wedding-message-2");

    message1.style.display = "block";
    message2.style.display = "none";

    // Primero: "Ah... se me olvidaba..."
    setTimeout(() => {

        message1.style.display = "none";
        message2.style.display = "block";

        // Entra el sonido de boda
        playFinalAudio("boda", 1.0);

        // Confeti otra vez
        launchConfetti();

    }, 3000);
}