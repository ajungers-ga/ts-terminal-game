//  index.ts
// Terminal-based number guessing game using TypeScript (with interface + class)

// 1. Import required modules and types
import promptSync from 'prompt-sync'; // promptsync allows synchronous terminal input
const prompt = promptSync();

// 2. Define Player interface
/// interface declaration is another way to name an OBJECT(Player)
interface Player { 
  name: string; // ""
  score: number; // 65 25 05 
}

// 3. Define Game class 
/// (ENCAPSULATES all game logic)
//// Encapsulation can be done by using ACCESS MODIFIERS like: public, PRIVATE, protected(allows access w/in class & superclass)
///// PRIVATE makes sense since this is the foundation of the game and should not be tinkered with by the public
class NumberGuessingGame {
  private secretNumber: number; // declared as PRIVATE to prevent external code f/ modifying this logic
  private maxAttempts: number;
  private attemptsLeft: number;
  private player: Player;

// 4. Constructor initializes game state
/// A constructor is automatically called when a new instance of the class is created using the new Keyword
//// The primary purpose is to initilize the STATE of the OBJECT by assigning values to its properties


  constructor(playerName: string, maxAttempts: number = 3) { // initilizes random number between using 1-10 using math.random 
    this.secretNumber = Math.floor(Math.random() * 10) + 1; // math.random = function producing random number greater than zero. 
    this.maxAttempts = maxAttempts;                        // math.floor = function rounding down to whole number             
    this.attemptsLeft = maxAttempts;                      // *10 = multiply result of math.random by 10 
    this.player = { name: playerName, score: 0 };        // +1 shifts the range to start at 1 not zero   
  }                                                     // .this = current instance of the class            

  // 5. Start game loop
  public start(): void {
    console.log(`Welcome, ${this.player.name}. Let's play a number guessing game.`);

    while (this.attemptsLeft > 0) {
      const input: string = prompt(`Guess a number between 1 and 10 (${this.attemptsLeft} left): `);
      const guess: number = parseInt(input); // use parseint because prompt returns a string

      if (isNaN(guess) || guess < 1 || guess > 10) { // Nan = not a number, used to check if the user typed something that couldnt be converted to number
        console.log("Invalid input. Try a number between 1 and 10.");
        continue; 
      }

      if (guess === this.secretNumber) {
        console.log("Correct. You win.");
        this.player.score += 1;
        break;
      } else if (guess < this.secretNumber) {
        console.log("Too low.");
      } else {
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

// 6. Define a function to replay the game 
///
function runGame(): void { // wrapping the game and game restart logic into function runGame()
    const playerName: string = prompt("Enter your name: ");
    let playAgain: string;
  
    do { // while playAgain = yes, re inits the game each time from the beginning
      const game = new NumberGuessingGame(playerName);
      game.start();
  
      playAgain = prompt("Would you like to play again? (y/n): ").toLowerCase();
    } while (playAgain === 'y');
  
    console.log("Goodbye.");
  }
  
  // 7. Kick off the game loop
  runGame();
  
 
  