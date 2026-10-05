(() => {
    "use strict";

    document.addEventListener("DOMContentLoaded", () => {

        const $ = (selector) => document.querySelector(selector);
        const $$ = (selector) => document.querySelectorAll(selector);

        /* ---------------- MUSIC ---------------- */

        const musicButton = $("#musicButton");
        const musicTitle = $("#musicTitle");
        const backgroundMusic = $("#backgroundMusic");

        let audioContext = null;
        let melodyTimer = null;
        let melodyStep = 0;
        let usingRealAudio = false;
        let musicPlaying = false;

        const melody = [
            261.63, 329.63, 392.00, 329.63,
            293.66, 349.23, 440.00, 349.23,
            261.63, 329.63, 392.00, 523.25,
            392.00, 349.23, 329.63, 293.66
        ];

        function updateMusicUI() {
            if (!musicButton) return;

            musicButton.textContent = musicPlaying ? "❚❚" : "♫";
            musicButton.classList.toggle("playing", musicPlaying);

            if (musicTitle) {
                musicTitle.textContent = musicPlaying
                    ? "Playing: Our Song ♡"
                    : "Our Song ♡";
            }
        }

        function canUseRealAudio() {
            return backgroundMusic &&
                backgroundMusic.readyState >= 2 &&
                !backgroundMusic.error;
        }

        function createAudioContext() {
            if (!audioContext) {
                const AudioContextClass =
                    window.AudioContext || window.webkitAudioContext;

                if (!AudioContextClass) {
                    return null;
                }

                audioContext = new AudioContextClass();
            }

            return audioContext;
        }

        function playNote(frequency, startTime, duration) {
            const ctx = createAudioContext();
            if (!ctx) return;

            const oscillator = ctx.createOscillator();
            const gain = ctx.createGain();

            oscillator.type = "sine";
            oscillator.frequency.setValueAtTime(frequency, startTime);

            gain.gain.setValueAtTime(0.0001, startTime);
            gain.gain.exponentialRampToValueAtTime(0.045, startTime + 0.025);
            gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

            oscillator.connect(gain);
            gain.connect(ctx.destination);

            oscillator.start(startTime);
            oscillator.stop(startTime + duration + 0.03);
        }

        function scheduleMelody() {
            if (!musicPlaying || usingRealAudio) return;

            const ctx = createAudioContext();
            if (!ctx) return;

            const start = ctx.currentTime + 0.05;
            const noteDuration = 0.38;

            for (let i = 0; i < melody.length; i++) {
                playNote(
                    melody[(melodyStep + i) % melody.length],
                    start + i * noteDuration,
                    noteDuration * 0.9
                );
            }

            melodyStep = (melodyStep + melody.length) % melody.length;

            melodyTimer = setTimeout(
                scheduleMelody,
                melody.length * noteDuration * 1000 - 80
            );
        }

        function stopMelody() {
            if (melodyTimer) {
                clearTimeout(melodyTimer);
                melodyTimer = null;
            }
        }

        async function playMusic() {
            try {
                if (canUseRealAudio()) {
                    usingRealAudio = true;

                    await backgroundMusic.play();

                    musicPlaying = true;
                    updateMusicUI();
                    return;
                }

                const ctx = createAudioContext();

                if (!ctx) {
                    console.log("Audio is not supported by this browser.");
                    return;
                }

                await ctx.resume();

                usingRealAudio = false;
                musicPlaying = true;
                updateMusicUI();

                stopMelody();
                melodyStep = 0;
                scheduleMelody();

            } catch (error) {
                console.log("Music fallback started:", error);

                usingRealAudio = false;
                musicPlaying = true;
                updateMusicUI();

                stopMelody();
                scheduleMelody();
            }
        }

        function pauseMusic() {
            if (usingRealAudio && backgroundMusic) {
                backgroundMusic.pause();
            }

            stopMelody();

            musicPlaying = false;
            updateMusicUI();
        }

        if (backgroundMusic) {
            backgroundMusic.addEventListener("error", () => {
                usingRealAudio = false;
            });

            backgroundMusic.addEventListener("play", () => {
                usingRealAudio = true;
                musicPlaying = true;
                updateMusicUI();
            });

            backgroundMusic.addEventListener("pause", () => {
                if (usingRealAudio) {
                    musicPlaying = false;
                    updateMusicUI();
                }
            });
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

        /* ---------------- START BUTTON ---------------- */

        const startButton = $("#startButton");
        const itinerary = $("#itinerary");

        if (startButton && itinerary) {
            startButton.addEventListener("click", () => {
                itinerary.scrollIntoView({ behavior: "smooth" });
                heartBurst();
                playMusic();
            });
        }

        /* ---------------- PRAYER ---------------- */

        const prayerButton = $("#prayerButton");
        const prayerMessage = $("#prayerMessage");

        if (prayerButton && prayerMessage) {
            prayerButton.addEventListener("click", () => {
                const open = prayerMessage.classList.toggle("show");
                prayerButton.textContent =
                    open ? "Close Our Little Prayer ♡" : "Read Our Little Prayer ♡";
            });
        }

        /* ---------------- LETTER ---------------- */

        const letterButton = $("#letterButton");
        const letter = $("#letter");

        if (letterButton && letter) {
            letterButton.addEventListener("click", () => {
                const open = letter.classList.toggle("show");

                letterButton.textContent =
                    open ? "Close My Letter ♡" : "Open My Letter ♡";

                if (open) {
                    setTimeout(() => {
                        letter.scrollIntoView({
                            behavior: "smooth",
                            block: "center"
                        });
                    }, 150);
                }
            });
        }

        /* ---------------- REASONS CARDS ---------------- */

        $$(".reason-card").forEach((card) => {
            card.addEventListener("click", () => {
                card.classList.toggle("flipped");
            });

            card.addEventListener("keydown", (event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    card.classList.toggle("flipped");
                }
            });
        });

        /* ---------------- FLOATING HEARTS ---------------- */

        const floatingHearts = $("#floatingHearts");
        const glowParticles = $("#glowParticles");

        function createHeart() {
            if (!floatingHearts) return;

            const heart = document.createElement("span");
            heart.className = "heart";
            heart.textContent = Math.random() > 0.5 ? "♡" : "♥";
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.fontSize = `${12 + Math.random() * 18}px`;
            heart.style.animationDuration = `${7 + Math.random() * 7}s`;

            floatingHearts.appendChild(heart);

            setTimeout(() => heart.remove(), 15000);
        }

        function createGlow() {
            if (!glowParticles) return;

            const glow = document.createElement("span");
            glow.className = "glow";
            glow.style.left = `${Math.random() * 100}%`;
            glow.style.bottom = "-10px";
            glow.style.animationDuration = `${6 + Math.random() * 8}s`;

            glowParticles.appendChild(glow);

            setTimeout(() => glow.remove(), 15000);
        }

        setInterval(createHeart, 1800);
        setInterval(createGlow, 2500);

        function heartBurst() {
            if (!floatingHearts) return;

            for (let i = 0; i < 14; i++) {
                const heart = document.createElement("span");
                heart.className = "heart";
                heart.textContent = "♡";
                heart.style.left = `${35 + Math.random() * 30}%`;
                heart.style.bottom = `${35 + Math.random() * 30}%`;
                heart.style.fontSize = `${15 + Math.random() * 20}px`;
                heart.style.animationDuration = "2s";

                floatingHearts.appendChild(heart);

                setTimeout(() => heart.remove(), 2500);
            }
        }

        /* ---------------- TIMELINE ---------------- */

        const timelineItems = $$(".timeline-item");

        function goToTimelineItem(item) {
            const targetId = item.dataset.section;
            const target = document.getElementById(targetId);

            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        }

        timelineItems.forEach((item) => {
            item.addEventListener("click", () => {
                goToTimelineItem(item);
            });

            item.addEventListener("keydown", (event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    goToTimelineItem(item);
                }
            });
        });

        if ("IntersectionObserver" in window) {
            const timelineObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (!entry.isIntersecting) return;

                        timelineItems.forEach((item) => {
                            item.classList.toggle(
                                "active",
                                item.dataset.section === entry.target.id
                            );
                        });
                    });
                },
                { threshold: 0.35 }
            );

            ["church-section", "cafe-section", "letter-section"]
                .map((id) => document.getElementById(id))
                .filter(Boolean)
                .forEach((section) => timelineObserver.observe(section));
        }

        /* ---------------- REPLAY ---------------- */

        const replayButton = $("#replayButton");

        if (replayButton) {
            replayButton.addEventListener("click", () => {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

                heartBurst();
            });
        }

        /* ---------------- SCROLL HEART ---------------- */

        let lastScrollPosition = window.scrollY;

        window.addEventListener("scroll", () => {
            const currentPosition = window.scrollY;

            if (Math.abs(currentPosition - lastScrollPosition) > 80) {
                createScrollHeart();
                lastScrollPosition = currentPosition;
            }
        });

        function createScrollHeart() {
            if (!floatingHearts) return;

            const heart = document.createElement("span");
            heart.className = "heart";
            heart.textContent = "♡";
            heart.style.left = `${10 + Math.random() * 80}%`;
            heart.style.bottom = "0";
            heart.style.fontSize = `${12 + Math.random() * 12}px`;
            heart.style.animationDuration = "4s";

            floatingHearts.appendChild(heart);

            setTimeout(() => heart.remove(), 5000);
        }

        updateMusicUI();
    });
})();
