function PileGroup(){
  var piles = Array.prototype.slice.call(arguments);
  return `
    <div class='all-cards row'>
      <div class='col'>
          ${ piles.map( (pile) => pile.html()).join('') }
      </div>
  </div>
  `;
}

module.exports = PileGroup;
