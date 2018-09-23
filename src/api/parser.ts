import { Deck, Mission } from '../store/types';

function parseMission(data) {
  return <Mission>{
    id: data[1],
    end: data[2],
  };
}

export function parseDeck(data) {
  const mission = parseMission(data.api_mission);
  return <Deck>{
    id: data.api_id,
    shipIds: data.api_ship,
    mission,
  };
}

export default {
  parseDeck,
};
