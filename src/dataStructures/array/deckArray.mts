import * as readlineSync from "readline-sync";
import delay from "../../utils/helpers.mjs";

interface Card {
  suit: string;
  rank: string;
}

// create card class
class Card {
  constructor(suit: string, rank: string) {
    this.suit = suit;
    this.rank = rank;
  }

  displayCard() {
    console.log(`suit: ${this.suit} rank: ${this.rank}`);
  }
}

class DeckArray {
  cards: Card[]
  constructor() {
    // cards will be the returned array from create deck
    this.cards = this.createDeck();
  }

  createDeck() {
    const suits = ["spade", "club", "diamond", "heart"];
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
    const deck: Card[] = [];
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

  displayDeck(): void {
    console.log("\nDisplaying all cards in the deck...\n");
    for (const card of this.cards) {
      let { suit, rank } = card;
      console.log(`${rank} of ${suit}s`);
    }
    console.log(`${this.cards.length} cards in total`);
  }

  shuffle(): void {
    console.log("\nShuffling all cards in the deck...\n");
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  deal(numCards = 1): void {
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

  dealAll(numCards = 1): void {
    if (this.cards.length === 0) {
      console.log("\nNo cards left to deal.");
      return;
    }

    if (numCards > this.cards.length) {
      numCards = this.cards.length;
    }

    const deltCards = this.cards.splice(0, numCards);
    console.log(`Dealing ${numCards} cards:`);
    deltCards.forEach((card) => {
      console.log(`${card.rank} of ${card.suit}s`);
    });

    console.log(`\n${this.cards.length} cards left in the deck`);

    if (this.cards.length > 0) {
      this.dealAll(numCards); // Continue recursively
    }
  }



  async dealWithDelay(numCards = 1): Promise<void> {
    console.log(`\nDealing ${numCards} cards with delay...\n`);

    for (let i = 0; i < numCards && this.cards.length > 0; i++) {

      const card = this.cards.shift();
      if (card) {
        console.log(`${card.rank} of ${card.suit}s`);

        await delay(1000); // 1-second delay between each card
      }

    }
  }

  async options(): Promise<void> {
    let play = true;
    while (play) {
      const action = readlineSync.question(
        `\n What would you like to do?\n1)Display Deck\n2)Shuffle Deck\n3)Deal once\n4)Deal all\n5)Deal with Delay\n6)Exit\n`
      );
      // let numCards: any;

      switch (parseInt(action)) {
        case 1:
          this.displayDeck();
          break;
        case 2:
          this.shuffle();
          console.log("Deck shuffled.");
          break;
        case 3:
          let singleDealAmount = readlineSync.questionInt("How many cards to deal?");
          this.deal(singleDealAmount);
          break;
        case 4:
          let repeatedDealAmount = readlineSync.questionInt(
            "How many cards should be dealt at a time until the deck is empty?"
          );
          this.dealAll(repeatedDealAmount);
          break;
        case 5:
          let delayedDealAmount = readlineSync.questionInt("How many cards should be dealt?");
          await this.dealWithDelay(delayedDealAmount);
          break;
        case 6:
          play = false;
          return;
        default:
          console.log("Invalid selection. Please try again.");
      }
    }
  }
}

export default DeckArray;
