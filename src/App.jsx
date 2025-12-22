import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';

import './App.module.css';

function App() {
    const location = useLocation();
    const state = location.state || {};
    const backgroundLocation = state.background;

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar />
            {/* <main className={styles.main}>
                <Routes location={backgroundLocation || location}>
          <Route path="/" element={<HomePage />} />
                    <Route path="/users/:id" element={<UserTasksPage />} />
                    <Route path="/categories/:id" element={<CategoryTasksPage />} />
                    <Route path="/tasks/overdue/" element={<OverdueTasksPage />} />
                    <Route path="/tasks/due_this_week/" element={<DueThisWeekTasksPage />} />
                    <Route path="/tasks/done/" element={<DoneTasksPage />} />
                    <Route path="/about/" element={<AboutPage />} />
                    <Route path="/imprint/" element={<Imprint />} />
                    <Route path="/privacy-policy/" element={<PrivacyPolicy />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {backgroundLocation && (
          <Routes>
            <Route path="/create-user" element={<CreateListModal />} />
                        <Route path="/edit-user/:id" element={<EditListModal />} />
                        <Route path="/create-category" element={<CreateCategoryModal />} />
                        <Route path="/edit-category/:id" element={<EditCategoryModal />} />
          </Routes>
        )}
            </main> */}
        </div>
    );
}

export default App;
