const Pile = require('./pile.js');
const PileExplorer = require('./pileexplorer.js');
const PilePreviewer = require('./pilepreviewer.js');
const csv = require('papaparse');

class PileGroupEditor {
  constructor(){
    //this[pileName] is added on upload.
    this.piles = [];
    this.uploadComplete = false;
    this.selectedPile = undefined; // will be an instance of Pile once a Pile Explorer pile header is clicked.
    this.highlight = undefined; // will be a name of a Pile (String).
  }

  html(){
    return `
      <div id='pileGroupEditor' class='container'>
        <div class='pile-group-editor-header row'>
          <div class='col'>
            <h1 class='pile-group-editor-title text-center'>Pile Group Editor</h1>
          </div>
        </div>
        <div class='pile-group-editor-controls text-center row'>
          <div class='col'>
            <input id='pge-c-upload' type="file">
          </div>
          <div class='col'>
            <button id='pge-c-add-pile' class='button'>Add Pile</button>
          </div>
          <div class='col'>
            <button id='pge-c-remove-pile' class='button'>Remove Pile</button>
          </div>
        </div>
        <div id='pge-inside' class='pile-group-editor-interactive row'>
          ${this.htmlInside()}
        <div>
      </div>
    `;
  }

  htmlInside(){
    if (this.uploadComplete == false){
      return `
        <div class='pile-group-editor-instructions text-center col'>
          Upload a CSV to get started.
        </div>
      `;
    }else{
      return `
        <div class='pile-explorer text-center card pl-0 pr-0 col-3'>
          ${PileExplorer(this.piles, this.highlight)}
        </div>
        <div id='pile-previewer' class='card col-9'>
          ${PilePreviewer(this.selectedPile)}
        </div>
      `;
    }
  }

  listen(){
    if (this.uploadComplete == false){
      document.querySelector('#pge-c-upload').addEventListener('change', uploadHandler.bind(null, this), false);
    }else{
      // Listen for clicking the 'Add Pile' button.
      document.querySelector('#pge-c-add-pile').onclick = function AddPileListener(){
        //Allow user to specify a card pile name.
        //Create a new Pile and add it to this.piles and this[pileName].
        //this.update();
      }.bind(this);

      // Listen for clicking on a PileExplorer pile header.
      var DOMPiles = document.querySelectorAll('div[pileName]');
      DOMPiles.forEach( (DOMPile) => {
        DOMPile.onclick = function PileHeaderListener(){
          //Set the selectedPile property to trigger Pile Previewer.
          var pileName = DOMPile.getAttribute('pileName');
          this.selectedPile = this[pileName];
          // Highlighting of pile headers.
          this.highlight = pileName;
          this.update();
        }.bind(this);
      });

    }
  }

  handleCSV(csv){
    var uploadPile = buildPileFromCSV(csv);
    this.piles = this.piles.concat(uploadPile);
    this[uploadPile.name] = uploadPile;
    this.uploadComplete = true;
    this.update();
  }

  update(){
    var thisDOMElement = document.getElementById('pge-inside');
    thisDOMElement.removeChild(thisDOMElement.children[0]);
    thisDOMElement.innerHTML = this.htmlInside();
    this.listen();
  }
}

function uploadHandler(pge){
  var file = document.querySelector('#pge-c-upload').files[0];
  if (file.type != 'text/csv'){
    window.alert('Must be CSV.');
    return false;
  }
  csv.parse(file, {
    complete: pge.handleCSV.bind(pge)
  });
}

function buildPileFromCSV(results){
  var cards = [];
  results.data.slice(1).forEach( (cardInfo) => {
    var card = {};
    cardInfo.forEach( (property, i) => {
      var heading = results.data[0][i];
      card[heading] = property;
    });
    cards.push(card);
  });
  return new Pile('_upload_', 'up', cards);
}



module.exports = PileGroupEditor;
