const Player = require('./player.js');

httpRequest = new XMLHttpRequest();
httpRequest.onload = function(){
  if (this.status === 200){
    var cards = JSON.parse(this.responseText);
    var p = new Player('tyler');
    p.addCards(cards.slice(0,2), 'draw');
    p.addCards(cards.slice(2,4), 'hand');
    draw(p);
  }
}
httpRequest.open('GET', '/cards', true);
httpRequest.send(null);

function draw(p){
  document.getElementById('app').innerHTML = p.html();
  setListeners(p);
}

function setListeners(p){
  var draggables = document.querySelectorAll('div[draggable]');
    draggables.forEach( (draggable) => {
      
      draggable.addEventListener('dragstart', (e) => {
        var cardname = e.target.getAttribute('cardName');
        // cards are draggable, and its guaranteed that the pile name will be in a div above the card.
        var pilename = findParentWithAttribute(e.target, 'pileName').getAttribute('pileName');
        var obj = {'cardName': cardname, 'pileName': pilename}
        e.dataTransfer.setData("text/plain", JSON.stringify(obj));
      });

    });
  var droppables = document.querySelectorAll('div[droppable]');
  droppables.forEach( (droppable) => {

    droppable.addEventListener('drop', (e) => {
      e.preventDefault();
      var info = JSON.parse(e.dataTransfer.getData("text/plain"));
      var pileFrom = p[info.pileName];
      var movingCard = pileFrom.get(info.cardName) || {'name': '_randomCard_'};
      var pileTo = p[findParentWithAttribute(e.target, 'pileName').getAttribute('pileName')];

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
      draw(p);
    });

    droppable.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

  });
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
