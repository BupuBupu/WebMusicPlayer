console.log("Welcome to RJ Tune");
//Variables
let songIndex =0;
let masterPLayer = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let mygif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'))
let audioElement = new Audio('songs/1.mp3');
let songName1 = document.querySelector('#songInfo1');

console.log(songName1.innerText);
let songs = [
    {songName:"Warriyo Mortals",coverPath:"covers/1.jpg",filePath:"songs/1.mp3"},
    {songName:"Cielo",coverPath:"covers/2.jpg",filePath:"songs/2.mp3"},
    {songName:"Invincible",coverPath:"covers/3.jpg",filePath:"songs/3.mp3"},
    {songName:"My Heart",coverPath:"covers/4.jpg",filePath:"songs/4.mp3"},
    {songName:"Heros Tonight",coverPath:"covers/5.jpg",filePath:"songs/5.mp3"},
    {songName:"Cradles",coverPath:"covers/6.jpg",filePath:"songs/6.mp3"},
    {songName:"On & On (feat. Daniel Levi)",coverPath:"covers/7.jpg",filePath:"songs/7.mp3"},
    {songName:"Superhero (feat. Chris Linton)",coverPath:"covers/8.jpg",filePath:"songs/8.mp3"},
    {songName:"Where We Started (feat. Jex)",coverPath:"covers/9.jpg",filePath:"songs/9.mp3"},
    {songName:"Control (feat. Jex)",coverPath:"covers/10.jpg",filePath:"songs/10.mp3"}
]

for (let i = 0; i < songItems.length; i++) {
    element = songItems[i];
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
    
}
//Play pause
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })}
function pause_1(){
    let k = Array.from(document.getElementsByClassName('songItemPlay'));
    for (let i = 0; i < songs.length; i++) {
        const element = k[i];
        if (songIndex==i) {
            element.classList.remove('fa-play-circle');
            element.classList.add('fa-pause-circle');
        }
    }
}


masterPLayer.addEventListener('click',()=>{
    if (audioElement.paused || audioElement.currentTime<=0) {
        audioElement.play();
        masterPLayer.classList.remove('fa-play-circle');
        masterPLayer.classList.add('fa-pause-circle');
        mygif.style.opacity = 1;
        pause_1();
        songName1.innerText = songs[songIndex].songName;
    }
    else{
        audioElement.pause();
        makeAllPlays();
        masterPLayer.classList.remove('fa-pause-circle');
        masterPLayer.classList.add('fa-play-circle');
        mygif.style.opacity = 0;
    }
})
//Listen to events

audioElement.addEventListener('timeupdate',()=>{
    console.log('timeupdate');
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('input',()=>{
    progress = myProgressBar.value;
    audioElement.currentTime = (progress/100)*(audioElement.duration);
})



Array.from(document.getElementsByClassName('songItemPlay')).forEach((element,i)=>{
    element.addEventListener('click',(e)=>{
        if (mygif.style.opacity==0) {
            mygif.style.opacity=1;
        
        makeAllPlays();
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = songs[i].filePath;
        audioElement.currentTime = 0;
        songIndex = i;
        audioElement.play();
        masterPLayer.classList.add('fa-pause-circle');
        songName1.innerText = songs[songIndex].songName;
        }
        
        else{
            mygif.style.opacity = 0;
            masterPLayer.click();
        }
    })
})
function currentplaying(){
    let sngs = Array.from(document.getElementsByClassName('songItemPlay'));
    
    for (let i = 0; i < sngs.length; i++) {
        const element = sngs[i];
        if (songIndex!=i) {
            element.classList.remove('fa-pause-circle');
            element.classList.add('fa-play-circle');
        }
        else{
            element.classList.remove('fa-play-circle');
            element.classList.add('fa-pause-circle');
        }
    }
}
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex==0){
        songIndex = songs.length-1;
        
    }
    else{
        songIndex = songIndex-1;
    }
    audioElement.pause();
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    songName1.innerText= songs[songIndex].songName;
    audioElement.play();
    masterPLayer.classList.remove('fa-play-circle');
    masterPLayer.classList.add('fa-pause-circle');
    currentplaying();
    if (mygif.style.opacity==0) {
        mygif.style.opacity=1;
    }
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex==songs.length -1){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    
    audioElement.pause();
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    songName1.innerText= songs[songIndex].songName;
    audioElement.play();
    masterPLayer.classList.remove('fa-play-circle');
    masterPLayer.classList.add('fa-pause-circle');
    currentplaying();    
    if (mygif.style.opacity==0) {
        mygif.style.opacity=1;
    }
})

