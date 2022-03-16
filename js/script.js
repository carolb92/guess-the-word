// guessed letters unordered list
const guessedLettersList = document.querySelector(".guessed-letters");

// guess button
const guessButton = document.querySelector(".guess");

// text input
const textInput = document.querySelector(".letter");

// word in progress
const wordInProgress = document.querySelector(".word-in-progress");

// remaining guesses
const remainingGuesses = document.querySelector(".remaining");

// span inside the paragraph where remaining guesses will display
const remainingSpan = document.querySelector("span");

// messages after player guesses
const messages = document.querySelector(".message");

// play again button
const playAgain = document.querySelector(".play-again");

const word = "magnolia";

const guessedLetters = [];

const placeholder = function (word) {
    const placeholderLetters = [];
    for (let letter of word) {
        placeholderLetters.push("●");
        console.log(letter);
    }
    wordInProgress.innerText = placeholderLetters.join("");
};
placeholder(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const inputValue = textInput.value;
    console.log(inputValue);
    textInput.value = ""; 
    messages.innerText = "";
    const valid = validateInput(inputValue);
    console.log(valid);
    if (valid) {
        makeGuess(inputValue);
    }
});

const validateInput = function (input) {
    const acceptedLetter = /[a-zA-z]/;
    if (input === "") {
        messages.innerText = "Please enter a letter.";
    } else if (input.length >1) {
        messages.innerText = "Please enter one letter at a time.";
    } else if (!input.match(acceptedLetter)) {
        messages.innerText = "Please enter a letter from A to Z.";
    } else {
        return input;
    }
};

const makeGuess = function (letter) {
    letter = letter.toUpperCase();
    if (guessedLetters.includes(letter)) {
        messages.innerText = "You've already guessed that letter. Try again!";
    } else {
        guessedLetters.push(letter);
        listOfLetters();
        updateWIP(guessedLetters);
    }
    console.log(guessedLetters);
};

const listOfLetters = function () {
    guessedLettersList.innerHTML = "";
    for (let letter of guessedLetters) {
        let li = document.createElement("li");
        li.innerText = letter;
        guessedLettersList.append(li);
    }
};

const updateWIP = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (let letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    wordInProgress.innerText = revealWord.join("");
    win();
};

const win = function () {
    if (wordInProgress.innerText === word.toUpperCase()) {
        messages.classList.add("win");
        messages.innerHTML = '<p class="highlight">You guessed correct the word! Congrats!</p>';
    }
};