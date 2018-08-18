import ShipStore from '../store/ship';

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
  }
}

class PortAction {
  constructor(opt={}) {
    this.shipStore = opt.shipStore || ShipStore;
  }
  execute(body) {
    body.api_data.api_ship.forEach((d) => {
      this.shipStore.updateShip(parseShip(d));
    });
  }
}

export default PortAction;
