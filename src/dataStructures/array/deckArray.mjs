import readlineSync from "readline-sync";

// create card class
class Card {
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
  }

  displayCard() {
    console.log(`suit: ${this.suit} rank: ${this.rank}`);
  }
}

class DeckArray {
  constructor() {
    // cards will be the returned array from create deck
    this.cards = this.createDeck();
  }

  createDeck() {
    const suits = ["spade", "club", "dimond", "heart"];
    const ranks = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "jack",
      "queen",
      "king",
      "ace",
    ];

    // Create Deck
    const deck = [];
    // for each suit in suits array
    for (const suit of suits) {
      // go through each rank
      for (const rank of ranks) {
        // create new instence of a card with current suit and rank
        deck.push(new Card(suit, rank));
      }
    }
    console.log(`\nDeck of cards array created`);
    return deck;
  }

  displayDeck() {
    console.log("\nDisplaying all cards in the deck...\n");
    for (const card of this.cards) {
      let { suit, rank } = card;
      console.log(`${rank} of ${suit}s`);
    }
    console.log(`${this.cards.length} cards in total`);
  }

  shuffle() {
    console.log("\nShuffling all cards in the deck...\n");
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  deal(numCards = 1) {
    console.log(`\nDealing ${numCards} cards from the deck...\n`);
    // if card amount is less than numCards deal the rest of the deck
    if (numCards > this.cards.length) {
      numCards = this.cards.length;
    }
    // determine what cards will be delt
    // strip deck of number of cards starting with 0
    let deltCards = this.cards.splice(0, numCards);
    console.log(`Dealing ${numCards} cards:`);
    deltCards.forEach((card) => {
      let { suit, rank } = card;
      console.log(`${rank} of ${suit}s`);
    });
    console.log(`\n${this.cards.length} cards left in the deck`);
  }

  options() {
    let play = true;
    while (play) {
      const action = readlineSync.question(
        `\n What would you like to do?\n1)Display Deck\n2)Shuffle Deck\n3)Deal\n4)Exit\n`
      );

      switch (parseInt(action)) {
        case 1:
          this.displayDeck();
          break;
        case 2:
          this.shuffle();
          console.log("Deck shuffled.");
          break;
        case 3:
          const numCards = readlineSync.questionInt("How many cards to deal?");
          this.deal(numCards);
          break;
        case 4:
          play = false;
          return;
        default:
          console.log("Invalid selection. Please try again.");
      }
    }
  }
}

export default DeckArray;
