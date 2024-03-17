//arrays
let gameSeq = [];
let userSeq = [];

//isGameStarted
let started = false;
let level = 0;

//select
let h2 = document.querySelector("h2");

//color array
let btns = ["red","yellow","green","purple"];

//document vr kuthehi key press zali ki aaplyla mhn aahe game started
document.addEventListener("keypress", function () {

    //below code will take care of game will start only once
    if (started == false) {
        console.log("game started");
        started = true;
    }

    levelUp();

});




//used when the button automatically flashed
function  gameFlash(btn){

    //flash class is added to flash the white color after pressing the button
    btn.classList.add("flash");

    //immidiately romove the flash class after 1 sec
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
    
}




//used when the button pressd by the user
function userFlash(btn){

    //flash class is added to flash the white color after pressing the button
    btn.classList.add("userFlash");

    //immidiately romove the flash class after 1 sec
    setTimeout(function(){
        btn.classList.remove("userFlash");
    },250);
    
}





function levelUp(){

    //at every level user need to add from starting//resetting the userSeq to the blank
    userSeq = [];

    //first increase the level
    level++;

    //update the level in the h2 content
    h2.innerText = `Level ${level}`;

    //before flashing the button we have to select the button randomly
    //create the random index unsing math function
    let randomIdx = Math.floor(Math.random()*3);
    // console.log(randomIdx);

    //select the random color of that index from btns array
    let randomColor = btns[randomIdx];
    // console.log(randomColor);

    //select the button by using the class of that button
    let randomBtn = document.querySelector(`.${randomColor}`);
    // console.log(randomBtn);

    //add the random color to the gameSeq
    gameSeq.push(randomColor);
    console.log(gameSeq);


    //call the btnFlash function to flash the button
    gameFlash(randomBtn);

}




//mathcing the sequence
function checkAns(idx){
    // console.log(`curr level :${level}`);
    
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
           setTimeout(levelUp,1000);
        }
    }else{
        
        h2.innerHTML = `Game over !! <b> Your score is ${level}  </b> <br>You can start again.`
        document.querySelector("body").style.backgroundColor = "red";

        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },150);

        reset();
    }
}






//button press funcitoning
function btnPress(){
    console.log(this);
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    //call the function to check the seqeunce
    checkAns(userSeq.length-1);
}





//select all the buttons having the .btn class
let allBtns = document.querySelectorAll(".btn");
//for each button add the event listener
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}



//reset function to reset all the values
function reset(){
  started=false;
  gameSeq=[];
  userSeq=[];
  level=0;  
}