import assert from 'power-assert';
import { mergeShips } from './ship';
import { Ship } from '../entity';

test('mergeShips', () => {
  const ships = {};
  ships[0] = {
    id: 0,
    shipId: 1,
    fuel: 10,
    bullet: 10,
  };
  const masterShips = {};
  masterShips[1] = {
    maxFuel: 20,
    maxBullet: 20,
    maxSpaces: [20, 20, 20],
  };
  const merged: Record<number, Ship> = mergeShips(ships, masterShips);

  assert.equal(merged[0].fuel, 10);
  assert.equal(merged[0].maxFuel, 20);
});
