// guessed letters unordered list
const guessedLetters = document.querySelector(".guessed-letters");

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
});