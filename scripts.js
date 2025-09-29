const userOptions = document.querySelectorAll(".option");
const startButton = document.querySelector("button");
const userDisplay = document.querySelector("#userSelection");
const computerDisplay = document.querySelector("#computerSelection");
const winnerSection = document.getElementById("winner");
const winsDisplay = document.getElementById("wins");
const lossesDisplay = document.getElementById("losses");
const score = document.getElementById("score");
const options = ["rock", "paper", "scissors"];
var index = 0;
var computersChoiceIndex = 0;
var computerVisualTimer;
var computerTimer;
var selected;
var intervalTime = 3;
var running = false;
var winner;
var wins = 0;
var losses = 0;

// Event listeners applied to each of the user options (rock paper and scissors)
userOptions.forEach(item => {
    item.addEventListener("click", ()=> {
        if(!running){
            console.log(`Option ${item.id} selected`);
            userOptions.forEach(opt => opt.style.backgroundColor = "");
            resetBoard();
            item.style.backgroundColor = "darkgreen";
            updateUserSelection(item.id);
            selected = item;
        }  
    });
});


// Event listener for the Shoot button
startButton.addEventListener("click", () =>{
    if(selected == null){
        console.log("ERROR: Game started without user selection.");
        userDisplay.style.backgroundColor = "red";
    }
    else if(!running){
        running = true;
        resetBoard();
        intervalTime = 3;
        computerVisualTimer = setInterval(randomizeComputerSelectionVisual, 100);
        computerTimer = setTimeout(() =>{running = false;}, 3000);
    }
});


// Updates the visuals for the user selection
function updateUserSelection(selection){
    const current = document.querySelector("#userSelection");
    current.src=`/images/${selection}.png`;
}

// Randomizes the computer selection
function randomizeComputerSelectionVisual(){
    if(running){
        computerDisplay.src = `images/${options[index]}.png`;
        index++;
        index= index % options.length;
        console.log(`Index Value: ${index}`);
    }
    else{
        clearInterval(computerVisualTimer);
        computersChoiceIndex = Math.floor(Math.random() * 3);
        computerDisplay.src = `images/${options[computersChoiceIndex]}.png`;
        getWinner();
        winnerSection.textContent = winner;
        switch(winner){
            case "Player":
                wins++;
                winsDisplay.textContent = wins;
                score.textContent = wins;
                userDisplay.style.backgroundColor = "green";
                computerDisplay.style.backgroundColor = "red";
                break;
            case "Computer":
                losses++;
                lossesDisplay.textContent = losses;
                userDisplay.style.backgroundColor = "red";
                computerDisplay.style.backgroundColor = "green";
                break;
            case "Tie":
                userDisplay.style.backgroundColor = "blue";
                computerDisplay.style.backgroundColor = "blue";
                break;
        }
    }
}

// Sets the winner value to the winner of the current round
function getWinner(){
    switch(selected.id){
        case "rock":
            switch(options[computersChoiceIndex]){
                case "rock":
                    winner = "Tie";
                    console.log(winner);
                    break;
                case "paper":
                    winner = "Computer";
                    console.log(winner);
                    break;
                case "scissors":
                    winner = "Player";
                    console.log(winner);
                    break;
            }
            break;
        case "paper":
            switch(options[computersChoiceIndex]){
                case "rock":
                    winner = "Player";
                    console.log(winner);
                    break;
                case "paper":
                    winner = "Tie";
                    console.log(winner);
                    break;
                case "scissors":
                    winner = "Computer";
                    console.log(winner);
                    break;
            }
            break;
        case "scissors": 
        switch(options[computersChoiceIndex]){
                case "rock":
                    winner = "Computer";
                    console.log(winner);
                    break;
                case "paper":
                    winner = "Player";
                    console.log(winner);
                    break;
                case "scissors":
                    winner = "Tie";
                    console.log(winner);
                    break;
            }
            break;
    }
}


// Resets the board
function resetBoard(){
    winner = "";
    winnerSection.textContent = "";
    computerDisplay.style.backgroundColor = "";
    userDisplay.style.backgroundColor = "";
}
