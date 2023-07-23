const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const prev = document.querySelector("#controls #prev");
const play = document.querySelector("#controls #play");
const next = document.querySelector("#controls #next");
const duration = document.querySelector("#duration");
const progressBar = document.querySelector("#progress-bar");
const currentTime = document.querySelector("#current-time");
const volumeRange = document.getElementById("volumeRange");
const volumeIcon = document.querySelector("#volume-icon");

const player = new MusicPlayer(musicList);

window.addEventListener("load", () => {
    let music = player.getMusic();
    displayMusic(music);
});

function displayMusic(music) {
    title.innerText = music.getName();
    singer.innerText = music.singer;
    image.src = "img/" + music.img;
    audio.src = "mp3/" + music.file;
}

play.addEventListener("click", () => {
    const isMusicPlay = container.classList.contains("playing");
    isMusicPlay ? pauseMusic() : playMusic();
});

function pauseMusic() {
    container.classList.remove("playing");
    play.classList = "fa-solid fa-play";
    audio.pause();
}

function playMusic() {
    container.classList.add("playing");
    play.classList = "fa-solid fa-pause";

    audio.play();
}

prev.addEventListener("click", () => {
    prevMusic();
});

function prevMusic() {
    player.prev();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
}

next.addEventListener("click", () => {
    nextMusic();
});

function nextMusic() {
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
}

prev.addEventListener("click", () => {
    player.prev();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
});

function calculateTime(audioDuration) {
    const minute = Math.floor(audioDuration / 60);
    const second = Math.floor(audioDuration % 60);
    const updatedSecond = second < 10 ? `0${second}` : `${second}`;
    const result = `${minute}:${updatedSecond}`;
    return result;
}

audio.addEventListener("loadedmetadata", () => {
    duration.textContent = calculateTime(audio.duration);
    progressBar.max = Math.floor(audio.duration);
});

audio.addEventListener("timeupdate", () => {
    progressBar.value = Math.floor(audio.currentTime);
    currentTime.textContent = calculateTime(audio.currentTime);
});

volumeRange.addEventListener("input", () => {
    audio.volume = volumeRange.value;
});

progressBar.addEventListener("input", () => {
    currentTime.textContent = calculateTime(progressBar.value);
    audio.currentTime = progressBar.value;
});

document.body.addEventListener("keydown", (event) => {
    if (event.key === " ") {
        event.preventDefault(); // To prevent the page from scrolling
        const isMusicPlay = container.classList.contains("playing");
        isMusicPlay ? pauseMusic() : playMusic();
    }
});

function volume(progressBar, volumeIcon) {
    if (progressBar.value == 0) {
        volumeIcon.classList.remove("fa-volume-high");
        volumeIcon.classList.remove("fa-volume-low");
        volumeIcon.classList.add("fa-volume-xmark");
    } else if (progressBar.value == 1) {
        volumeIcon.classList.remove("fa-volume-xmark");
        volumeIcon.classList.remove("fa-volume-low");
        volumeIcon.classList.add("fa-volume-high");
    } else {
        volumeIcon.classList.remove("fa-volume-xmark");
        volumeIcon.classList.remove("fa-volume-high");
        volumeIcon.classList.add("fa-volume-low");
    }
}

volumeRange.addEventListener("input", () => {
    audio.volume = volumeRange.value;
    volume(volumeRange, volumeIcon);
});

let statu = "on";

volumeIcon.addEventListener("click", () => {
    if (statu === "on") {
        audio.muted = true;
        statu = "off";
        if (audio.volume === 1) {
            volumeIcon.classList.remove("fa-volume-high");
            volumeIcon.classList.add("fa-volume-xmark");
        } else {
            volumeIcon.classList.remove("fa-volume-low");
            volumeIcon.classList.add("fa-volume-xmark");
        }
    } else {
        audio.muted = false;
        statu = "on";
        if (audio.volume === 1) {
            volumeIcon.classList.remove("fa-volume-low");
            volumeIcon.classList.remove("fa-volume-xmark");
            volumeIcon.classList.add("fa-volume-high");
        } else if (audio.volume === 0) {
            volumeIcon.classList.remove("fa-volume-low");
            volumeIcon.classList.remove("fa-volume-high");
            volumeIcon.classList.add("fa-volume-xmark");
        } else {
            volumeIcon.classList.remove("fa-volume-xmark");
            volumeIcon.classList.remove("fa-volume-high");
            volumeIcon.classList.add("fa-volume-low");
        }
    }
});
