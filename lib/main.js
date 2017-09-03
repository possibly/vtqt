const Player = require('./player.js');

httpRequest = new XMLHttpRequest();
httpRequest.onload = function(){
  if (this.status === 200){
    var cards = JSON.parse(this.responseText);
    var t = new Player('tyler');
    t.addCards(cards.slice(0,2), 'draw');
    t.addCards(cards.slice(2,4), 'hand');
    var s = new Player('sarah');
    s.addCards(cards.slice(0,2), 'hand');
    s.addCards(cards.slice(2,4), 'draw');
    var state = [t, s];
    draw(state);
  }
}
httpRequest.open('GET', '/cards', true);
httpRequest.send(null);

function draw(state){
  var htmlState = state.map( (data) => data.html() ).join('');
  document.getElementById('app').innerHTML = htmlState;
  state.map( (data) => data.listen() );
}
