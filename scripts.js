const userOptions = document.querySelectorAll(".option");
const startButton = document.querySelector("button");
const selectionDisplay = document.querySelector("#userSelection");
const computerDisplay = document.querySelector("#computerSelection");
const options = ["rock", "paper", "scissors"];
var index = 0;
var computersChoiceIndex = 0;
var computerVisualTimer;
var computerTimer;
var selected;
var intervalTime = 3;
var running = false;
var winner;


userOptions.forEach(item => {
    item.addEventListener("click", ()=> {
        console.log(`Option ${item.id} selected`);
        userOptions.forEach(opt => opt.style.backgroundColor = "");
        selectionDisplay.style.backgroundColor = "";
        item.style.backgroundColor = "darkgreen";
        updateUserSelection(item.id);
        selected = item;
    });
});


startButton.addEventListener("click", () =>{
    if(selected == null){
        console.log("ERROR: Game started without user selection.");
        selectionDisplay.style.backgroundColor = "red";
    }
    else if(!running){
        running = true;
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
    }

}

function getWinner(){
    if(selected.id == "rock" && options[computersChoiceIndex] == "rock"){
        winner = "none";
    }
    else if(selected.id == "rock" && options[computersChoiceIndex] == "paper"){
        winner = "computer";
    }
}
