const Player = require('./player.js');

httpRequest = new XMLHttpRequest();
httpRequest.onload = function(){
  if (this.status === 200){
    var cards = JSON.parse(this.responseText);
    console.log(cards);
    var p = new Player('tyler');
    p.addCards(cards, 'hand');
    document.getElementById('app').innerHTML = p.html();
  }
}
httpRequest.open('GET', '/cards', true);
httpRequest.send(null);
