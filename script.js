"use strict";

//Global variable that keeps track of whose turn it is
var currentPlayer = 0;

//Global array that contains all of the squares on the grid
var grid = [1, 2, 3, 4, 5, 6, 7, 8, 9];

//Global variable that checks if a player has won
var hasWon = false;

//Global variables meant to keep track of the number of wins each player has
var p1Wins = 0;
var p2Wins = 0;

//Global array that keeps track of the winning spots
var winningSpots = [];

//Lets the users know whose turn it is on the site
function showTurn() {
    let player = document.getElementById("currentPlayer");
    if(currentPlayer===0) {
        player.style.color = "blue";
        player.textContent = "Player 1";
    }else{
        player.style.color = "red";
        player.textContent = "Player 2";
    }
}

showTurn();

//Marks a square with either an X or and 0
let markSquare = (square) => {
    if(document.getElementById(square).textContent === "" && !hasWon) {
        if(currentPlayer===0) {
            document.getElementById(square).textContent = "X";
        }else{
            document.getElementById(square).textContent = "O";
        }
        return true;
    }
    return false;
}

//Checks for a particular win case
function checkWin(space1, space2, space3, symbol) {
    if(document.getElementById(space1).textContent===symbol && document.getElementById(space2).textContent===symbol && 
    document.getElementById(space3).textContent===symbol) {
        winningSpots.push(space1);
        winningSpots.push(space2);
        winningSpots.push(space3);
        for(let i of winningSpots) {
            let space = document.getElementById("box"+i);
            space.style.backgroundColor="yellow";
            space.style.boxShadow = "0 0 50px 20px inset goldenrod";
        }
        return true;
    }
    return false;
}

//Checks to see if a player won
function checkAllWins(symbol) {
    if(
        checkWin(1, 2, 3, symbol) ||
        checkWin(4,5,6, symbol) ||
        checkWin(7,8,9, symbol) ||
        checkWin(1,4,7, symbol) ||
        checkWin(2,5,8, symbol) ||
        checkWin(3,6,9, symbol) ||
        checkWin(1,5,9, symbol) ||
        checkWin(3,5,7, symbol) 
    ) {
        hasWon = true;
        return true;
    }
    hasWon = false;
}

//Checks to see if the players tied
let checkTie = () => {
    for(let i of grid) if(document.getElementById(i).textContent==="") return false;
    return true;
}

//Makes a popup message appear if the one of the players win or tie
function popupAppear() {
    let popup = document.getElementById("popup");
    let popupHeading = document.getElementById("popupHeading");
    popup.style.opacity = 1;
    popup.style.visibility = "visible";
    document.getElementById("main").style.filter = "brightness(50%)";
    document.getElementById("p1Wins").textContent = `Player 1 Wins: ${p1Wins}`;
    document.getElementById("p2Wins").textContent = `Player 2 Wins: ${p2Wins}`;
}

//Checks to see which player is currently active and then places the corresponding marker in the clicked area
let playerTurn = (square) => {
    let placeBox = markSquare(square);
    if(placeBox) {
        if(currentPlayer === 0) {
            checkAllWins("X");
            currentPlayer++;
        }else{
            checkAllWins("O");
            currentPlayer--;
        }
        showTurn();    
    }
    if(hasWon) {
        let popup = document.getElementById("popup");
        let popupHeading = document.getElementById("popupHeading");
        if(currentPlayer === 1) {
            popup.style.backgroundColor = "blue";
            popup.style.boxShadow = "0 0 100px 40px inset navy";
            popupHeading.textContent = "Player 1 Wins!";
            p1Wins++;
        }else{
            popup.style.backgroundColor = "red";
            popup.style.boxShadow = "0 0 100px 40px inset darkred";
            popupHeading.textContent = "Player 2 Wins!";
            p2Wins++;
        }
        popupAppear();
    }else if(checkTie()){
        popupAppear();
        popup.style.backgroundColor = "lime";
        popup.style.boxShadow = "0 0 100px 40px inset darkgreen";
        popupHeading.textContent = "You tied!";
    }
}

//Resets the board to its state before the game to allow for another match
let resetGame = () => {
    hasWon = false;
    currentPlayer = 0;
    showTurn();
    document.getElementById("main").style.filter = "none";
    document.getElementById("popup").style.opacity = "0";
    document.getElementById("popup").style.visibility = "hidden";
    for(let i of grid) document.getElementById(i).textContent="";
    for(let i of winningSpots) {
        document.getElementById("box"+i).style.backgroundColor = "transparent";
        document.getElementById("box"+i).style.boxShadow = "none";
    }
    winningSpots = [];
}