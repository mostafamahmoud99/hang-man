const letters = "abcdefghijklmnopqrstuvwxyz";

let lettersArray = letters.split("");
// let lettersArray = Array.from(letters);

let lettersContainer = document.querySelector(".letters");

lettersArray.forEach((letter) => {
  let span = document.createElement("span");
  span.className = "letter-box";
  let theLetter = document.createTextNode(letter);
  span.appendChild(theLetter);
  lettersContainer.appendChild(span);
});

const words = {
  series: ["breaking bad", "hannibal", "dark", "prison break", "you"],
  countries: ["egypt", "qatar", "lebanon", "german", "france"],
  color: ["red", "green", "blue", "purple", "black"],
  movies: ["me before you", "insteller", "titanic", "inception"],
};

/* let allKeys = Object.keys(words) */

let gWord = [];
for (const word in words) {
  gWord.push(word);
}

let randomPropNumber = Math.floor(Math.random() * gWord.length);
let randomPropName = gWord[randomPropNumber];
let randomPropValue = words[randomPropName];
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let randomValueValue = randomPropValue[randomValueNumber];

document.querySelector(".game-info .category span").innerHTML = randomPropName;

let lettersGuess = document.querySelector(".letters-guess");

// convert the letter to array
let letterAndSpace = randomValueValue.split("");

// add letter in letter guess to guess the word
letterAndSpace.forEach((letter) => {
  let emptyspan = document.createElement("span");

  if (letter === " ") {
    emptyspan.className = "with-space";
  }
  lettersGuess.appendChild(emptyspan);
});

// handle click on letter

let lettersGuessSpan = document.querySelectorAll(".letters-guess span");

let theWrongAttemps = 0;
let theSuccessAttemps = 0;




let theManHang = document.querySelector(".hangman-draw");

document.addEventListener("click", function (e) {
  let theStatus = false;

  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");
    let theClickedLetter = e.target.innerHTML.toLowerCase();

    letterAndSpace.forEach(function (letter, index) {
      if (theClickedLetter === letter) {
        theStatus = true;

        lettersGuessSpan.forEach(function (span, spanIndex) {
          if (index === spanIndex) {
            span.innerHTML = letter;
          }
        });
      }
    });
    if (theStatus !== true) {
      theWrongAttemps++;
      theManHang.classList.add(`wrong-${theWrongAttemps}`);

      
      document.getElementById("wrong").play();
      if (theWrongAttemps === 8) {
        endGame();
        lettersContainer.classList.add("finished");
      }
    } else {
      document.getElementById("success").play();
      theSuccessAttemps++;
    }
  }
 
  if (letterAndSpace.length === theSuccessAttemps) {
      successGame();
  };


});



function endGame() {
  let div = document.createElement("div");
  let divText = document.createTextNode(
    `Game Over, The Word Is ${randomValueValue}`
  );
  div.appendChild(divText);
  div.className = "popup";
  document.body.appendChild(div);
}

function successGame() {
  let div = document.createElement("div");
  div.className = 'popup-success';
  let divText = document.createTextNode("Congratulations!");
  div.appendChild(divText);
  document.body.appendChild(div);
  lettersContainer.classList.add("finished");

}
