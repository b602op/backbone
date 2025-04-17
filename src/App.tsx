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
            <Route path="/backbone/home" element={<HomePage />} />
            <Route path="/backbone/task" element={<TaskPage />} />
            <Route path="/backbone/stage" element={<StageListPage />} />
            <Route path="/backbone/stage/create" element={<StageCreatePage />} />
            <Route path="/backbone/monitoring" element={<MonitoringPage />} />
            <Route path="/backbone" element={<Navigate to="/backbone/home" replace />} />
            <Route path="/home" element={<Navigate to="/backbone/home" replace />} />
            <Route path="/" element={<Navigate to="/backbone/home" replace />} />
          </Routes>
        </Layout>
      </Router>
    </Theme>
  );
}