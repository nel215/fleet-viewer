interface Slotitem {
  id: Number;
  slotitemId: Number;
  locked: Boolean;
}

export default {
  parse(body) {
    const slotitems = body.api_data.api_slot_item.map(
      d => <Slotitem>{
        id: d.api_id,
        slotitemId: d.api_slotitem_id,
        locked: d.api_locked === 1,
      },
    );
    return {
      slotitems,
    };
  },
};
