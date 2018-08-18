import Vue from 'vue';

const ShipStore = {
  ships: {},
  updateShip(ship) {
    Vue.set(this.ships, ship.id, ship);
  }
}
