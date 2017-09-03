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

  // Returns the inside of this module, since I don't want to ruin DOM positioning on update().
  htmlInside(){
    return `
      <div class='player-stats row'>
        <div class='player-name col'>
          <h2>${this.name}</h2>
        </div>
        <div class='player-courage col'>
          <h2>${this.courage}</h2>
        </div>
      </div>
      ${PileGroup(this.hand, this.draw, this.undrawn)}
    `;
  }

  listen(){
    // Note that these depend on custom HTML attributes to recover information stored in the DOM.
    // Listen for drag events.
    var draggables = document.querySelectorAll('div#'+this.name+' div[draggable]');
    draggables.forEach( (draggable) => {
      
      draggable.addEventListener('dragstart', (e) => {
        var cardName = e.target.getAttribute('cardName');
        // Retrieve the name of the pile this card is in. The name of the pile has been stored in the DOM.
        var pileName = findParentWithAttribute(e.target, 'pileName').getAttribute('pileName');
        var obj = {'cardName': cardName, 'pileName': pileName}
        // Save this information for when we go to drop the card.
        e.dataTransfer.setData("text/plain", JSON.stringify(obj));
      });

    });
    
    // Listen for drop events.
    var droppables = document.querySelectorAll('div#'+this.name+' div[droppable]');
    droppables.forEach( (droppable) => {

      droppable.addEventListener('drop', (e) => {
        e.preventDefault();
        var info = JSON.parse(e.dataTransfer.getData("text/plain"));
        var pileFrom = this[info.pileName];
        var movingCard = pileFrom.get(info.cardName) || {'name': '_randomCard_'};
        // Retrieve the pile that the user is targeting whose information has been saved in the DOM.
        var pileTo = this[findParentWithAttribute(e.target, 'pileName').getAttribute('pileName')];

        if (pileTo.name == pileFrom.name && movingCard.name != '_randomCard_'){
          // If the piles are the same, then the user wants to swap the position of two cards in the same pile.
          // Get the card that was targeted. Note that the user's drop target may be an element inside the div with the cardName attribute.
          // Lets find that div with the cardName attribute.
          var cardToName = findParentWithAttribute(e.target, 'cardName').getAttribute('cardName');;
          if (cardToName == null){
            // User tried to 'swap' a card with the entire pile, which makes no sense.
            return false;
          }
          pileFrom.swap(cardToName, movingCard.name);
        }
        else if (pileTo.name != pileFrom.name && movingCard.name != '_randomCard_'){
          // If the piles are not the same, then the user wants to remove the card from the original pile and add it to the new one.
          pileFrom.remove(movingCard.name);
          pileTo.push(movingCard);
        }
        else if (movingCard.name == '_randomCard_'){
          // If the card has this reserved name, then draw a random card from pileFrom and add it to pileTo.
          var randomCard = pileFrom.pick();
          pileTo.push(randomCard);
        }

        this.update();
      });

      droppable.addEventListener('dragover', (e) => {
        e.preventDefault();
      });

    });
  }

  // A change has happened that requires the DOM to update.
  // A smarter VDOM would diff/patch the DOM for just content that has changed.
  // We will just remove this module from the DOM, and re-add the whole module.
  // Note that all the listeners will have to be re-added as well.
  // (I hope garbage collection will catch all the now useless listeners!)
  update(){
    var thisDOMElement = document.getElementById(this.name);
    thisDOMElement.removeChild(thisDOMElement.children[0]);
    thisDOMElement.innerHTML = this.htmlInside();
    this.listen();
  }
}

function findParentWithAttribute(element, attribute){
  var target = element;
  while(target.getAttribute(attribute) == null){
    target = target.parentElement;
    if (target == null){
      // Can't search any higher.
      return null;
    }
  }
  return target;
}

module.exports = Player;
