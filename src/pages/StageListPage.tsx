import { useState } from 'react';
import { Button } from '@consta/uikit/Button';
import { Card } from '@consta/uikit/Card';
import { DatePicker } from '@consta/uikit/DatePicker';
import { Informer } from '@consta/uikit/Informer';
import { Steps } from '@consta/uikit/Steps';
import { Text } from '@consta/uikit/Text';

const stages = [
  { label: 'Проектирование', status: 'done' },
  { label: 'Поставка оборудования', status: 'progress' },
  { label: 'Монтаж', status: 'wait' }
];

export const StageListPage = () => {
  const [activeStage, setActiveStage] = useState(stages[0]);
  const [showInformer, setShowInformer] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [informerMessage, setInformerMessage] = useState('Сообщение отправлено');
  const [informerStatus, setInformerStatus] = useState<'success' | 'warning'>('success');

  const handleButtonClick = () => {
    let message = 'Пожалуйста, выберите дату';
    let currentStatus: 'warning' | "success" = 'warning'

    if (selectedDate) {
      message = 'Сообщение отправлено';
      currentStatus = "success"

      setSelectedDate(null);
    }

    setInformerMessage(message);

    setInformerStatus(currentStatus)
    
    setShowInformer(true);
    
    setTimeout(() => {
      setShowInformer(false);
    }, 5000);
  };

  return (
    <div>
      <Text size="2xl" weight="bold">Этапы проекта #4512</Text>
      
      <Steps
        items={stages}
        value={activeStage}
        onChange={(item) => setActiveStage(item)}
      />

      <Card>
        <div style={{ margin: "10px" }}>
          <Text style={{ marginTop: "10px" }} weight="semibold">{activeStage?.label}</Text>
          <DatePicker
            label="Планируемая дата" 
            value={selectedDate}
            onChange={(value) => setSelectedDate(value)}
            style={{ marginTop: "10px" }}
          />
          
          <Button
            label="Добавить событие" 
            style={{ margin: "10px 0" }}
            onClick={handleButtonClick}
          />
        </div>
      </Card>
      
      {showInformer && (
        <Informer 
          label={informerMessage} 
          view="filled" 
          status={informerStatus} 
        />
      )}
    </div>
  );
}