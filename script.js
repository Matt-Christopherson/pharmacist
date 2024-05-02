// List of words for the game
const words = [
    "acetaminophen", "adderall", "amitriptyline", "amlodipine", "amoxicillin", "ativan", "atorvastatin",
    "azithromycin", "benzonatate", "brilinta", "bunavail", "buprenorphine", "cephalexin", "ciprofloxacin",
    "citalopram", "clindamycin", "clonazepam", "cyclobenzaprine", "cymbalta", "doxycycline", "dupixent",
    "entresto", "entyvio", "farxiga", "fentanyl patch", "gabapentin", "gilenya", "humira", "hydrochlorothiazide",
    "hydroxychloroquine", "ibuprofen", "imbruvica", "invokana", "januvia", "jardiance", "kevzara", "leqvio",
    "lexapro", "lisinopril", "lofexidine", "loratadine", "lyrica", "melatonin", "meloxicam", "metformin",
    "methadone", "methotrexate", "metoprolol", "mounjaro", "naloxone", "naltrexone", "naproxen", "narcan",
    "nurtec", "omeprazole", "onpattro", "otezla", "ozempic", "pantoprazole", "plan b", "prednisone", "probuphine",
    "rybelsus", "secukinumab", "sublocade", "tramadol", "trazodone", "viagra", "wegovy", "wellbutrin", "xanax",
    "zubsolv"
];


// Initialize variables
let selectedWord = "";
let guessedLetters = [];
let remainingGuesses = 6;

// Function to start a new game
// Function to start a new game
function newGame() {
    // Select a random word from the words array
    selectedWord = words[Math.floor(Math.random() * words.length)];

    // Reset guessed letters and remaining guesses
    guessedLetters = [];
    remainingGuesses = 6;

    // Clear previous game data
    document.getElementById("word-container").innerHTML = "";
    document.getElementById("guesses-left").textContent = `Guesses left: ${remainingGuesses}`;
    document.getElementById("letters").innerHTML = "";
    document.getElementById("letter-bank").textContent = "";
    document.getElementById("message").textContent = "";

    // Initialize wrong guesses with placeholders
    document.getElementById("wrong-guesses").textContent = "       ";

    // Display placeholders for the letters of the word
    for (let i = 0; i < selectedWord.length; i++) {
        const placeholder = document.createElement("span");
        placeholder.textContent = "_ ";
        document.getElementById("word-container").appendChild(placeholder);
    }

    // Display available letters for guessing
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    for (let letter of alphabet) {
        const button = document.createElement("button");
        button.textContent = letter;
        button.classList.add("btn", "btn-primary", "mx-1");
        button.addEventListener("click", () => guess(letter));
        document.getElementById("letters").appendChild(button);
    }
}

// Function to handle guessing a letter
function guess(letter) {
    if (remainingGuesses !== 0) {
        // Check if the letter has already been guessed
        if (guessedLetters.includes(letter)) {
            return;
        }

        // Add letter to guessedLetters array
        guessedLetters.push(letter);

        // Update displayed word
        updateWord();

        // Check if the game is won
        if (!document.getElementById("word-container").textContent.includes("_")) {
            document.getElementById("message").textContent = 'Congratulations! You guessed the right medication! He tips his hat to you and says, "Well thank ya missus! See ya tomorrow! :^)"';
            return;
        }

        // Check if the guessed letter is in the word
        if (!selectedWord.includes(letter)) {
            remainingGuesses--;
            document.getElementById("guesses-left").textContent = `Guesses left: ${remainingGuesses}`;
            // Replace a placeholder with the guessed letter
            const placeholders = document.getElementById("wrong-guesses").textContent.split("");
            for (let i = 0; i < placeholders.length; i++) {
                if (placeholders[i] === " ") {
                    placeholders[i] = letter;
                    break;
                }
            }
            document.getElementById("wrong-guesses").textContent = placeholders.join("");
            if (remainingGuesses === 0) {
                document.getElementById("message").textContent = `You fool. His medication was "${selectedWord}". He chokes on black tar which bubbles from his lips and eyes. He collapses on the floor. You are forced to look down at him as he grips your clean white coat. With a fear in his eyes only known to a man facing his own mortality he looks into yours. In the laborious attempts to push air through the sticky bile, you hear his last words. "You failed me..." EVERYONE HATES YOU NOW`;
            }
            updateImage();
        }
    }
}

// Function to update the image based on the number of remaining guesses
function updateImage() {
    const image = document.getElementById("man-image");
    // Determine the image URL based on the remaining guesses
    if (remainingGuesses === 5) {
        image.src = "assets/dying-man-1.png";
    } else if (remainingGuesses === 4) {
        image.src = "assets/dying-man-2.png";
    } else if (remainingGuesses === 3) {
        image.src = "assets/dying-man-3.png";
    } else if (remainingGuesses === 2) {
        image.src = "assets/dying-man-4.png";
    } else if (remainingGuesses === 1) {
        image.src = "assets/dying-man-5.png";
    } else if (remainingGuesses === 0) {
        image.src = "assets/dying-man-6.png";
    }
}

// Function to update the displayed word with guessed letters
function updateWord() {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";
    for (let char of selectedWord) {
        if (guessedLetters.includes(char)) {
            wordContainer.appendChild(document.createTextNode(char));
        } else {
            wordContainer.appendChild(document.createTextNode("_ "));
        }
    }
}

// Start a new game when the page loads
window.onload = newGame;