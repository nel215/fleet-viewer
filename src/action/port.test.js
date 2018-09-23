import assert from 'power-assert';
import PortAction from './port';

test('PortAction#execute', () => {
  const act = new PortAction({
    shipStore: {
      updateShip(s) {
        assert(s, {
          id: 1,
          ship_id: 2,
          lv: 3,
          hp: 4,
          maxhp: 5,
          fuel: 6,
          bull: 7,
          cond: 8,
          slot: [0, 1, 2, 3, 4],
        });
      },
    },
  });

  act.execute({
    api_data: {
      api_ship: [
        {
          api_id: 1,
          api_ship_id: 2,
          api_lv: 3,
          api_nowhp: 4,
          api_maxhp: 5,
          api_fuel: 6,
          api_bull: 7,
          api_cond: 8,
          api_slot: [0, 1, 2, 3, 4],
        },
      ],
    },
  });
});
