const deck = require('deck');

class Pile {
  constructor(name, face, arr){
    if (arr){
      this.cards = arr;
    } else {
      this.cards = [];
    }
    this.name = name;
    this.face = face;
  }

  shuffle(){
    this.cards = deck.shuffle(this.cards);
    return this.cards;
  }

  pick(num){
    this.cards = this.cards.slice(num, this.cards.length);
    var removed = this.cards.slice(0,num);
    return removed;
  }

  push(cards, where){
    if (where == 'next'){
      this.cards = cards.concat(this.cards);
    } else {
      this.cards = this.cards.concat(cards);
    }
    return this.cards;
  }

  html(){
    var cards = this.cards;
    // empty
    if (cards.length == 0){
      return `
        <div class='${this.name}-pile row'>
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
        <div class='${this.name}-pile row'>
          <div class='col'>
            <div class='${this.name}-pile-name row'>
              <div class='col'>
                ${this.name}
              </div>
            </div>
            <div class='${this.name}-pile-cards face-down row'>
              <div class='card col'>
                There are ${cards.length} face down cards.
              </div>
            </div>
          </div>
        </div>
      `;
    }
    // face up
    return `
      <div class='${this.name}-pile row'>
        <div class='col'>
          <div class='${this.name}-pile-name row'>
            <div class='col'>
              ${this.name}
            </div>
          </div>
          <div class='${this.name}-pile-cards row'>
            ${_htmlCardsInCols(cards)}
          </div>
        </div>
      </div>
    `;
  }
}

function _htmlCardsInCols(cards){
    return cards.map( (card) => `
      <div class='${card.name}-card card col'>
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

