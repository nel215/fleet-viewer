import { Quest } from '../entity';

function isSelected(quest) {
  return quest.state === 2 || quest.state === 3;
}

export default function getSelectedQuests(quests: Record<number, Quest>) {
  const selected = Object.values(quests).filter(quest => isSelected(quest));
  return selected;
}
