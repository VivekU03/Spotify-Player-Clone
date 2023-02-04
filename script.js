console.log("Welcome To Spotify");
let SongIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let MasterPlay = document.getElementById("MasterPlay");
let progressBar = document.getElementById("progressBar");
let wave = document.getElementById("wave");
let mainSongName = document.getElementById("mainSongName");
let musicItem = Array.from(document.getElementsByClassName("musicItem"));
let songs = [
    {SongName: "Tujhse Pyaar Karta Hoon", FilePath: "songs/1.mp3", CoverPath: "covers/1.webp"},
    {SongName: "Baarishein - Anuv jain", FilePath: "songs/2.mp3", CoverPath: "covers/2.jpg"},
    {SongName: "Bakhuda Tumhi Ho", FilePath: "songs/3.mp3", CoverPath: "covers/3.jpg"},
    {SongName: "Jo Tu Na Mila", FilePath: "songs/4.mp3", CoverPath: "covers/4.jpg"},
    {SongName: "Lost[NCS]", FilePath: "songs/5.mp3", CoverPath: "covers/5.jpg"},
    {SongName: "Labon Ko", FilePath: "songs/6.mp3", CoverPath: "covers/6.jpg"},
    {SongName: "For You", FilePath: "songs/7.mp3", CoverPath: "covers/7.jpg"},
    {SongName: "Uska Hi Banana", FilePath: "songs/8.mp3", CoverPath: "covers/8.jpg"},
    {SongName: "Piya Aaye Na", FilePath: "songs/9.mp3", CoverPath: "covers/9.jpg"},
]

musicItem.forEach((element, i)=>{
    // console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].CoverPath;
    element.getElementsByClassName("musicName")[0].innerText = songs[i].SongName;
})


MasterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        MasterPlay.classList.remove("fa-circle-play");
        MasterPlay.classList.add("fa-circle-pause");
        wave.style.opacity = 1;
    }
    else{
        audioElement.pause();
        MasterPlay.classList.remove("fa-circle-pause");
        MasterPlay.classList.add("fa-circle-play");
        wave.style.opacity = 0;
    }
})

audioElement.addEventListener("timeupdate", ()=>{

    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    progressBar.value = progress 
})

progressBar.addEventListener("change", ()=>{
    audioElement.currentTime = progressBar.value *  audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName("musicItemPlay")).forEach((element)=>{
    element.classList.remove("fa-circle-pause");
    element.classList.add("fa-circle-play");
    })
}

Array.from(document.getElementsByClassName("musicItemPlay")).forEach((element)=>{
    element.addEventListener('click',(b)=>{
        console.log(b.target);
        makeAllPlays();
        SongIndex = parseInt(b.target.id);
        b.target.classList.remove("fa-circle-play");
        b.target.classList.add("fa-circle-pause");
        audioElement.src = `songs/${SongIndex+1}.mp3`;
        mainSongName.innerText = songs[SongIndex].SongName;
        audioElement.currentTime = 0;
        audioElement.play();
        wave.style.opacity = 1;
        MasterPlay.classList.remove("fa-circle-play");
        MasterPlay.classList.add("fa-circle-pause");
    })
})

document.getElementById("Next").addEventListener("click",()=>{
    if(SongIndex>=8){
        SongIndex = 0
    }
    else{
        SongIndex += 1;
    }
    audioElement.src = `songs/${SongIndex+1}.mp3`;
    mainSongName.innerText = songs[SongIndex].SongName;
    audioElement.currentTime = 0;
    audioElement.play();
    MasterPlay.classList.remove("fa-circle-play");
    MasterPlay.classList.add("fa-circle-pause")

})

document.getElementById("Previous").addEventListener("click",()=>{
    if(SongIndex<=0){
        SongIndex = 0
    }
    else{
        SongIndex -= 1;
    }
    audioElement.src = `songs/${SongIndex+1}.mp3`;
    mainSongName.innerText = songs[SongIndex].SongName;
    audioElement.currentTime = 0;
    audioElement.play();
    MasterPlay.classList.remove("fa-circle-play");
    MasterPlay.classList.add("fa-circle-pause")

})
