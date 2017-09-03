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
    return `
      <div id='${this.name}' class='container'>
        <div class='player-stats row'>
          <div class='player-name col'>
            <h2>${this.name}</h2>
          </div>
          <div class='player-courage col'>
            <h2>${this.courage}</h2>
          </div>
        </div>
        ${PileGroup(this.hand, this.draw, this.undrawn)}
      </div>
    `;
  }
}

module.exports = Player;
