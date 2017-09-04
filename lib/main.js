const Player = require('./player.js');
const PileGroupEditor = require('./pilegroupeditor.js');

draw([new PileGroupEditor()])

//Allow user to navigate from PGE to Player Editor to PlayView.

// httpRequest = new XMLHttpRequest();
// httpRequest.onload = function(){
//   if (this.status === 200){
//     var cards = JSON.parse(this.responseText);
//     var players = [
//       {name: 'Tyler', 'Courage': 10, 'CuStOm': 'PrOpeRtY'},
//       {name: 'Sarah', 'Courage': 10, 'CuStOm': 'PrOpeRtY'},
//       {name: 'Karl', 'Courage': 10, 'CuStOm': 'PrOpeRtY'},
//     ]
//     var piles = [
//       {name: 'played', face: 'up'},
//       {name: 'drawn', face: 'up'},
//       {name: 'undrawn', face: 'down', 'cards': cards}
//     ]
//     var state = players.map( (player) => new Player(player, piles) );
//     draw(state);
//   }
// }
// httpRequest.open('GET', '/cards', true);
// httpRequest.send(null);

function draw(state){
  var htmlState = state.map( (data) => data.html() ).join('');
  document.getElementById('app').innerHTML = htmlState;
  state.map( (data) => data.listen() );
}
