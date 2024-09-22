import { greeting, newf } from "/greeting.js";

const imagesArray = [
    "avocado.png",
    "banana.png",
    "cherry.png",
    "dragon.png",
    "fig.png",
    "granate.png",
    "grape.png",
    "kiwi.png",
    "avocado.png",
    "banana.png",
    "cherry.png",
    "dragon.png",
    "fig.png",
    "granate.png",
    "grape.png",
    "kiwi.png",
    // "kokos.png",
    // "lemon.png",
    // "orange.png",
    // "pear.png",
    // "pineapple.png",
    // "raspberry.png",
    // "strawberry.png",
    // "watermelon.png",
];

const bodyEL = document.querySelector('body');
const wrapper = document.querySelector('.wrapper');
const modalEnd = document.querySelector('.modal-end');
const endGame = document.querySelector('.play-again')
const modalStart = document.querySelector('.modal-start');
const start = document.querySelector('.start');
const gridItem = document.getElementsByClassName("grid-item");
const greetingEl = document.querySelector('.greeting');


modalStart.style.display = "flex"
start.onclick = function(){
  modalStart.style.display = "none"
  start.style.display = "none";

  newf();
  setTimeout(() => {
    greetingEl.style.display = "none";
    shuffle(imagesArray);
    fillFruits();
    newFillFruits();
  }, 5800);
 
}

const shuffle = (array) => { 
  for (let i = array.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
  } 
  return array; 
}; 
  


function fillFruits(){
  for (let i = 0; i < imagesArray.length; i++) {
    let div = document.createElement('div');
    let img = document.createElement('img');
    img.src = `icons/${imagesArray[i]}`;
    img.classList.add("animate-Open")
    div.setAttribute("class", "grid-item");
    wrapper.setAttribute("style", "pointer-events: none;")  
    div.setAttribute("id", `${i + 1}`);
    wrapper.appendChild(div).appendChild(img);
  }
}

function newFillFruits(){ 
  setTimeout( ()=> {    
  let img = document.querySelectorAll('img');
  for(let i = 0; i < img.length; i++){
    img[i].classList.replace("animate-Open", "animate-Close"); 
  }
    shuffle(imagesArray);
    setTimeout(() => {
      for(let i = 0; i < img.length; i++){
        img[i].src = `icons/${imagesArray[i]}`;
      }
      wrapper.setAttribute("style", "pointer-events: all;")  
    }, 1500);
}, '3100')
}

let firstEl;
let secondEl;
let clickCount = 0;
let firstId;
let secondId = 0;
let div2;


document.addEventListener('click', function(e){
 if(e.target !== bodyEL && e.target !== wrapper && e.target !== modalEnd && e.target !== endGame && e.target !== modalStart && e.target !== start){
  let div = e.target;
  let id = e.target.id;
  firstId = id;
  if(secondId !== firstId){
    let img = e.target.querySelector('img');
    clickCount++;
    img.classList.replace("animate-Close", "animate-Open");
    firstEl = img;
    if(clickCount % 2 === 0){
      if(firstEl.src !== secondEl.src && secondEl !== undefined){
        setTimeout(() =>{
          firstEl.classList.replace("animate-Open", "animate-Close"); 
          div.style.userSelect = "none";
          div.style.cursor = "auto";
        }, 100);
        secondEl.classList.replace("animate-Open", "animate-Close");
        div2.style.userSelect = "none";
        div2.style.cursor = "auto";
      }
    }
    secondEl = img
  }
    secondId = id
    div2=div
     win()
  }
});

function win(){
  let number = 0;
  let img = document.querySelectorAll('img')
  for(let i = 0; i < img.length; i++)
  if(img[i].className !== "animate-Open"){
    number ++
  }
  if(number===0){
    winnerWindow()
  }
}

function winnerWindow(){
  modalEnd.style.display = "flex";
  playAgain()
}

function playAgain(){
  document.querySelector(".play-again").onclick = function(e) {
    if(e.target !== bodyEL & e.target !== wrapper && e.target !== modalStart && e.target !== start){
    modalEnd.style.display = "none";
        Array.from(gridItem).forEach(function(e){
          e.parentNode.removeChild(e);
        });
    shuffle(imagesArray);
    fillFruits();
    newFillFruits();
    }    
  }
}



