

import { Button } from '@consta/uikit/Button';
import { Card } from '@consta/uikit/Card';
import { Text } from '@consta/uikit/Text';
import { IconAdd } from '@consta/icons/IconAdd';
import { Badge } from '@consta/uikit/Badge';
import { NetworkDiagram } from '../components/NetworkDiagram';
import { Grid, GridItem } from '@consta/uikit/Grid';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ReportList } from '../components/ReportList';

const DEMO_NODES = [
  {
    id: '1',
    type: 'router',
    position: { x: 250, y: 50 },
    data: {
      label: 'Core Router (Main)',
      status: 'online',
      ip: '10.0.0.1',
      model: 'Cisco ASR-1002-HX',
      location: 'Москва, ЦОД-1'
    }
  },
  {
    id: '2',
    type: 'switch',
    position: { x: 150, y: 150 },
    data: {
      label: 'Access Switch #1',
      status: 'degraded',
      ip: '10.0.1.1',
      model: 'Huawei CE6850-48S6Q-HI',
      throughput: '1.2Gbps'
    }
  },
  {
    id: '3',
    type: 'server',
    position: { x: 350, y: 150 },
    data: {
      label: 'DNS Server',
      status: 'online',
      ip: '10.0.2.10',
      model: 'Dell PowerEdge R750',
      role: 'Primary DNS'
    }
  },
  {
    id: '4',
    type: 'router',
    position: { x: 500, y: 50 },
    data: {
      label: 'Edge Router',
      status: 'online',
      ip: '10.0.0.2',
      model: 'Juniper MX204',
      interface: '100Gbps'
    }
  },
  {
    id: '5',
    type: 'switch',
    position: { x: 450, y: 200 },
    data: {
      label: 'Distribution Switch',
      status: 'online',
      ip: '10.0.3.1',
      model: 'Aruba CX 8320',
      stack: 'Stack-1'
    }
  },
  {
    id: '6',
    type: 'device',
    position: { x: 200, y: 250 },
    data: {
      label: 'Firewall',
      status: 'online',
      ip: '10.0.4.1',
      model: 'Palo Alto PA-3260',
      threat_prevention: 'enabled'
    }
  },
  {
    id: '7',
    type: 'server',
    position: { x: 300, y: 300 },
    data: {
      label: 'NOC Monitoring',
      status: 'degraded',
      ip: '10.0.5.10',
      model: 'HPE ProLiant DL380',
      load: '78%'
    }
  },
  {
    id: '8',
    type: 'switch',
    position: { x: 100, y: 350 },
    data: {
      label: 'Access Switch #2',
      status: 'offline',
      ip: '10.0.1.2',
      model: 'Huawei CE6850-48S6Q-HI',
      last_seen: '2023-11-15 08:23:45'
    }
  },
  {
    id: '9',
    type: 'router',
    position: { x: 400, y: 350 },
    data: {
      label: 'Backup Router',
      status: 'online',
      ip: '10.0.0.3',
      model: 'MikroTik CCR1072',
      bgp_peers: 12
    }
  },
  {
    id: '10',
    type: 'device',
    position: { x: 250, y: 400 },
    data: {
      label: 'Load Balancer',
      status: 'online',
      ip: '10.0.6.1',
      model: 'F5 BIG-IP 4200v',
      connections: 2450
    }
  },
  {
    id: '11',
    type: 'server',
    position: { x: 350, y: 450 },
    data: {
      label: 'Database Cluster',
      status: 'online',
      ip: '10.0.7.10',
      model: 'Oracle Exadata X8M',
      storage: '48TB'
    }
  }
];

type HomeCardProps = {
  nodes: { id: string | number, type: string, data: { ip: string, model: string } }[];
  stats: { label: string, status: string, value: number | string }[];
}

const HomeCard = ({ nodes, stats }: HomeCardProps) => {
  const [showReport, setShowReport] = useState(false);

  const navigate = useNavigate();

  return (
    <Card verticalSpace="m" horizontalSpace="m">
      <NetworkDiagram nodes={nodes} />

      <div className="stats-grid">
        {stats.map((item) => (
          <Card key={item.label} border status={item.status} style={{ margin: "10px 0", padding: "5px" }}>
            <Text size="s" view="secondary">{item.label}</Text>
            <Text size="xl" weight="bold">{item.value}</Text>
            {item.status === 'alert' && <Badge label="Требует внимания" status="warning" />}
          </Card>
        ))}
      </div>

      {showReport ? (
        <ReportList />
      ) : null}
  
      <div style={{ display: "flex", justifyContent: "space-between"}}>
        <Button label="Создать задачу" iconRight={IconAdd} onClick={() => navigate('/backbone/task')} />
        <Button label={showReport ? "Скрыть" : "Отчет за день"} view="ghost" onClick={() => setShowReport(!showReport)} />
      </div>
    </Card>
  )
};

const stats1 = [
  { label: 'Активные задачи', value: 24, status: 'alert' },
  { label: 'Оборудование онлайн', value: '98%', status: 'success' },
  { label: 'Инциденты за сутки', value: 3, status: 'warning' }
];

const stats2 = [
  { label: 'Активные задачи', value: 1, status: 'success' },
  { label: 'Оборудование онлайн', value: '50%', status: 'warning' },
  { label: 'Инциденты за сутки', value: 50, status: 'alert' }
];

const stats3 = [
  { label: 'Активные задачи', value: 5, status: 'warning' },
  { label: 'Оборудование онлайн', value: '2%', status: 'alert' },
  { label: 'Инциденты за сутки', value: 3, status: 'success' }
];

export const HomePage = () => (
  <div className="container">
    <Text size="2xl" weight="bold" style={{ margin: "0 0 20px 0" }}>Главный страница</Text>
    <Text size="s" weight="regular" style={{ margin: "0 0 20px 0" }}>тут все статусы подключения</Text>
    <Grid cols={2} gap="xl">
      <GridItem col={1}>
        <HomeCard nodes={DEMO_NODES.slice(0, 4)} stats={stats1} />
      </GridItem>
      <GridItem col={1}>
        <HomeCard nodes={DEMO_NODES.slice(4, 7)} stats={stats2} />
      </GridItem>
      <GridItem col={1}>
        <HomeCard nodes={DEMO_NODES.slice(7)} stats={stats3} />
      </GridItem>
    </Grid>
  </div>
)