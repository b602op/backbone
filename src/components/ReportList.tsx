import { List } from '@consta/uikit/ListCanary';

type Item = {
  label: string;
  id: number;
  disabled: boolean;
};

const items: Item[] = [
  {
    label: '65 - всего было активных задач',
    id: 1,
    disabled: true,
  },
  {
    label: '50% - оборудованрия в среднем было онлай',
    id: 2,
    disabled: true,
  },
  {
    label: '15 - всего инцидентов за сутки',
    id: 3,
    disabled: true,
  },
  {
    label: 'XX - Заведено задач',
    id: 3,
    disabled: true,
  },
];

export const ReportList = () => {
  return (
    <div style={{ margin: "10px 0",  borderTop: "1px solid var(--color-control-typo-disable)" }}>
      <List items={items} />
    </div>
  )
}