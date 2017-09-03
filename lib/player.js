const Pile = require('./pile.js');
const PileGroup = require('./pilegroup.js');

class Player {
  constructor(name){
    this.name = name;
    this.courage = 10; //default courage.
    this.draw = new Pile('draw', 'down');
    this.hand = new Pile('hand', 'up' );
    this.undrawn = new Pile('undrawn', 'down');
  }

  deltaCourage(num){
    this.courage += deltaCourage;
    return this.courage;
  }

  addCards(cards, which, where){
    return this[which].push(cards, where);
  }

  html(){
    return `<div id='${this.name}'>
  <h2>${this.name}, ${this.courage}</h2>
  ${PileGroup(this.hand, this.draw, this.undrawn)}
</div>`
  }
}

module.exports = Player;
