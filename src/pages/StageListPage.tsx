import { Button } from '@consta/uikit/Button';
import { Card } from '@consta/uikit/Card';
import { DatePicker } from '@consta/uikit/DatePicker';
import { Steps } from '@consta/uikit/Steps';
import { Text } from '@consta/uikit/Text';
import { useState } from 'react';

const stages = [
  { label: 'Проектирование', status: 'done' },
  { label: 'Поставка оборудования', status: 'progress' },
  { label: 'Монтаж', status: 'wait' }
];

export const StageListPage = () => {
  const [activeStage, setActiveStage] = useState(stages[0]);

  return (
    <div>
      <Text size="2xl" weight="bold">Этапы проекта #4512</Text>
      
      <Steps
        items={stages}
        value={activeStage}
        onChange={(item) => setActiveStage(item)}
      />

      {/* Детали этапа */}
      <Card>
        <div style={{ margin: "10px" }}>
          <Text style={{ marginTop: "10px" }} weight="semibold">{activeStage?.label}</Text>
          <DatePicker
            label="Планируемая дата" 
            onChange={(date) => console.log(date)}
            style={{ marginTop: "10px" }}
          />
          
          <Button
            label="Добавить оборудование" 
            style={{ margin: "10px 0" }}
            // onClick={() => Modal.open(<StageForm />)}
          />
        </div>
      </Card>
    </div>
  );
}