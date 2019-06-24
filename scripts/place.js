import { oppositeDirection } from './directions.js';

export class Place {
  constructor({ id, name, description, img, exits }) {
    this.id = id;
    this._placeName = name;
    this._description = description;
    this._img = img;
    this._exits = exits || {};
  }
  addExit(direction, place) {
    if (this._exits[direction] === place) {
      return;
    }
    this._exits[direction] = place;
    const opposite = oppositeDirection(direction);
    place.addExit(opposite, this);
  }
  nextPlace(direction) {
    return this._exits[direction];
  }
  exits() {
    return Object.keys(this._exits);
  }
  description() {
    return `${this._placeName}. ${this._description ||
      ''} There are exits ${this.exits().join(', ')}`;
  }
  exitsHTML() {
    const htmlArr = [];
    for (let direction of this.exits()) {
      const span = `<a href="#" onclick=nextPlace("${direction}")>${direction}</a>`;
      htmlArr.push(span);
    }
    return htmlArr.join(', ');
  }
  descriptionHTML() {
    return `<h2>${this._placeName}</h2><p>${this._description ||
      ''} There are exits ${this.exitsHTML()}</p><img src="${this._img}" />`;
  }
  updateExits(placeMap) {
    for (const direction of this.exits()) {
      const placeId = this._exits[direction];
      if (!placeId.id) {        
        const place = placeMap[placeId]
        if (place) {
          this.addExit(direction, place);
        }
      }
    }
  }
}

export function buildMap(placesData) {
  const placeMap = {};
  for (const placeData of placesData.places) {
    const place = new Place(placeData);
    placeMap[place.id] = place;
  }
  for (const place of Object.values(placeMap)) {
    place.updateExits(placeMap);
  }
  placeMap.startingPlace = placeMap[placesData.startingPlace];
  return placeMap;
}
