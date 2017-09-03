function PileGroup(){
  var args = Array.prototype.slice.call(arguments);
  return `
    <div class='all-cards row'>
      <div class='col'>
          ${ args.map( (pile) => pile.html()).join('') }
      </div>
  </div>
  `;
}

module.exports = PileGroup;
