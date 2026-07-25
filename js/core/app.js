/* ==========================================================
   Birthday DLC
   Version 0.3
========================================================== */

// =============================
// Scene Elements
// =============================

const intro = document.getElementById("intro");
const loading = document.getElementById("loading");
const title = document.getElementById("title");
const mainMenu = document.getElementById("mainMenu");
const credits = document.getElementById("credits");
const storyChapters = document.getElementById("storyChapters");
const storyDetail = document.getElementById("storyDetail");
const progressFill = document.querySelector(".progress-fill");
const progressText = document.querySelector(".progress-area span");
const secretButton = document.getElementById("secretButton");
const achievements = document.getElementById("achievements");
const playerStats = document.getElementById("playerStats");
const galleryScene = document.getElementById("gallery");
const galleryViewer = document.getElementById("galleryViewer");
const viewerImage = document.getElementById("viewerImage");
const viewerTitle = document.getElementById("viewerTitle");
const secretIntro = document.getElementById("secretIntro");
const secretLoadingFill = document.getElementById("secretLoadingFill");
const secret = document.getElementById("secret");
const openGift = document.getElementById("openGift");
const letterPopup = document.getElementById("letterPopup");
const giftButton = document.getElementById("openGift");
const giftPopup = document.getElementById("giftPopup");
const dlcComplete = document.getElementById("dlcComplete");

const scenes = {
    intro,
    loading,
    title,
    mainMenu,
    credits,
    storyChapters,
    storyDetail,
    achievements,
    playerStats,
    gallery: galleryScene,
    galleryViewer,
    secretIntro,
    secret,
    dlcComplete
};

// =============================
// DLC Progress
// =============================

let dlcProgress = 0;

const unlocked = {

    chapter1:false,
    chapter2:false,
    chapter3:false,

    achievements:false,
    stats:false,
    gallery:false,

    secretUnlocked:false,
    secret:false,

    letter:false,

    gift:false,

    credits:false

};

// =============================
// Loading Elements
// =============================

const loadingFill = document.getElementById("loadingFill");
const loadingMessage = document.getElementById("loadingMessage");

// =============================
// Messages
// =============================

const loadingMessages = [
    "Checking Player Profile...",
    "Loading Birthday DLC...",
    "Downloading Special Edition...",
    "Syncing Player Save...",
];

// =============================
// Settings
// =============================

const INTRO_DURATION = 5000;      // Sony screen
const LOADING_INTERVAL = 60;      // Smaller = Faster

// =============================
// Scene Manager
// =============================

function showScene(name) {

    // Remove active from every scene
    Object.values(scenes).forEach(scene => {
        scene.classList.remove("active");
    });

    // Activate requested scene
    scenes[name].classList.add("active");
}

// =============================
// Reveal Animation
// =============================

function animateTitle() {

    const reveals = document.querySelectorAll("#title .reveal");

    reveals.forEach(item => item.classList.remove("show"));

    const timings = [2000, 5000];

    reveals.forEach((item, index) => {

        const delay = timings[index] ?? (900 + (index - 1) * 600);

        setTimeout(() => {

            item.classList.add("show");

        }, delay);

    });

}

// =============================
// Loading Screen
// =============================

function startLoading() {

    showScene("loading");

    let progress = 0;
    let messageIndex = 0;

    loadingFill.style.width = "0%";
    loadingMessage.textContent = loadingMessages[0];

    const interval = setInterval(() => {

        progress++;

        loadingFill.style.width = progress + "%";

        // Change message every 20%
        if (
            progress % 20 === 0 &&
            messageIndex < loadingMessages.length - 1
        ) {
            messageIndex++;
            loadingMessage.textContent = loadingMessages[messageIndex];
        }

        if (progress >= 100) {

            clearInterval(interval);

            setTimeout(() => {

                showScene("title");
                animateTitle();

            }, 500);

        }

    }, LOADING_INTERVAL);

}

// =============================
// Launch Sequence
// =============================

function launchSequence() {

    showScene("intro");

    setTimeout(() => {

        startLoading();

    }, INTRO_DURATION);

}

// =============================
// Start Button
// =============================

