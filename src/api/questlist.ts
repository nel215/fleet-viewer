import { Quest } from '../entity';

export default {
  parse(body) {
    const page: number = body.api_data.api_disp_page;
    const quests = body.api_data.api_list.map(
      d => <Quest>{
        id: d.api_no,
        page,
        title: d.api_title,
        detail: d.api_detail,
        category: d.api_category,
        state: d.api_state,
        progress: d.api_progress_flag,
      },
    );
    const payload = {
      page,
      quests,
    };
    return payload;
  },
};
