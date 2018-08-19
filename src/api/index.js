function parseShip(data) {
  return {
    id: data.api_id,
    ship_id: data.api_ship_id,
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
  createAction(body) {
    const ships = body.api_data.api_ship_data.map(d => parseShip(d));
    console.log(ships);
    return {
      type: 'handleShipDeck',
      ships,
    };
  },
};
