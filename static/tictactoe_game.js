// constants for the symbols 'O' & 'X'. An array of all the possible win combos is also created.
const CIRCLE = 'O'
const CROSS = 'X'
const allWinCombos = [
    // horizontal lines
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // vertical lines
    [2, 4, 6],
    [0, 3 ,6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonal lines
    [0, 4 ,8],
    [2, 4, 6]
]

// variables for each parts of the game.
let gameStatus = document.getElementById("gameStatus")
let resetButton = document.getElementById("resetButton")
let spacesArray = Array.from(document.getElementsByClassName("space"))
let currentPlayerMarker = CIRCLE
let spaceTracker = Array(9).fill(null)


// Starts the game by listening for a click on a space. markSpace is then called when a space is clicked.
function startGame() {
    spacesArray.forEach(space => space.addEventListener("click", markSpace))
    resetButton.addEventListener("click", resetBoard)
}


// Marks a space.
function markSpace(s) {
    const spaceID = s.target.id

    // if the respective space in the spaceTracker array is not null, assign the respective symbol to it
    // then check if the current board has a winner, & declare if there is 
    if (!spaceTracker[spaceID]) {
        spaceTracker[spaceID] = currentPlayerMarker
        s.target.innerText = currentPlayerMarker

        spacesIndexIfWon = checkIfPlayerHasWon()

        if (spacesIndexIfWon) {
            boardWinCondition()
            return
        }
        
        changePlayerMarker()
    }
}


// Checks if the current player has won the game. Returns a winning combo if found otherwise null is returned.
function checkIfPlayerHasWon() {
    for (const combo of allWinCombos) {
        let [c1, c2, c3] = combo

        if (spaceTracker[c1] && (spaceTracker[c1] == spaceTracker[c2] && spaceTracker[c1] == spaceTracker[c3])) {
            return [c1, c2, c3]
        } 
    }
    return null
}


// If a winner is declared, no moves can be made, the winner is announced, & the winning combo spaces are highlighted.
function boardWinCondition() {
    gameStatus.innerText = currentPlayerMarker + " has won!"
    spacesArray.forEach(space => space.removeEventListener("click", markSpace))
}


// Changes the marker to for the other player's turn.
function changePlayerMarker() {
    if (currentPlayerMarker == CIRCLE) {
        currentPlayerMarker = CROSS
    } else {
        currentPlayerMarker = CIRCLE
    }
}


// Resets the board by clearing spaceTracker & spacesArray. The currentPlayerMarker is changed back to 'O".
function resetBoard() {
    gameStatus.innerText = "The current board is empty."

    spaceTracker.fill(null)

    spacesArray.forEach(space => space.innerText = '')
    
    currentPlayerMarker = CIRCLE

    spacesArray.forEach(space => space.addEventListener("click", markSpace))
}

startGame()