document
    .getElementById("startButton")
    .addEventListener("click", () => {

        showScene("mainMenu");

        document
        .getElementById("background")
        .classList.add("menu-mode");

    });

// =============================
// Animated Background Particles
// =============================

function createParticles(mode="intro"){


    const background = document.getElementById("background");


    // remove old particles

    background.innerHTML="";


    let total;


    if(mode==="credits"){

        total = 70;

    }
    else{

        total = 200;

    }



    for(let i=0;i<total;i++){


        const p=document.createElement("div");


        p.classList.add("particle");


        if(mode==="credits"){

            p.classList.add("credit-particle");

        }



        const size=Math.random()*3+1;


        p.style.width=size+"px";

        p.style.height=size+"px";


        p.style.left=Math.random()*100+"%";

        p.style.top=Math.random()*100+"%";



        if(mode==="credits"){

            p.style.animationDuration =
            (35 + Math.random()*30) + "s, " +
            (4 + Math.random()*5) + "s";

        }
        else{


            p.style.animationDuration =
            (18 + Math.random()*20) + "s, " +
            (2 + Math.random()*3) + "s";

        }



        p.style.animationDelay =
            Math.random()*10+"s";



        background.appendChild(p);


    }


}

// SHOOTING STARS

function createShootingStar(){

    const layer =
    document.getElementById("shootingStars");

    if(!layer) return;

    const star =
    document.createElement("div");

    star.className = "shooting-star";

    star.style.top =
        Math.random()*40 + "%";

    star.style.left =
        (70 + Math.random()*25) + "%";

    star.style.animationDuration =
        (1 + Math.random()*0.8) + "s";

    layer.appendChild(star);

    setTimeout(()=>{

        star.remove();

    },2000);

}

// =============================
// Start Website
// =============================

window.addEventListener("load", () => {

    createParticles("intro");

    launchSequence();

});

const menuItems =
document.querySelectorAll(".menu-item");


const menuHint =
document.getElementById("menuHint");



menuItems.forEach(item=>{


    item.addEventListener("mouseenter",()=>{


        if(item.classList.contains("locked")){


            menuHint.textContent =
            "COMPLETE DLC PROGRESS 70% TO UNLOCK";


        }

        else{


            menuHint.textContent="";


        }


    });



    item.addEventListener("mouseleave",()=>{

        menuHint.textContent="";

    });


});

// =============================
// Credits Navigation
// =============================


document
.querySelector(".menu-item:last-child")
.addEventListener("click",()=>{

    createCreditsParticles("credits");

    //unlock("stats", 5);

    showScene("credits");


});

document
.getElementById("backCredits")
.addEventListener("click",()=>{


    showScene("mainMenu");


});

function createCreditsParticles(){


    const background =
    document.getElementById("creditsParticles");


    background.innerHTML="";


    for(let i=0;i<30;i++){


        const p=document.createElement("div");


        p.classList.add("particle");


        const size=Math.random()*3+1;


        p.style.width=size+"px";
        p.style.height=size+"px";


        p.style.left=Math.random()*100+"%";
        p.style.top=Math.random()*100+"%";


        p.style.animationDuration =
        (35 + Math.random()*30) + "s, " +
        (4 + Math.random()*5) + "s";


        p.style.animationDelay =
        Math.random()*10+"s";


        background.appendChild(p);

    }


}

document
.querySelector(".menu-item")
.addEventListener("click",()=>{


    showScene("storyChapters");


});

document
.getElementById("backStory")
.addEventListener("click",()=>{


    showScene("mainMenu");


});

