function PileExplorer(piles, highlight){
  var listgroup = piles.map( (pile) => {
    var cards = pile.cards.map( (card) => {
      return `
        <div class="card">
          ${card.name}
        </div>
      `;
    });
    var classList = 'card-header';
    if (highlight != undefined && pile.name == highlight){
      classList += ' list-group-item-success';
    }
    return `
      <div pileName='${pile.name}' class="${classList}">
        <h5 class="mb-0">
          ${pile.name}
        </h5>
      </div>
      ${cards.join('')}
    `;
  });
  return listgroup.join('');
}

module.exports = PileExplorer;
