"use strict";
//  index.ts
// Terminal-based number guessing game using TypeScript (with interface + class)
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 1. Import required modules and types
const prompt_sync_1 = __importDefault(require("prompt-sync")); // promptsync allows synchronous terminal input
const prompt = (0, prompt_sync_1.default)();
// 3. Define Game class 
/// (ENCAPSULATES all game logic)
//// Encapsulation can be done by using ACCESS MODIFIERS like: public, PRIVATE, protected(allows access w/in class & superclass)
///// PRIVATE makes sense since this is the foundation of the game and should not be tinkered with by the public
class NumberGuessingGame {
    // 4. Constructor initializes game state
    /// A constructor is automatically called when a new instance of the class is created using the new Keyword
    //// The primary purpose is to initilize the STATE of the OBJECT by assigning values to its properties
    constructor(playerName, maxAttempts = 3) {
        this.secretNumber = Math.floor(Math.random() * 10) + 1; // math.random = function producing random number greater than zero. 
        this.maxAttempts = maxAttempts; // math.floor = function rounding down to whole number             
        this.attemptsLeft = maxAttempts; // *10 = multiply result of math.random by 10 
        this.player = { name: playerName, score: 0 }; // +1 shifts the range to start at 1 not zero   
    } // .this = current instance of the class            
    // 5. Start game loop
    start() {
        console.log(`Welcome, ${this.player.name}. Let's play a number guessing game.`);
        while (this.attemptsLeft > 0) {
            const input = prompt(`Guess a number between 1 and 10 (${this.attemptsLeft} left): `);
            const guess = parseInt(input);
            if (isNaN(guess) || guess < 1 || guess > 10) {
                console.log("Invalid input. Try a number between 1 and 10.");
                continue;
            }
            if (guess === this.secretNumber) {
                console.log("Correct. You win.");
                this.player.score += 1;
                break;
            }
            else if (guess < this.secretNumber) {
                console.log("Too low.");
            }
            else {
                console.log("Too high.");
            }
            this.attemptsLeft--;
        }
        if (this.attemptsLeft === 0) {
            console.log(`Game over. The number was ${this.secretNumber}.`);
        }
        console.log(`Final Score for ${this.player.name}: ${this.player.score}`);
        console.log("Thanks for playing.");
    }
}
// 6. Prompt for player name and initialize game
const playerName = prompt("Enter your name: ");
const game = new NumberGuessingGame(playerName);
// 7. Start the game
game.start();