const chapters = [

{

number:"CHAPTER 01",

title:"THE FIRST ENCOUNTER",

date:"24 AUGUST 2025",

story:
`24 August 2025 was the day everything began.

We met for the first time while playing Marvel Rivals. What started as one random match quickly became something much bigger.

Before we knew it, we were spending hours playing games, chatting, laughing, and becoming part of each other's everyday lives.

One simple game connected two people from different parts of the world and started a journey neither of us expected.`,

moments:[

"First Marvel Rivals match",

"First conversation",

"Endless games together",

"The beginning of our story"

]

},

{

number:"CHAPTER 02",

title:"A NEW CHAPTER BEGINS",

date:"5 OCTOBER 2025",

story:
`5 October 2025 was the day our story became something even more special.

After months of gaming, talking, and sharing countless moments together, you finally said "I love you" to me and we started our relationship.

From that day on, we weren't just teammates in games, we became partners in life. We celebrated with thoughtful gifts, unforgettable memories, and a promise to keep writing our story together, no matter the distance.`,

moments:[

"Your first 'I love you'",

"Officially became a couple",

"Exchanged meaningful gifts",

"The start of our forever story",

]

},

{

number:"CHAPTER 03",

title:"OUR FIRST BIRTHDAY",

date:"26 JULY 2026",

story:
`26 July 2026 is now another unforgettable milestone in our journey.

Although we are celebrating from different parts of the world, the distance can never stop us from making the day special. Every message, every surprise, and every thoughtful gift made it a moment to remember.

This Birthday DLC was created to celebrate you and everything we've shared so far, a small collection of our memories, our adventures, and a reminder of how far we've come together.`,

moments:[

"Our first birthdays together",

"Birthday surprises",

"Gifts made with love",

"Celebrating across the continents"

]

}

];

function openChapter(index){

    if(index===0){

        unlock("chapter1",15);

    }

    if(index===1){

        unlock("chapter2",15);

    }

    if(index===2){

    unlock("chapter3",15);

}

    const chapter = chapters[index];

    document.getElementById("chapterNumber").textContent =
    chapter.number;

    document.getElementById("chapterTitle").textContent =
    chapter.title;

    document.getElementById("chapterDate").textContent =
    chapter.date;

    document.getElementById("chapterStory").textContent =
    chapter.story;

    

    showScene("storyDetail");

}

const chapterItems =
document.querySelectorAll(".chapter-item");

chapterItems.forEach((item,index)=>{

    if(index < chapters.length){

        item.addEventListener("click",()=>{

            openChapter(index);

        });

    }

});

document
.getElementById("backChapter")
.addEventListener("click",()=>{

    showScene("storyChapters");

});

function updateProgress(){

    progressFill.style.width =
    dlcProgress + "%";

    progressText.textContent =
    dlcProgress + "%";

    if(dlcProgress >= 70 && !unlocked.secretUnlocked){

    unlocked.secretUnlocked = true;

    secretButton.classList.remove("locked");

    secretButton.querySelector("small").textContent =
    "UNLOCKED";

}

}

function unlock(item, amount){

    if(unlocked[item]) return;

    unlocked[item] = true;

    dlcProgress += amount;

    updateProgress();

}

document
.querySelectorAll(".menu-item")[1]
.addEventListener("click",()=>{

    unlock("achievements",10);

    showScene("achievements");

});

document
.getElementById("backAchievements")
.addEventListener("click",()=>{

    showScene("mainMenu");

});

document
.getElementById("openStats")
.addEventListener("click",()=>{

    unlock("stats", 5);

    showScene("playerStats");

});

document
.getElementById("closeStats")
.addEventListener("click",()=>{

    showScene("achievements");

});

let shootingInterval;

document
.querySelector(".menu-item:nth-child(3)")
.addEventListener("click",()=>{

    unlock("gallery",10);

    showScene("gallery");

    shootingInterval = setInterval(() => {

    createShootingStar();
    //createShootingStar();
    //createShootingStar();

}, 1000);

});

document
.getElementById("backGallery")
.addEventListener("click",()=>{

    clearInterval(shootingInterval);

    showScene("mainMenu");

});

const gallery = [

{

title:"CUTIE PIE",

image:"assets/images/gallery1.jpg"

},

{

title:"CRIME PARTNERS",

image:"assets/images/gallery2.jpg"

},

{

title:"BEAUTIFUL GAL",

image:"assets/images/gallery3.jpg"

},

{

title:"SO HOT !!!",

image:"assets/images/gallery4.jpg"

},

{

title:"BISCUIT <3",

image:"assets/images/gallery5.jpg"

},

{

title:"US WHEN ?",

image:"assets/images/gallery6.jpg"

}

];

let currentImage = 0;

