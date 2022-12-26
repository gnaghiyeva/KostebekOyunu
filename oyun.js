const startButonu = document.getElementById("start");
const scoreText = document.getElementById("score");
const kostebekler = document.querySelectorAll(".kostebek");
const timeText = document.querySelector("time");

let evvelkiKostebek;
let vaxtBitdi=false;
let score=0;
let time=15;

startButonu.addEventListener("click", startGame);

kostebekler.forEach((kostebek)=>
    kostebek.addEventListener("click", peep));



function randomKostebek(){
    const sira = Math.floor(Math.random() * kostebekler.length);
    const secilen = kostebekler[sira];

    if(evvelkiKostebek===secilen){
        return randomKostebek();
    }
    else{
        evvelkiKostebek=secilen;
    }
    return secilen;
}



function randomZaman(min,max){
    const zaman = Math.round(Math.random()*(max-min))+min;
    return zaman;
}



function yuxari(){
    const kostebek = randomKostebek();
    const zaman = randomZaman(1000,1500);
    kostebek.classList.add("secilen");
    setTimeout(()=> {
        kostebek.classList.remove("secilen");
        if(!vaxtBitdi)
            yuxari();
        
    }, zaman);
}

function startTime(){
    if(!time){
        time--;
        timeText.textContent=time;
    }
    else{
        timeText.textContent="vaxt bitdi";
    }
} 


function startGame(){
    time=15;
    score=0;
    vaxtBitdi=false;
    const interval=setInterval(()=>{
        startTime();
        if(vaxtBitdi) clearInterval(interval);
    },1000);
    yuxari();
    setTimeout(()=> {
        vaxtBitdi = true;
    },time*1000);
}

function peep(e){//event
    if(e.target.classList.contains("secilen")){
        score++;
        e.target.classList.remove("secilen")
    }
    scoreText.textContent=score;
}




