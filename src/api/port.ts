import Parser from './parser';

export default {
  parse(body) {
    const ships = body.api_data.api_ship.map(d => Parser.parseShip(d));
    const decks = body.api_data.api_deck_port.map(d => ({
      id: d.api_id,
      ship_ids: d.api_ship,
    }));
    return { ships, decks };
  },
};
