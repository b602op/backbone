import { Navbar } from '@consta/header/Navbar';
import { useNavigate, useLocation } from 'react-router-dom';

const items = [
  {
    label: 'главная',
    href: '/home',
    size: "s",
  },
  {
    label: 'список этапов',
    href: '/stage',
    size: "s",
  },
  {
    label: 'мониторинг',
    href: '/monitoring',
    size: "s",
  },
];

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const enhancedItems = items.map(item => ({
    ...item,
    active: location.pathname === item.href
  }));

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Navbar
        items={enhancedItems}
        style={{ flexShrink: 0, borderRight: "1px solid black", padding: "10px" }}
        getItemLabel={(item) => item.label}
        onItemClick={(item) => navigate(item.href)}
        getItemActive={(item) => item.active}
        size='m'
        form='default'
      />
      <div style={{ flexGrow: 1, padding: '20px', overflow: 'auto' }}>
        {children}
      </div>
    </div>
  );
};