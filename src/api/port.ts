import { parseShip, parseDeck } from './parser';

export default {
  parse(body) {
    const ships = body.api_data.api_ship.map(d => parseShip(d));
    const decks = body.api_data.api_deck_port.map(d => parseDeck(d));
    return { ships, decks };
  },
};
