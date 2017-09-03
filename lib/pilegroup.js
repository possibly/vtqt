function PileGroup(piles){
  return `
    <div class='all-cards row'>
      <div class='col'>
          ${ piles.map( (pile) => pile.html()).join('') }
      </div>
    </div>
  `;
}

module.exports = PileGroup;
