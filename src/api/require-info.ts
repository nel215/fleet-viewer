import { Slotitem } from '../store/types';

export default {
  parse(body) {
    const slotitems = body.api_data.api_slot_item.map(
      d => <Slotitem>{
        id: d.api_id,
        slotitemId: d.api_slotitem_id,
        locked: d.api_locked === 1,
        level: d.api_level,
        airLevel: d.api_alv || 0,
      },
    );
    return {
      slotitems,
    };
  },
};
