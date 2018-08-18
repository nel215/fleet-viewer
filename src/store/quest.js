
const QuestStore = {
  state: {
    quests: {},
  },
  updateQuests(body) {
    body.api_data.api_list.forEach((q) => {
      this.state.quests[q.api_no] = {
        id: q.api_no,
        title: q.api_title,
        detail: q.api_detail,
        state: q.api_state,
      }
    });
  }
};

export default QuestStore;
