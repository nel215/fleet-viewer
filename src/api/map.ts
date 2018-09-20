import { Map } from '../entity';

interface EventMapResponse {
  api_now_maphp: number;
  api_max_maphp: number;
  api_selected_rank: number;
}

interface MapInfoResponse {
  api_id: number;
  api_cleared: number;
  api_eventmap: EventMapResponse;
}

function merge(maps: Record<number, any>, mapMasters: Record<number, any>) {
  const res = {};
  Object.values(maps).forEach((m) => {
    const mas = mapMasters[m.id] || {
      name: '-',
      operation: '-',
    };
    res[m.id] = <Map>Object.assign({}, m, {
      name: mas.name,
      operation: mas.operation,
    });
  });
  return res;
}

function parse(data: Array<MapInfoResponse>) {
  return data.map((d) => {
    const isEvent = d.api_eventmap !== undefined;
    if (isEvent) {
      const nowHp = d.api_eventmap.api_now_maphp;
      const maxHp = d.api_eventmap.api_max_maphp;
      const rank = d.api_eventmap.api_selected_rank;
      return <Map>{
        id: d.api_id,
        isEvent,
        nowHp,
        maxHp,
        rank,
        cleared: d.api_cleared === 1,
      };
    }
    return <Map>{
      id: d.api_id,
      isEvent,
      nowHp: 0,
      maxHp: 0,
      rank: 0,
      cleared: d.api_cleared === 1,
    };
  });
}

export default {
  parse,
  merge,
};
