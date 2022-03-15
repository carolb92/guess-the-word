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

// array to contain guessed letters
const guessedLetters = [];

const placeholder = function (word) {
    let placeholderLetters = [];
    for (let letter of word) {
        placeholderLetters.push("●");
        console.log(letter);
    }
    wordInProgress.innerText = placeholderLetters.join("");
};
placeholder(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const letter = textInput.value;
    console.log(letter);
    textInput.value = "";
    messages.innerText = "";
    const validInput = validate(letter);
    console.log(validInput);
    if (validInput) {
        makeGuess(letter);
    }
});

const validate = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input === "") {
        messages.innerText = "Please enter a letter.";
    } else if (input.length >1) {
        messages.innerText = "Enter one letter at a time."
    } else if (!input.match(acceptedLetter)) {
        messages.innerText = "Please enter a letter from A to Z.";
    } else {
        return input;
    }
};

const makeGuess = function(letter) {
    letter = letter.toUpperCase();
    if (guessedLetters.includes(letter)) {
        messages.innerText = "You've already guessed that letter. Try again!";
    } else {
        guessedLetters.push(letter);
        console.log(guessedLetters);
    }
};