import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage, MonitoringPage, StageCreatePage, StageListPage } from './pages'
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { TaskPage } from './pages/TaskPage';

export function App() {
  return (
    <Theme preset={presetGpnDefault}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/task" element={<TaskPage />} />
            <Route path="/stage" element={<StageListPage />} />
            <Route path="/stage/create" element={<StageCreatePage />} />
            <Route path="/monitoring" element={<MonitoringPage />} />
            <Route path="/" element={<Navigate to="/home" replace />} />
          </Routes>
        </Layout>
      </Router>
    </Theme>
  );
}