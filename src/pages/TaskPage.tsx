import { IconCalendar } from '@consta/icons/IconCalendar';
import { Button } from '@consta/uikit/Button';
import { Card } from '@consta/uikit/Card';
import { DatePicker } from '@consta/uikit/DatePicker';
import { Modal } from '@consta/uikit/Modal';
import { Select } from '@consta/uikit/Select';
import { Switch } from '@consta/uikit/Switch';
import { Text } from '@consta/uikit/Text';
import { TextField } from '@consta/uikit/TextField';
import { TextFieldTypeTextArea } from '@consta/uikit/TextFieldCanary';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type NetworkNode = {
  id: string;
  label: string;
  ip: string;
  type: string;
};

type TaskPriority = 'low' | 'medium' | 'high' | 'critical';

const labels = {
  low: 'Низкий',
  medium: 'Средний',
  high: 'Высокий',
  critical: 'Критический',
};

const networkNodes: NetworkNode[] = [
  { id: '1', label: 'Core Router (ASR-1002)', ip: '10.0.0.1', type: 'router' },
  { id: '2', label: 'Access Switch #1 (CE6850)', ip: '10.0.1.1', type: 'switch' },
  { id: '3', label: 'Firewall (PA-3260)', ip: '10.0.4.1', type: 'firewall' },
];

const priorityOptions: TaskPriority[] = ['low', 'medium', 'high', 'critical'];

export const TaskPage = () => {
  const [formData, setFormData] = useState({
    nodeId: '',
    title: '',
    description: '',
    priority: 'medium' as TaskPriority,
    scheduledDate: null as Date | null,
    requiresDowntime: false,
  });

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Task submitted:', formData);
    setIsSuccessModalOpen(true);
  };

  const handleChange = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const navigate = useNavigate();

  return (
    <Card verticalSpace="xl" horizontalSpace="xl">
      <Text size="2xl" weight="bold" marginBottom="l">
        Создание новой задачи
      </Text>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gap: 'var(--space-xl)', maxWidth: '800px' }}>
          <Select
            label="Сетевой узел"
            items={networkNodes}
            value={networkNodes.find(node => node.id === formData.nodeId) || null}
            onChange={(currentValue) => handleChange('nodeId', currentValue?.id || '')}
            getItemLabel={item => `${item.label} (${item.ip})`}
            getItemKey={item => item.id}
            placeholder="Выберите устройство"
            required
          />

          <TextField
            label="Название задачи"
            value={formData.title}
            onChange={(currentValue) => handleChange('title', currentValue)}
            placeholder="Например: Замена модуля SFP"
            required
          />

          <TextFieldTypeTextArea
            value={formData.description}
            onChange={(currentValue) => handleChange('description', currentValue)}
            placeholder="Опишите необходимые работы, специфические требования..."
            rows={5}
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-xl)' }}>
            <Select
              label="Приоритет"
              items={priorityOptions}
              value={formData.priority}
              getItemKey={(item: TaskPriority) => item}
              onChange={(currentValue) => handleChange('priority', currentValue)}
              getItemLabel={(item: TaskPriority) => labels[item]}
              required
            />

            <DatePicker
              label="Планируемая дата работ"
              value={formData.scheduledDate}
              onChange={(currentValue) => handleChange('scheduledDate', currentValue)}
              rightSide={IconCalendar}
              type="date-time"
            />
          </div>

          <Switch
            label="Требуется downtime сети"
            checked={formData.requiresDowntime}
            onChange={(currentValue) => handleChange('requiresDowntime', currentValue)}
          />

          {formData.requiresDowntime && (
            <Card status="warning" form="round">
              <Text view="warning" size="s">
                Будет создана заявка на downtime сети в период работ.
                Оповещение всех заинтересованных сторон произойдет автоматически.
              </Text>
            </Card>
          )}

          <div style={{ display: 'flex', gap: 'var(--space-m)' }}>
            <Button
              type="submit"
              label="Создать задачу"
              view='secondary'
            />
            <Button
              type="reset"
              label="Очистить форму"
              view="ghost"
              onClick={() => setFormData({
                nodeId: '',
                title: '',
                description: '',
                priority: 'medium',
                scheduledDate: null,
                requiresDowntime: false,
              })}
            />
          </div>
        </div>
      </form>

      <Modal isOpen={isSuccessModalOpen}>
        <div style={{ margin: "50px" }}>
          <Text size="xl" weight="bold" marginBottom="m">
            Задача успешно создана!
          </Text>
          <Text marginBottom="xl">
            ID задачи: T-{Math.floor(Math.random() * 10000)}
          </Text>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: "50px" }}>
            <Button
              label="Закрыть"
              onClick={() => {
                setIsSuccessModalOpen(false)
                navigate("/home")
              }}
            />
          </div>
        </div>
      </Modal>
    </Card>
  );
};