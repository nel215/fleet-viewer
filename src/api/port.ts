interface Ship {
  id: Number;
}

function parseShip(data): Ship {
  return <Ship>{
    id: data.api_id,
    shipId: data.api_ship_id,
    lv: data.api_lv,
    hp: data.api_nowhp,
    maxhp: data.api_maxhp,
    fuel: data.api_fuel,
    bull: data.api_bull,
    cond: data.api_cond,
    slot: data.api_slot,
  };
}

export default {
  parse(body) {
    const ships = body.api_data.api_ship.map(d => parseShip(d));
    const decks = body.api_data.api_deck_port.map(d => ({
      id: d.api_id,
      ship_ids: d.api_ship,
    }));
    return { ships, decks };
  },
};
