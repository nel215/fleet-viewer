function isUnclearEvent(map) {
  return !map.cleared && map.isEvent;
}

function getUnclearedEventMaps(maps: Record<number, any>) {
  return Object.values(maps).filter(map => isUnclearEvent(map));
}

export default getUnclearedEventMaps;
