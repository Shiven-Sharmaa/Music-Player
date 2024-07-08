const music = ['Intro','RealFriends','Cindrella','fein','MissAlissa','box', 'mockingbird','lucid dreams'];

const themebutton = document.getElementById('theme');
const head = document.getElementById('header');

const title = document.getElementById('currtitle');
const imagedp = document.getElementById('imgdp');
const nextimg = document.getElementById('nextimg');
const nextxt = document.getElementById('nexttxt');
var upcomingtitle=document.getElementById('nexttitle');

const playbutton = document.getElementById('play');
const prevbutton = document.getElementById('prev');
const nextbutton = document.getElementById('next');
const nexttitle = document.getElementById('nextsongtitle');
const musicbody = document.getElementById('musicbody');

const audio = document.getElementById('audio');

const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');

const progress = document.getElementById('progress');
const currentProgress = document.getElementById('curr-prog');

const volumebar = document.querySelector('#volumebar');
const volume = document.querySelector('#volume');

const queue = document.getElementsByClassName('queuesongs');

var isDark = false;

function updateVolume() {
    const songVolume = audio.volume;
    const percentage = songVolume*100;
    volume.style.width = percentage+'%';
}

function setVolume(e) {
    const width = this.clientWidth;
    const clickWidth = e.offsetX;
    audio.volume = clickWidth / width;
    updateVolume();
}

let IndMusic = 0;

load(music[IndMusic]);
loadnext(IndMusic);

function loadnext(index) {
    for (var i=0;i<queue.length;i++) {
        queue[i].innerText =music[(index+i+1)%8].toUpperCase();
    }
    nextimg.src = `images/${music[(index + 1) % 8]}.jpg`;
    upcomingtitle.innerText = `${music[(index + 1) % 8]}`;
}

function load(song) {
    title.innerText = song.toUpperCase();
    audio.src = `music/${song}.mp3`;
    imagedp.src = `images/${song}.jpg`;
    updateVolume();
}

function play() {
    musicbody.classList.add('play');
    playbutton.innerHTML = "PAUSE";
    audio.play();
}
function pause() {
    musicbody.classList.remove('play');
    playbutton.innerHTML = "PLAY";
    audio.pause();
}
function Backward() {
    IndMusic--;

    if (IndMusic < 0) {
    IndMusic = music.length - 1;
    }

    load(music[IndMusic]);
    loadnext(IndMusic);

    play();
}
function Forward() {
    IndMusic++;

    if (IndMusic > music.length - 1) {
    IndMusic = 0;
    }

    load(music[IndMusic]);
    loadnext(IndMusic);
    play();
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickWidth = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickWidth / width) * duration;
}

function DurTime(e) {
    var sec;
    var seconds;
    const { duration, currentTime } = e.srcElement;

    let min = (currentTime == null) ? 0 :
        Math.floor(currentTime / 60);
    min = min < 10 ? '0' + min : min;

    function sec(x) {
        if (Math.floor(x) >= 60) {
            for (var i = 1; i <= 60; i++) {
                if (Math.floor(x) >= (60 * i) && Math.floor(x) < (60 * (i + 1))) {
                    sec = Math.floor(x) - (60 * i);
                    sec = sec < 10 ? '0' + sec : sec;
                }
            }
        }
        else {
            sec = Math.floor(x);
            sec = sec < 10 ? '0' + sec : sec;
        }
    }
	sec (currentTime,sec);
	let min_d = (isNaN(duration) === true)? '0':
		Math.floor(duration/60);
	 min_d = min_d <10 ? '0'+min_d:min_d;

    
    

	 function GetSeconds (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					seconds = Math.floor(x) - (60*i);
					seconds = seconds <10 ? '0'+seconds:seconds;
				}
			}
        }
        else {
		 	seconds = (isNaN(duration) === true)? '0':
		 	Math.floor(x);
		 	seconds = seconds <10 ? '0'+seconds:seconds;
		 }
	} 

	GetSeconds (duration);
};

playbutton.addEventListener('click', () => {
    const isPlaying = musicbody.classList.contains('play');
    if (isPlaying) {
        pause();
    }
    else {
        play();
    }
}
);

function ChangeTheme() {
    let body = document.querySelector("body");
    if (isDark) {
        body.style.backgroundColor = '#CAD2C5';
        head.style.color = '#2F3E46';
        isDark = false;
        themebutton.innerText = 'DARK';
        themebutton.style.color = '#2F3E46';
        nextxt.style.color = '#2F3E46';
        upcomingtitle.style.color = '#2F3E46';
    }
    else {
        body.style.backgroundColor = '#182025';
        head.style.color = '#CAD2C5';
        isDark = true;
        themebutton.innerText = 'LIGHT';
        themebutton.style.color = '#CAD2C5';
        nextxt.style.color = '#CAD2C5';
        upcomingtitle.style.color = '#CAD2C5';
    }
    
}

currentProgress.addEventListener('click', setProgress);
volumebar.addEventListener('click', setVolume);

prevbutton.addEventListener('click', Backward);
nextbutton.addEventListener('click', Forward);

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', Forward);
audio.addEventListener('timeupdate', DurTime);

themebutton.addEventListener('click', ChangeTheme);