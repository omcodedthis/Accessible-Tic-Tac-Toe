// constants for the symbols 'O', 'X', & HEADERTEXT. An array of all the possible win combos is also created. 
const CIRCLE = 'O'
const CROSS = 'X'
const ALLWINCOMBOS = [
    // horizontal lines
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // vertical lines
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonal lines
    [0, 4 ,8],
    [2, 4, 6]
]
const HEADERTEXT = "The current state of the board from left to right for each row below" 

// variables for each parts of the game.
let gameStatus = document.getElementById("gameStatus")
let resetButton = document.getElementById("resetButton")
let spacesArray = Array.from(document.getElementsByClassName("space"))
let currentPlayerMarker = CIRCLE
let spaceTracker = Array(9).fill(null)
let spacesIndexIfWon = null;


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
        let win = false

        // adds the symbol to the tracker array & to the space
        spaceTracker[spaceID] = currentPlayerMarker
        s.target.innerText = currentPlayerMarker

        // checks for win condition
        spacesIndexIfWon = checkIfPlayerHasWon()
        if (spacesIndexIfWon) {
            win = true
            boardWinCondition(win)
            return
        }
        
        // updates the board info
        gameStatus.innerText = generateCurrentBoardInfo(false)
        
        changePlayerMarker()
    }
}


// Checks if the current player has won the game. Returns a winning combo if found otherwise null is returned.
function checkIfPlayerHasWon() {
    for (const combo of ALLWINCOMBOS) {
        let [c1, c2, c3] = combo

        if (spaceTracker[c1] && (spaceTracker[c1] == spaceTracker[c2] && spaceTracker[c1] == spaceTracker[c3])) {
            return [c1, c2, c3]
        } 
    }
    return null
}


// If a winner is declared, no moves can be made, the winner is announced, & the winning combo spaces are highlighted.
function boardWinCondition(hasWon) {
    gameStatus.innerText = currentPlayerMarker + " has won!"

    // autofills the board info to the form
    let boardInfo  = generateCurrentBoardInfo(hasWon)
    document.getElementsByName("past_moves")[0].value = boardInfo
    document.getElementsByName("date")[0].value = (new Date()).toLocaleDateString('en-GB')

    // removes the listener for clicks
    spacesArray.forEach(space => space.removeEventListener("click", markSpace))
    spacesIndexIfWon.forEach(id => spacesArray[id].style.backgroundColor="#aeb2b6")

    // removes turn indication in the header
    document.getElementById("statusHeader").innerText = HEADERTEXT + ":"
}


// Loops over all indexes in spaceTracker & generates a summary of the current state of the board. 
function generateCurrentBoardInfo(hasWon) {
    let info = ""
    for (let i = 0; i < spaceTracker.length; i++) {
        let text = spaceTracker[i]

        if (!text) {
            text = "empty"
        }

        info += ' ' + text + ','
    }

    // checks if the current state is a draw (no empty spaces & no win)
    if ((!(info.includes("empty"))) && (!(hasWon))) {
        return "The game has ended in a draw."
    } else {
        return info.slice(0, -1)
    }
}



// Changes the marker to for the other player's turn & updates this change in statusHeader's text.
function changePlayerMarker() {
    let statusHeader = document.getElementById("statusHeader")
 
    if (currentPlayerMarker == CIRCLE) {
        currentPlayerMarker = CROSS
        statusHeader.innerText = HEADERTEXT + " (" + CROSS + "'s Turn):"
        
    } else {
        currentPlayerMarker = CIRCLE
        statusHeader.innerText = HEADERTEXT + " (" + CIRCLE + "'s Turn):"
    }
}


// Resets the board by clearing spaceTracker & spacesArray. The currentPlayerMarker is changed back to 'O".
function resetBoard() {
    gameStatus.innerText = "The current board is empty."

    // resets the various arrays to null & '' accordingly
    spaceTracker.fill(null)
    spacesArray.forEach(space => space.innerText = '')
    
    // removes the highlighted spaces' background color
    spacesIndexIfWon.forEach(id => spacesArray[id].style.backgroundColor="")
    
    // changes the player marker back to CIRCLE & indicates this in the header
    currentPlayerMarker = CIRCLE
    document.getElementById("statusHeader").innerText = HEADERTEXT + " (" + CIRCLE + "'s Turn):"

    // adds the listener back
    spacesArray.forEach(space => space.addEventListener("click", markSpace))
}

startGame()
