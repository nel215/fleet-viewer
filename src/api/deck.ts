import { Deck, Mission } from '../entity';

export interface APIDeck {
  id: number;
  shipIds: Array<number>;
  mission: APIMission;
}

interface APIMission {
  id: number;
  end: number;
}

export function mergeDecks(decks: Record<number, APIDeck>, master) {
  const res: Array<Deck> = Object.values(decks).map((d) => {
    const m = master.missions[d.mission.id];
    if (m === undefined) {
      return <Deck>{
        id: d.id,
        shipIds: d.shipIds,
        mission: null,
      };
    }
    return <Deck>{
      id: d.id,
      shipIds: d.shipIds,
      mission: <Mission>{
        name: m.name,
        end: d.mission.end,
      },
    };
  });
  return res;
}

function parseMission(data) {
  return <APIMission>{
    id: data[1],
    end: data[2],
  };
}

export function parseDeck(data) {
  const mission = parseMission(data.api_mission);
  return <APIDeck>{
    id: data.api_id,
    shipIds: data.api_ship,
    mission,
  };
}

export default {
  mergeDecks,
};
