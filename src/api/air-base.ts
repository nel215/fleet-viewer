export interface PlaneResp {
  api_squadron_id: number;
  api_state: number;
  api_slotid: number;
}

export interface AirBaseResp {
  api_area_id: number;
  api_rid: number;
  api_name: string;
  api_distance: number;
  api_action_kind: number;
  api_plane_info: Array<PlaneResp>;
}

export function parse(data: Array<AirBaseResp>) {
  const tmp = data.reduce((a, d) => {
    if (a[d.api_area_id] === undefined) {
      Object.assign(a, { [d.api_area_id]: [] });
    }
    a[d.api_area_id].push(d);
    return a;
  }, {});
  const res = Object.entries(tmp).map(([id, bases]) => ({
    id,
    bases,
  }));
  return res;
}

export default {
  parse,
};
