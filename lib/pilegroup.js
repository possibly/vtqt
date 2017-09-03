function PileGroup(){
  return `<div class='all-cards row'>
    <div class='col'>
        ${arguments[0].html()}
        ${arguments[1].html()}
        ${arguments[2].html()}
    </div>
</div>`
}

module.exports = PileGroup;
