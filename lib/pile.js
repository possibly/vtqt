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
      return `<div class='${this.name} pile'>
        <div class='empty-pile'>
          empty.
        </div>
      </div>`
    }
    // face down
    else if (this.face == 'down'){
      return `<div class='${this.name} pile'>
        ${cards.map((card) => `
          <div class='card face-down'>
            '?'
          </div>
        `).join('')}
      </div>`
    }
    // face up
    return `<div class='${this.name} pile'>
      ${cards.map((card) => `<div class='${card.name} card'>
        ${Object.keys(card).map((key) => `
          <div class='${key} card-property-name'>
            ${key}
          </div>
          <div class='card-property'>
            ${card[key]}
          </div>
        `).join('')}
      `).join('')}
    </div>`
  }
}

module.exports = Pile;