function openGallery(index){

    currentImage = index;

    viewerImage.src = gallery[index].image;

    viewerTitle.textContent = gallery[index].title;

    showScene("galleryViewer");


}

document
.getElementById("prevImage")
.addEventListener("click",()=>{

    currentImage--;

    if(currentImage < 0)
        currentImage = gallery.length-1;

    openGallery(currentImage);

});

document
.getElementById("nextImage")
.addEventListener("click",()=>{

    currentImage++;

    if(currentImage >= gallery.length)
        currentImage = 0;

    openGallery(currentImage);

});

document
.getElementById("closeViewer")
.addEventListener("click",()=>{

    showScene("gallery");

});

document
.querySelectorAll(".gallery-item")
.forEach((item, index) => {

    item.addEventListener("click", () => {

        openGallery(index);

    });

});

secretButton.addEventListener("click",()=>{

    if(!unlocked.secretUnlocked)
        return;

    unlock("secret",10);

    startSecretIntro();

});

function startSecretIntro(){

    showScene("secretIntro");

    const text =
    document.getElementById("secretLoadingText");

    secretLoadingFill.style.width="0%";

    text.textContent =
    "Preparing Birthday DLC...";

    setTimeout(()=>{

        secretLoadingFill.style.width="35%";

        text.textContent=
        "Decrypting Birthday Files...";

    },2000);

    setTimeout(()=>{

        secretLoadingFill.style.width="70%";

        text.textContent=
        "Loading Special Memories...";

    },4000);

    setTimeout(()=>{

        secretLoadingFill.style.width="100%";

        text.textContent=
        "...3...2...1";

    },6000);

    setTimeout(()=>{

        showScene("secret");

    },8000);

}

document
.getElementById("backSecret")
.addEventListener("click",()=>{

    if(dlcProgress >= 100){

    createCompleteConfetti();

    showScene("dlcComplete");

    setTimeout(()=>{

        showScene("mainMenu");

    },10000);

}
else{

    showScene("mainMenu");

}

});

const balloonLayer =
document.getElementById("balloons");

for(let i=0;i<8;i++){

    const balloon =
    document.createElement("div");

    balloon.className="balloon";

    balloon.style.left=Math.random()*100+"%";

    balloon.style.animationDuration=
    10+Math.random()*8+"s";

    balloon.style.animationDelay=
    Math.random()*5+"s";

    balloon.style.background=

    `hsl(${Math.random()*360},80%,75%)`;

    balloonLayer.appendChild(balloon);

}

document
.getElementById("openLetter")
.addEventListener("click",()=>{

    unlock("letter",10);

    giftButton.classList.remove("locked-button");

    letterPopup.classList.add("show");

});

document
.getElementById("closeLetter")
.addEventListener("click",()=>{

    letterPopup.classList.remove("show");

});

giftButton.addEventListener("click",()=>{

    if(!unlocked.letter)
        return;

    unlock("gift",10);

    giftPopup.classList.add("show");

});

document
.getElementById("closeGift")
.addEventListener("click",()=>{

    giftPopup.classList.remove("show");

});

const confettiLayer =
document.getElementById("confetti");

for(let i=0;i<35;i++){

    const c=document.createElement("div");

    c.className="confetti";

    c.style.left=Math.random()*100+"%";

    c.style.background=
    `hsl(${Math.random()*360},90%,70%)`;

    c.style.animationDuration=
    6+Math.random()*5+"s";

    c.style.animationDelay=
    Math.random()*5+"s";

    confettiLayer.appendChild(c);

}

function createCompleteConfetti(){

    const layer =
    document.getElementById("completeConfetti");

    layer.innerHTML="";

    const colors=[

        "#ff9ecf",
        "#9fd8ff",
        "#ffe38a",
        "#98ff98",
        "#c6a4ff"

    ];

    for(let i=0;i<60;i++){

        const c=document.createElement("div");

        c.className="complete-confetti";

        c.style.left=Math.random()*100+"%";

        c.style.background=
        colors[Math.floor(Math.random()*colors.length)];

        c.style.animationDuration=
        (5+Math.random()*4)+"s";

        c.style.animationDelay=
        Math.random()*5+"s";

        layer.appendChild(c);

    }

}

