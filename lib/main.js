const Player = require('./player.js');

httpRequest = new XMLHttpRequest();
httpRequest.onload = function(){
  if (this.status === 200){
    var cards = JSON.parse(this.responseText);
    var piles = [
      {name: 'played', face: 'up'},
      {name: 'drawn', face: 'up'},
      {name: 'undrawn', face: 'down', 'cards': cards}
    ]
    var t = new Player('tyler', piles);
    var s = new Player('sarah', piles);
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
