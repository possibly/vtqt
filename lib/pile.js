const deck = require('deck');

class Pile {
  constructor(name, face, arr){
    if (arr){
      this.cards = arr;
    } else {
      this.cards = [];
    }
    this.name = name;
    this.face = face; // down or up.
  }

  shuffle(){
    this.cards = deck.shuffle(this.cards);
    return this.cards;
  }

  pick(num){
    if (num == undefined){
      num = 1;
    }
    this.shuffle();
    return this.cards.splice(0, num);
  }

  push(cards, where){
    if (where == 'next'){
      this.cards = cards.concat(this.cards);
    } else {
      this.cards = this.cards.concat(cards);
    }
    return this.cards;
  }

  get(cardName){
    return this.cards.find( this.compareCards, cardName );
  }

  swap(cardNameA, cardNameB){
    //find index of both cards.
    var iA = this.cards.findIndex( this.compareCards, cardNameA );
    var iB = this.cards.findIndex( this.compareCards, cardNameB );
    //swap the elements at these indexes.
    var temp = this.cards[iB];
    this.cards[iB] = this.cards[iA];
    this.cards[iA] = temp;
    return this.cards;
  }

  compareCards(card){
    return this == card.name;
  }

  // returns an array of deleted elements.
  remove(cardName){
    var i = this.cards.findIndex( this.compareCards, cardName );
    return this.cards.splice(i, 1);
  }

  html(){
    var cards = this.cards;
    // empty
    if (cards.length == 0){
      return `
        <div droppable='true' pileName='${this.name}' class='${this.name}-pile row'>
          <div class='col'>
            <div class='${this.name}-pile-name row'>
              <div class='col'>
                ${this.name}
              </div>
            </div>
            <div class='${this.name}-pile-cards empty-pile row'>
              <div class='col card'>
                There are 0 cards in this pile.
              </div>
            </div>
          </div>
        </div>
      `;
    }
    // face down
    else if (this.face == 'down'){
      return `
        <div droppable='true' pileName='${this.name}' class='${this.name}-pile row'>
          <div class='col'>
            <div class='${this.name}-pile-name row'>
              <div class='col'>
                ${this.name}
              </div>
            </div>
            <div class='${this.name}-pile-cards row'>
              <div draggable='true' cardName='_randomCard_' class='face-down-card card col'>
                There are ${cards.length} face down cards.
              </div>
            </div>
          </div>
        </div>
      `;
    }
    // face up
    return `
      <div droppable='true' pileName='${this.name}' class='${this.name}-pile row'>
        <div class='col'>
          <div class='${this.name}-pile-name row'>
            <div class='col'>
              ${this.name}
            </div>
          </div>
          <div class='${this.name}-pile-cards row'>
            ${_htmlCardsInCols(cards, this.name)}
          </div>
        </div>
      </div>
    `;
  }
}

// Enable Drag and Drop functionality on cards.
// Somehow need to listen for an async DragStart event
// then modify the correct Piles data structure.
// Once the piles data structure has been modified, you can just call html().

function _htmlCardsInCols(cards){
  return cards.map( (card) => `
    <div draggable='true' cardName='${card.name}' class='${card.name}-card card col'>
      ${_htmlCardProperties(card)}
    </div>
  `).join('');
}

function _htmlCardProperties(card){
  return Object.keys(card).map( (key) => `
    <div class='row'>
      <div class='${key} card-property-name col'>
        ${key}
      </div>
      <div class='card-property col'>
        ${card[key]}
      </div>
    </div>
  `).join('');
}

module.exports = Pile;

