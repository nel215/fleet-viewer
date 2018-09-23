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
    slot: [1],
  };
  const apiSlotitems = {};
  apiSlotitems[1] = {
    slotitemId: 1,
  };
  const masterShips = {};
  const masterSlotitems = {};
  masterShips[1] = {
    maxFuel: 20,
    maxBullet: 20,
    maxSpaces: [20, 20, 20],
  };
  masterSlotitems[1] = {
    name: 'test',
  };
  const master = {
    ships: masterShips,
    slotitems: masterSlotitems,
  };
  const merged: Record<number, Ship> = mergeShips(ships, apiSlotitems, master);

  assert.equal(merged[0].fuel, 10);
  assert.equal(merged[0].maxFuel, 20);
  assert.deepEqual(merged[0].slotitems, [{ name: 'test' }]);
});
