import deckArray from "./dataStructures/array/deckArray.mjs";
import readlineSync from "readline-sync";
// Ask the user for input
var dataStructure = readlineSync.question(
  "What would you like to store your deck of cards in?\nEnter Selection number:\n1) Array\n"
);
var deck;
switch (parseInt(dataStructure)) {
  case 1:
    deck = new deckArray();
    deck.options();
    break;
  default:
    console.log("Invalid selection");
}
