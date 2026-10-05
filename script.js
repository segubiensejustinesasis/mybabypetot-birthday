/* START BUTTON */

const startButton = document.getElementById("startButton");
const itinerary = document.getElementById("itinerary");

if (startButton && itinerary) {
    startButton.addEventListener("click", () => {
        itinerary.scrollIntoView({
            behavior: "smooth"
        });

        heartBurst();
        playMusic();
    });
}


/* PRAYER BUTTON */

const prayerButton = document.getElementById("prayerButton");
const prayerMessage = document.getElementById("prayerMessage");

if (prayerButton && prayerMessage) {
    prayerButton.addEventListener("click", () => {
        prayerMessage.classList.toggle("show");

        if (prayerMessage.classList.contains("show")) {
            prayerButton.textContent = "Close Our Little Prayer ♡";
        } else {
            prayerButton.textContent = "Read Our Little Prayer ♡";
        }
    });
}


/* LETTER */

const letterButton = document.getElementById("letterButton");
const letter = document.getElementById("letter");

if (letterButton && letter) {
    letterButton.addEventListener("click", () => {
        letter.classList.toggle("show");

        if (letter.classList.contains("show")) {
            letterButton.textContent = "Close My Letter ♡";

            setTimeout(() => {
                letter.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }, 200);
        } else {
            letterButton.textContent = "Open My Letter ♡";
        }
    });
}


/* MUSIC */

const musicButton = document.getElementById("musicButton");
const backgroundMusic = document.getElementById("backgroundMusic");

let musicPlaying = false;

function updateMusicButton() {
    if (!musicButton) return;

    if (musicPlaying) {
        musicButton.textContent = "❚❚";
        musicButton.classList.add("playing");
    } else {
        musicButton.textContent = "♫";
        musicButton.classList.remove("playing");
    }
}

function playMusic() {
    if (!backgroundMusic) return;

    backgroundMusic.play()
        .then(() => {
            musicPlaying = true;
            updateMusicButton();
        })
        .catch((error) => {
            console.log("Music could not start:", error);
        });
}

function pauseMusic() {
    if (!backgroundMusic) return;

    backgroundMusic.pause();
    musicPlaying = false;
    updateMusicButton();
}

if (musicButton) {
    musicButton.addEventListener("click", () => {
        if (musicPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }
    });
}

if (backgroundMusic) {
    backgroundMusic.addEventListener("play", () => {
        musicPlaying = true;
        updateMusicButton();
    });

    backgroundMusic.addEventListener("pause", () => {
        musicPlaying = false;
        updateMusicButton();
    });
}


/* REASONS WHY I LOVE YOU */

const reasonCards = document.querySelectorAll(".reason-card");

reasonCards.forEach((card) => {
    card.addEventListener("click", function () {
        this.classList.toggle("flipped");
    });
});


/* FLOATING HEARTS */

const floatingHearts = document.getElementById("floatingHearts");

function createHeart() {
    if (!floatingHearts) return;

    const heart = document.createElement("span");

    heart.classList.add("heart");

    heart.textContent = Math.random() > 0.5 ? "♡" : "♥";

    heart.style.left = Math.random() * 100 + "%";

    heart.style.fontSize =
        (12 + Math.random() * 18) + "px";

    heart.style.animationDuration =
        (7 + Math.random() * 7) + "s";

    floatingHearts.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 15000);
}

setInterval(createHeart, 1800);


/* GLOWING PARTICLES */

const glowParticles = document.getElementById("glowParticles");

function createGlow() {
    if (!glowParticles) return;

    const glow = document.createElement("span");

    glow.classList.add("glow");

    glow.style.left =
        Math.random() * 100 + "%";

    glow.style.bottom = "-10px";

    glow.style.animationDuration =
        (6 + Math.random() * 8) + "s";

    glowParticles.appendChild(glow);

    setTimeout(() => {
        glow.remove();
    }, 15000);
}

setInterval(createGlow, 2500);


/* HEART BURST */

function heartBurst() {
    if (!floatingHearts) return;

    for (let i = 0; i < 14; i++) {
        const heart = document.createElement("span");

        heart.classList.add("heart");

        heart.textContent = "♡";

        heart.style.left = "50%";
        heart.style.bottom = "50%";

        heart.style.fontSize =
            (15 + Math.random() * 20) + "px";

        heart.style.animationDuration = "2s";

        floatingHearts.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 2500);
    }
}


