console.log("Dhwani Music App");
// variable declaration

let songIndex = 0;
let audioElement = new Audio('songs/Mangal Bhavan Amangal Hari.mp3');
let masterPlay = document.getElementById('masterPlay');
let duration = document.getElementById('duration');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItems'));


let songs = [
    { songName: "Mangal Bhavan Amangal Hari", filePath: "songs/1.mp3", coverPath: "covers/cover1.jpg" },
    { songName: "Mere Bhagwan Aaye Hai", filePath: "songs/2.mp3", coverPath: "covers/cover2.jpg" },
    { songName: "Meri Ram Ji Se Keh Dena Jay Siyaram", filePath: "songs/3.mp3", coverPath: "covers/cover3.jpg" },
    { songName: "Ram Aayenge To Angna Sajaungi", filePath: "songs/4.mp3", coverPath: "covers/cover4.jpg" },
    { songName: "Yug Ram Raj Ka Aa Gaya", filePath: "songs/5.mp3", coverPath: "covers/cover5.jpg" },
]



songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

});
// Handle play/pause button
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
});

// listen events
audioElement.addEventListener('timeupdate', () => {
    // seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    duration.value = progress;
})
duration.addEventListener('change', () => {
    audioElement.currentTime = (duration.value * audioElement.duration) / 100;
});

const enableAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
};

// const enableAllPlays = () => {
//     Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, index) => {
//         if (index !== songIndex) {
//             element.classList.remove('fa-circle-pause');
//             element.classList.add('fa-circle-play');
//         }
//     });
// };

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {

        // console.log(e.target);


        enableAllPlays();
        songIndex = parseInt(e.target.id);


        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
});

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 4) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})