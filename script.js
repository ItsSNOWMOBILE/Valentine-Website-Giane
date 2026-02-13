const phrases = [
    "I love you",
    "I adore you",
    "I love your smile",
    "You’re beautiful",
    "I miss you",
    "I want to kiss you",
    "I want to hug you",
    "I want to see you",
    "I love your personality",
    "You’re perfect",
    "I’m so lucky",
    "I love your eyes",
    "You’ll make it",
    "You’re so strong",
    "I love you so much",
    "I can’t wait to see you in summer",
    "I love your style",
    "I love your smell",
    "Je t’aime",
    "You are amazing",
    "Bhebik",
    "I’m yours",
    "Te amo",
    "You’re my favorite trouble",
    "I love your voice",
    "You are a work of art",
    "You are gorgeous",
    "You charm me every time I look at you",
    "I love you so much more than you do.",
    "I’m so happy you’re in my life"
];

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

const flowers = document.querySelectorAll('.petal');
const messageBox = document.getElementById('message-display');
const messageText = document.getElementById('message-text');
const bouquetScreen = document.getElementById('bouquet-screen');
const questionScreen = document.getElementById('question-screen');
const celebrationScreen = document.getElementById('celebration-screen');

let clickedCount = 0;
const totalPetals = flowers.length;
let shuffledPhrases = shuffle([...phrases]);

flowers.forEach((petal, index) => {
    petal.addEventListener('click', function (e) {
        if (this.classList.contains('falling')) return;
        handlePetalClick(this, index, e);
    });
});

function handlePetalClick(petal, index, event) {
    petal.classList.add('falling');

    const phrase = shuffledPhrases[index % shuffledPhrases.length];
    createBubble(petal, phrase);

    clickedCount++;
    if (document.getElementById('counter-pill')) {
        document.getElementById('counter-pill').textContent = `${clickedCount} / ${totalPetals} petals`;
    }

    if (clickedCount === totalPetals) {
        setTimeout(transitionToQuestion, 1500);
    }
}

function createBubble(targetElement, text) {
    const bubble = document.createElement('div');
    bubble.classList.add('msg-bubble');
    bubble.textContent = text;

    const rect = targetElement.getBoundingClientRect();
    const containerRect = document.querySelector('.container').getBoundingClientRect();

    const left = rect.left - containerRect.left + (rect.width / 2);
    const top = rect.top - containerRect.top - 20;

    bubble.style.left = `${left}px`;
    bubble.style.top = `${top}px`;

    bubble.style.transform = 'translate(-50%, 0)';

    document.querySelector('.container').appendChild(bubble);

    setTimeout(() => {
        bubble.remove();
    }, 1000);
}

function transitionToQuestion() {
    bouquetScreen.classList.remove('active');
    bouquetScreen.classList.add('exit');
    setTimeout(() => {
        bouquetScreen.classList.add('hidden');
        bouquetScreen.classList.remove('exit');
        questionScreen.classList.remove('hidden');
        setTimeout(() => {
            questionScreen.classList.add('active');
        }, 50);
    }, 600);
}

window.handleYes = function () {
    questionScreen.classList.remove('active');
    questionScreen.classList.add('exit');
    setTimeout(() => {
        questionScreen.classList.add('hidden');
        questionScreen.classList.remove('exit');
        celebrationScreen.classList.remove('hidden');
        setTimeout(() => {
            celebrationScreen.classList.add('active');
            triggerConfetti();
        }, 50);
    }, 600);
};

function triggerConfetti() {
    const duration = 5000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 7,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ff4d6d', '#ff8fa3', '#ffffff', '#ffcf33']
        });
        confetti({
            particleCount: 7,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ff4d6d', '#ff8fa3', '#ffffff', '#ffcf33']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

const musicContainer = document.getElementById('music-container');
const introScreen = document.getElementById('intro-screen');
const introMessageEl = document.getElementById('intro-message');
const introHintEl = document.getElementById('intro-hint');


const introText = "Hey my love,\n\nI know things have been tough the last few months. I know how much trouble you’ve been going through, and I understand how you feel.\n\nI’ve loved you ever since we started talking, from the day our two-hour date turned into a twelve hour one—and even today.\n\nI hope you know how much I love you, and how deeply worried I get for you. I hope this small gesture can make you feel better about yourself, even if for a little bit.\n\nYours truly,\nJean-Paul";
let introCharIndex = 0;
let isIntroTyping = false;
let introTypeSpeed = 50;

function typeIntro() {
    if (introCharIndex < introText.length) {
        isIntroTyping = true;
        if (introText.charAt(introCharIndex) === '\n') {
            introMessageEl.innerHTML += '<br>';
        } else {
            introMessageEl.innerHTML += introText.charAt(introCharIndex);
        }
        introCharIndex++;
        setTimeout(typeIntro, introTypeSpeed);
    } else {
        isIntroTyping = false;
        introHintEl.classList.remove('hidden');
    }
}

if (introScreen) {
    setTimeout(typeIntro, 800);

    introScreen.addEventListener('click', () => {
        if (isIntroTyping) {
            isIntroTyping = false;
            introMessageEl.innerHTML = introText.replace(/\n/g, '<br>');
            introCharIndex = introText.length;
            introHintEl.classList.remove('hidden');
            return;
        }

        introScreen.classList.add('hidden');
        introScreen.classList.remove('active');
        bouquetScreen.classList.remove('hidden');
        bouquetScreen.classList.add('active');

    });
}
const bgMusic = document.getElementById('bg-music');
let isMusicPlaying = false;

document.body.addEventListener('click', function () {
    if (!isMusicPlaying) {
        bgMusic.play().then(() => {
            isMusicPlaying = true;
            musicContainer.classList.add('playing');
        }).catch(err => {
            console.log("Autoplay prevented:", err);
        });
    }
}, { once: true });

musicContainer.addEventListener('click', (e) => {
    e.stopPropagation();
    if (bgMusic.paused) {
        bgMusic.play();
        musicContainer.classList.add('playing');
        isMusicPlaying = true;
    } else {
        bgMusic.pause();
        musicContainer.classList.remove('playing');
        isMusicPlaying = false;
    }
});