/* INTERACTIVE ITINERARY */

const timelineItems =
    document.querySelectorAll(".timeline-item");

timelineItems.forEach((item) => {
    item.addEventListener("click", () => {

        const targetId = item.dataset.section;
        const target = document.getElementById(targetId);

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});


/* TIMELINE SCROLL HIGHLIGHT */

const timelineObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    const sectionId =
                        entry.target.id;

                    timelineItems.forEach((item) => {

                        item.classList.toggle(
                            "active",
                            item.dataset.section === sectionId
                        );

                    });
                }
            });
        },
        {
            threshold: 0.35
        }
    );

const observedSections = [
    document.getElementById("church-section"),
    document.getElementById("cafe-section"),
    document.getElementById("letter-section")
];

observedSections.forEach((section) => {

    if (section) {
        timelineObserver.observe(section);
    }

});


/* SCROLL HEART EFFECT */

let lastScrollPosition = window.scrollY;

window.addEventListener("scroll", () => {

    const currentPosition = window.scrollY;

    if (
        Math.abs(
            currentPosition - lastScrollPosition
        ) > 80
    ) {

        createScrollHeart();

        lastScrollPosition = currentPosition;
    }

});


function createScrollHeart() {

    if (!floatingHearts) return;

    const heart = document.createElement("span");

    heart.classList.add("heart");

    heart.textContent = "♡";

    heart.style.left =
        (10 + Math.random() * 80) + "%";

    heart.style.bottom = "0px";

    heart.style.fontSize =
        (12 + Math.random() * 12) + "px";

    heart.style.animationDuration = "4s";

    floatingHearts.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 5000);
}


/* REPLAY */

const replayButton =
    document.getElementById("replayButton");

if (replayButton) {

    replayButton.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        heartBurst();
    });

}/* ==================================================
   START BUTTON
================================================== */

const startButton =
    document.getElementById("startButton");

const itinerary =
    document.getElementById("itinerary");

startButton.addEventListener("click", () => {

    itinerary.scrollIntoView({
        behavior: "smooth"
    });

    heartBurst();

    /*
        Try to start music when the user presses
        "Begin Our Day".

        This is useful because the click itself
        counts as a user interaction.
    */

    playMusic();

});


/* ==================================================
   PRAYER BUTTON
================================================== */

const prayerButton =
    document.getElementById("prayerButton");

const prayerMessage =
    document.getElementById("prayerMessage");

prayerButton.addEventListener("click", () => {

    prayerMessage.classList.toggle("show");

    if (
        prayerMessage.classList.contains("show")
    ) {

        prayerButton.textContent =
            "Close Our Little Prayer ♡";

    } else {

        prayerButton.textContent =
            "Read Our Little Prayer ♡";

    }

});


/* ==================================================
   LETTER
================================================== */

const letterButton =
    document.getElementById("letterButton");

const letter =
    document.getElementById("letter");

