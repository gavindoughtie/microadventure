const Direction = {
  north: 'north',
  south: 'south',
  east: 'east',
  west: 'west'
}

const OppositeDirection = {
  north: Direction.south,
  south: Direction.north,
  east: Direction.west,
  west: Direction.east
}

function oppositeDirection(direction) {
  return OppositeDirection[direction];
}

class Place {
  constructor(placeName, description, image) {
    this._placeName = placeName;
    this._description = description;
    this._img = image;
    this._exits = {};
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
    return `${this._placeName}. ${this._description || ''} There are exits ${this.exits().join(', ')}`;
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
    return `<h2>${this._placeName}</h2><p>${this._description || ''} There are exits ${this.exitsHTML()}</p><img src="${this._img}" />`;
  }
}

// Set up the places
const theCastle =
      new Place('Scary Castle',
                `The brooding castle beckons you in.`,
               'http://jeffbrowngraphics.com/wp-content/uploads/2016/05/darkcastle-1080x600.jpg');
const theWoods = new Place('Dark woods',
                           'A dark and inviting woods',
                         'https://live.staticflickr.com/1492/24075563634_a92871781f_b.jpg');
const theClearing = new Place('Magical Land', 'Everything is beautiful here.', 'https://cdn.shopify.com/s/files/1/2341/3995/articles/99a1c84f684e86551e9d1e2b195e6c55-1024x683_1024x768.progressive.jpg?v=1527276599');

// Create the map of how one place connects
// to the other.
theClearing.addExit(Direction.south, theCastle);
theClearing.addExit(Direction.north, theWoods);

// Run the game in a loop
let runGame = true;
let currentPlace = theClearing;
function nextPlace(direction) {
  currentPlace = currentPlace.nextPlace(direction);
  renderGame();
}
function renderGame() {
  document.getElementById('game').innerHTML = currentPlace.descriptionHTML(); 
}
renderGame();
