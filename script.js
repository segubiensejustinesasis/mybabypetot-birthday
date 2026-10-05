/* =========================
   START BUTTON
========================= */

const startButton =
    document.getElementById("startButton");

const itinerary =
    document.getElementById("itinerary");

startButton.addEventListener("click", () => {

    itinerary.scrollIntoView({
        behavior: "smooth"
    });

});


/* =========================
   PRAYER BUTTON
========================= */

const prayerButton =
    document.getElementById("prayerButton");

const prayerMessage =
    document.getElementById("prayerMessage");

prayerButton.addEventListener("click", () => {

    prayerMessage.classList.toggle("show");

    if (prayerMessage.classList.contains("show")) {

        prayerButton.textContent =
            "Close Our Little Prayer ♡";

    } else {

        prayerButton.textContent =
            "Read Our Little Prayer ♡";

    }

});


/* =========================
   LETTER
========================= */

const letterButton =
    document.getElementById("letterButton");

const letter =
    document.getElementById("letter");

letterButton.addEventListener("click", () => {

    letter.classList.toggle("show");

    if (letter.classList.contains("show")) {

        letterButton.textContent =
            "Close My Letter ♡";

        setTimeout(() => {

            letter.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }, 200);

    } else {

        letterButton.textContent =
            "Open My Letter ♡";

    }

});


/* =========================
   REPLAY
========================= */

const replayButton =
    document.getElementById("replayButton");

replayButton.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================
   MUSIC
========================= */

const musicButton =
    document.getElementById("musicButton");

const backgroundMusic =
    document.getElementById("backgroundMusic");

let musicPlaying = false;

musicButton.addEventListener("click", () => {

    if (musicPlaying) {

        backgroundMusic.pause();

        musicButton.textContent = "♫";

        musicPlaying = false;

    } else {

        backgroundMusic.play()
            .then(() => {

                musicButton.textContent = "❚❚";

                musicPlaying = true;

            })
            .catch(() => {

                alert(
                    "Please add your song as 'our-song.mp3' inside the music folder."
                );

            });

    }

});


/* =========================
   FLOATING HEARTS
========================= */

const floatingHearts =
    document.getElementById("floatingHearts");

function createHeart() {

    const heart =
        document.createElement("span");

    heart.classList.add("heart");

    heart.textContent = "♡";

    heart.style.left =
        Math.random() * 100 + "%";

    heart.style.fontSize =
        (12 + Math.random() * 18) + "px";

    heart.style.animationDuration =
        (7 + Math.random() * 7) + "s";

    floatingHearts.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 14000);

}

setInterval(createHeart, 1800);


/* =========================
   BUTTON HEART BURST
========================= */

function heartBurst() {

    for (let i = 0; i < 12; i++) {

        const heart =
            document.createElement("span");

        heart.classList.add("heart");

        heart.textContent = "♡";

        heart.style.left =
            "50%";

        heart.style.bottom =
            "50%";

        heart.style.fontSize =
            (15 + Math.random() * 20) + "px";

        heart.style.animationDuration =
            "2s";

        heart.style.transform =
            `translateX(${(Math.random() - 0.5) * 300}px)`;

        floatingHearts.appendChild(heart);

        setTimeout(() => {

            heart.remove();

        }, 2500);

    }

}

startButton.addEventListener(
    "click",
    heartBurst
);