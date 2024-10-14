import DeckArray from "./src/dataStructures/array/deckArray.mjs";
import readlineSync from "readline-sync";

// Ask the user for input
let dataStructure = readlineSync.question(
  `What would you like to store your deck of cards in?\nEnter Selection number:\n1) Array\n`
);

let deck;

switch (parseInt(dataStructure)) {
  case 1:
    deck = new DeckArray();
    deck.options();
    break;
  default:
    console.log("Invalid selection");
}
// deck = new Deck();

// deck.deal(10);
