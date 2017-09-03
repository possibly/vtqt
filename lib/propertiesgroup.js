function PropertiesGroup(properties){
  var html = Object.keys(properties).map( (prop) => {
    return `
      <div class='player-${prop} col'>
        <h2>${properties[prop]}</h2>
      </div>
    `
  });
  return `
    <div class='player-stats row'>
      ${html.join('')}
    </div>
  `;
}

module.exports = PropertiesGroup;