letterButton.addEventListener("click", () => {

    letter.classList.toggle("show");

    if (
        letter.classList.contains("show")
    ) {

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


/* ==================================================
   MUSIC PLAYER
================================================== */

const musicButton =
    document.getElementById("musicButton");

const backgroundMusic =
    document.getElementById("backgroundMusic");

let musicPlaying = false;


/*
    Update the music button appearance.
*/

function updateMusicButton() {

    if (musicPlaying) {

        musicButton.textContent = "❚❚";

        musicButton.classList.add("playing");

    } else {

        musicButton.textContent = "♫";

        musicButton.classList.remove("playing");

    }

}


/*
    Play music.
*/

function playMusic() {

    backgroundMusic
        .play()
        .then(() => {

            musicPlaying = true;

            updateMusicButton();

        })
        .catch((error) => {

            console.log(
                "Music could not start:",
                error
            );

        });

}


/*
    Pause music.
*/

function pauseMusic() {

    backgroundMusic.pause();

    musicPlaying = false;

    updateMusicButton();

}


/*
    Music button.
*/

musicButton.addEventListener(
    "click",
    () => {

        if (musicPlaying) {

            pauseMusic();

        } else {

            playMusic();

        }

    }
);


/*
    Keep button state synchronized
    with the actual audio element.
*/

backgroundMusic.addEventListener(
    "play",
    () => {

        musicPlaying = true;

        updateMusicButton();

    }
);


backgroundMusic.addEventListener(
    "pause",
    () => {

        musicPlaying = false;

        updateMusicButton();

    }
);


/* ==================================================
   REASONS FLIP CARDS
================================================== */

const reasonCards =
    document.querySelectorAll(".reason-card");

reasonCards.forEach((card) => {

    card.addEventListener("click", () => {

        card.classList.toggle("flipped");

    });

});


/* ==================================================
   FLOATING HEARTS
================================================== */

const floatingHearts =
    document.getElementById("floatingHearts");

function createHeart() {

    const heart =
        document.createElement("span");

    heart.classList.add("heart");

    heart.textContent =
        Math.random() > 0.5
            ? "♡"
            : "♥";

    heart.style.left =
        Math.random() * 100 + "%";

    heart.style.fontSize =
        (12 + Math.random() * 18) + "px";

    heart.style.animationDuration =
        (7 + Math.random() * 7) + "s";

    floatingHearts.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 15000);

}


/*
    Create hearts continuously.
*/

setInterval(
    createHeart,
    1800
);


/* ==================================================
   GLOWING PARTICLES
================================================== */

const glowParticles =
    document.getElementById("glowParticles");

function createGlow() {

    const glow =
        document.createElement("span");

    glow.classList.add("glow");

    glow.style.left =
        Math.random() * 100 + "%";

    glow.style.bottom =
        "-10px";

    glow.style.animationDuration =
        (6 + Math.random() * 8) + "s";

    glowParticles.appendChild(glow);

    setTimeout(() => {

        glow.remove();

    }, 15000);

}

setInterval(
    createGlow,
    2500
);


/* ==================================================
   HEART BURST
================================================== */

function heartBurst() {

    for (
        let i = 0;
        i < 14;
        i++
    ) {

        const heart =
            document.createElement("span");

        heart.classList.add("heart");

        heart.textContent =
            "♡";

        heart.style.left =
            "50%";

        heart.style.bottom =
            "50%";

        heart.style.fontSize =
            (15 + Math.random() * 20) + "px";

        heart.style.animationDuration =
            "2s";

        heart.style.transform =
            `translateX(
                ${(Math.random() - 0.5) * 300}px
            )`;

        floatingHearts.appendChild(heart);

        setTimeout(() => {

            heart.remove();

        }, 2500);

    }

}


/* ==================================================
   INTERACTIVE ITINERARY
================================================== */

const timelineItems =
    document.querySelectorAll(
        ".timeline-item"
    );


/*
    Clicking a timeline item
    scrolls to that section.
*/

timelineItems.forEach((item) => {

    item.addEventListener("click", () => {

        const targetId =
            item.dataset.section;

        const target =
            document.getElementById(
                targetId
            );

        if (target) {

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


/*
    Highlight timeline item
    according to the section
    currently on screen.
*/

const timelineObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    const sectionId =
                        entry.target.id;

                    timelineItems.forEach(
                        (item) => {

                            item.classList.toggle(
                                "active",
                                item.dataset.section ===
                                sectionId
                            );

                        }
                    );

                }

            });

        },
        {
            threshold: 0.35
        }
    );


const observedSections = [
    document.getElementById(
        "church-section"
    ),

    document.getElementById(
        "cafe-section"
    ),

    document.getElementById(
        "letter-section"
    )
];


observedSections.forEach(
    (section) => {

        if (section) {

            timelineObserver.observe(
                section
            );

        }

    }
);


/* ==================================================
   SCROLL HEART EFFECT
================================================== */

let lastScrollPosition =
    window.scrollY;

window.addEventListener(
    "scroll",
    () => {

        const currentPosition =
            window.scrollY;

        /*
            Only create a few extra hearts
            while the user is actively scrolling.
        */

        if (
            Math.abs(
                currentPosition -
                lastScrollPosition
            ) > 80
        ) {

            createScrollHeart();

            lastScrollPosition =
                currentPosition;

        }

    }
);


function createScrollHeart() {

    const heart =
        document.createElement("span");

    heart.classList.add("heart");

    heart.textContent =
        "♡";

    heart.style.left =
        (10 + Math.random() * 80) + "%";

    heart.style.bottom =
        "0px";

    heart.style.fontSize =
        (12 + Math.random() * 12) + "px";

    heart.style.animationDuration =
        "4s";

    floatingHearts.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 5000);

}


/* ==================================================
   REPLAY
================================================== */

const replayButton =
    document.getElementById(
        "replayButton"
    );

replayButton.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        heartBurst();

    }
);/* =========================
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
