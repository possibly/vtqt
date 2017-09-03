function PileGroup(){
  return `<div class='cards'>
    <div class='row'>
      ${arguments[0].html()}
    </div>
    <div class='row'>
      ${arguments[1].html()}
    </div>
    <div class='row'>
      ${arguments[2].html()}
    </div>
</div>`
}

module.exports = PileGroup;
