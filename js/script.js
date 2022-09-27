// guessed letters unordered list
const guessedLettersList = document.querySelector(".guessed-letters");

// guess button
const guessButton = document.querySelector(".guess");

// text input
const textInput = document.querySelector(".letter");

// word in progress
const wordInProgress = document.querySelector(".word-in-progress");

// remaining guesses
const remainingGuessesText = document.querySelector(".remaining");

// span inside the paragraph where remaining guesses will display
const remainingSpan = document.querySelector("span");

// messages after player guesses
const messages = document.querySelector(".message");

// play again button
const playAgain = document.querySelector(".play-again");

let word = "magnolia";

let guessedLetters = [];

let remainingGuesses = 8;

const getWord = async function () {
    const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const fetchedWords = await res.text();
    // console.log(fetchedWords);
    const wordArray = fetchedWords.split("\n");
    // console.log(wordArray);
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};

getWord();


const placeholder = function (word) {
    const placeholderLetters = [];
    for (let letter of word) {
        placeholderLetters.push("●");
        console.log(letter);
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

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
        numGuessesRemaining(letter);
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

const numGuessesRemaining = function (guess) {
    const upperWord = word.toUpperCase();
    if (upperWord.includes(guess)) {
        messages.innerText = "Yes! Good guess!"
    } else {
        messages.innerText = `Sorry, no ${guess}. Try again.`
        remainingGuesses -= 1;
    }
    if (remainingGuesses === 0) {
        messages.innerText = `Game over! The word is ${word}.`
        startOver();
    } else if (remainingGuesses === 1) {
        remainingSpan.innerText = "1 guess"
    } else {
        remainingSpan.innerText = `${remainingGuesses} guesses`
    }
};

const win = function () {
    if (wordInProgress.innerText === word.toUpperCase()) {
        messages.classList.add("win");
        messages.innerHTML = '<p class="highlight">You guessed the word! 🎉</p>';
        startOver();
    }
};

const startOver = function () {
    guessButton.classList.add("hide");
    remainingGuessesText.classList.add("hide");
    guessedLettersList.classList.add("hide");
    playAgain.classList.remove("hide");
};

playAgain.addEventListener("click", function () {
    messages.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8;
    remainingSpan.innerText = `${remainingGuesses} guesses`;
    messages.innerText = "";
    guessedLettersList.innerHTML = "";
    guessButton.classList.remove("hide");
    guessedLettersList.classList.remove("hide");
    remainingGuessesText.classList.remove("hide");
    playAgain.classList.add("hide");
    getWord();
});