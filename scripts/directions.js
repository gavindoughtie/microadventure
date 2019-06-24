export const Direction = {
  north: 'north',
  south: 'south',
  east: 'east',
  west: 'west'
}

export const OppositeDirection = {
  north: Direction.south,
  south: Direction.north,
  east: Direction.west,
  west: Direction.east
}

export function oppositeDirection(direction) {
  return OppositeDirection[direction];
}
