import { buildMap } from './place.js';

let placeMap;
let currentPlace;

function nextPlace(direction) {
  currentPlace = currentPlace.nextPlace(direction);
  renderGame();
}
window.nextPlace = nextPlace;

function renderGame() {
  document.getElementById('game').innerHTML = currentPlace.descriptionHTML();
}

async function main() {
  const placeDataResponse = await fetch('./places.json');
  const placeData = await placeDataResponse.json();
  placeMap = buildMap(placeData);
  currentPlace = placeMap.startingPlace;
  renderGame();
}

main();
