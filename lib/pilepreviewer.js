function PilePreviewer(pile){
  if (pile == undefined){
    return '(Click a pile to preview its cards.)'
  }
  var headers = Object.keys(pile.cards[0]).map( (header) => `<th>${header}</th>` );
  var body = pile.cards.map( (card) => {
    var bodies = Object.values(card).map( (property) => `<td>${property}</td>` );
    return `<tr>${bodies.join('')}</tr>`
  })
  return `
    <table class="table table-hover table-responsive">
      <thead>
        <tr>
          ${headers.join('')}
        </tr>
      </thead>
      <tbody>
        ${body.join('')}
      </tbody>
    </table>
  `;
}

module.exports = PilePreviewer;
