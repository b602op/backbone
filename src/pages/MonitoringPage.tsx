import { Badge } from "@consta/uikit/Badge";
import { ProgressSpin } from "@consta/uikit/ProgressSpin";
import { Select } from "@consta/uikit/Select";
import { Switch } from "@consta/uikit/Switch";
import { useCallback, useEffect, useState } from "react";
import { Table } from "@consta/table/Table";
import { ProgressLine } from "@consta/uikit/ProgressLine";
import { Text } from "@consta/uikit/Text";

const getRows = () => {
  const test = Math.random();

  const cpu1 = Math.round(45 * test) > 100 ? 100 : Math.round(45 * test);
  const cpu3 = Math.round(80 * test) > 100 ? 100 : Math.round(80 * test);
  const cpu4 = Math.round(66 * test) > 100 ? 100 : Math.round(66 * test);
  const cpu5 = Math.round(23 * test) > 100 ? 100 : Math.round(23 * test);
  const cpu6 = Math.round(12 * test) > 100 ? 100 : Math.round(12 * test);
  const cpu7 = Math.round(99 * test) > 100 ? 100 : Math.round(99 * test);
  

  return [
    {
        id: 1,
        name: 'Сервер 1',
        status: cpu1 > 50 ? 'warning' : 'online',
        ip: '192.168.1.1',
        cpu: cpu1,
    },
    {
        id: 2,
        name: 'Рабочая станция 2',
        status: 'offline',
        ip: '192.168.1.2',
        cpu: 0
    },
    {
        id: 3,
        name: 'Файловый сервер',
        status: cpu3 > 50 ? 'warning' : 'online',
        ip: '192.168.1.3',
        cpu: cpu3,
    },
    {
        id: 4,
        name: 'Прокси-сервер',
        status: cpu4 > 50 ? 'warning' : 'online',
        ip: '192.168.1.4',
        cpu: cpu4,
    },
    {
        id: 5,
        name: 'База данных',
        status: cpu5 > 50 ? 'warning' : 'online',
        ip: '192.168.1.5',
        cpu: cpu5,
    },
    {
        id: 6,
        name: 'VPN-шлюз',
        status: cpu6 > 50 ? 'warning' : 'online',
        ip: '192.168.1.6',
        cpu: cpu6,
    },
    {
        id: 7,
        name: 'Почтовый сервер',
        status: cpu7 > 50 ? 'warning' : 'online',
        ip: '192.168.1.7',
        cpu: cpu7,
    }
];
}


const useEquipmentMonitoring = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState(getRows());

  const fetchData = useCallback(() => {
      setIsLoading(true);
      setRows(getRows());
      setIsLoading(false);

      const timeoutId = setTimeout(fetchData, 4000);
      
      return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
      const cleanup = fetchData();
      
      return () => {
          cleanup?.();
      };
  }, [fetchData]);

  return {
      data: isLoading ? [] : rows,
      isLoading,
  };
};

export const MonitoringPage = () => {
  const { data, isLoading } = useEquipmentMonitoring();
  const [onlyAlerts, setOnlyAlerts] = useState(false);
  const [selectedItem, setSelectedItem] = useState<null | { label: string, value: number }>(null)

  const columns = [
    { title: 'ID', accessor: 'id' },
    { title: 'Устройство', accessor: 'name' },
    { title: 'Статус', accessor: 'status', renderCell: (cell: any) => {
      const status = cell?.row?.status === "online" ? "success" : cell?.row?.status;

      return <Badge status={status === "offline" ? "error" : status} label={status} />
    } },
    { title: 'IP', accessor: 'ip', minWidth: 140 },
    { title: 'Нагрузка CPU', accessor: 'cpu', renderCell: (cell: any) => (
      <div>
        <ProgressLine value={cell?.row.cpu} />
        <Text>{`${cell?.row.cpu}%`}</Text>
      </div>
    ) }
  ];

  const currentRows = data.filter((item) => {
    let isFilter = true;

    if (selectedItem) isFilter = selectedItem && item.id === selectedItem.value

    if (onlyAlerts) isFilter = item.status === "offline"

    return isFilter
  })

  return (
    <div className="monitoring">
      <Text size="2xl" weight="bold" style={{ margin: "0 0 20px 0" }}>Мониторинг</Text>
      <Text size="s" weight="regular" style={{ margin: "0 0 20px 0" }}>тут в зависимости от частоты обновления разные решения можно применить</Text>
      <Text size="s" weight="regular" style={{ margin: "0 0 20px 0" }}>- вебсокет, если часто</Text>
      <Text size="s" weight="regular" style={{ margin: "0 0 20px 0" }}>- или запрос каждые 5 минут, например</Text>
      <Table
        rows={currentRows}
        columns={columns}
        style={{ width: "100%" }}
      />
      <div className="controls">
        <Select
          items={data.map((item) => ({ label: item.name, value: item.id }))}
          value={selectedItem}
          label="Локация" 
          onChange={(newValue) => setSelectedItem(newValue)} 
          getItemKey={item => item.label}
        />
        <Switch 
          label="Только ошибки" 
          checked={onlyAlerts}
          onChange={() => setOnlyAlerts(!onlyAlerts)}
          style={{ marginTop: "10px"}}
        />
      </div>

      {isLoading && <ProgressSpin size="m" />}
    </div>
  );
};