import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Appbar from './components/Appbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import ResearchQuestionPage from './pages/ResearchQuestionPage.jsx';
import MethodPage from './pages/MethodPage.jsx';
import QuestionnairePage from './pages/QuestionnairePage.jsx';
import ResultsPage from './pages/ResultsPage.jsx';
import ConclusionPage from './pages/ConclusionPage.jsx';
import AboutModal from './modals/AboutModal.jsx';
import PrivacyPolicyModal from './modals/PrivacyPolicyModal.jsx';
import ImprintModal from './modals/ImprintModal.jsx';

import styles from './App.module.css';

function App() {
    const location = useLocation();
    const state = location.state || {};
    const backgroundLocation = state.background;

    return (
        <div className={styles.container}>
            <Sidebar />
            <main className={styles.main}>
                <Appbar />
                <Routes location={backgroundLocation || location}>
                    <Route path="/" element={<ResearchQuestionPage />} />
                    <Route path="/method/" element={<MethodPage />} />
                    <Route path="/questionnaire/" element={<Navigate to="/questionnaire/1" replace />} />
                    <Route path="/questionnaire/:id" element={<QuestionnairePage />} />
                    <Route path="/results/" element={<ResultsPage />} />
                    <Route path="/conclusion/" element={<ConclusionPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>

            {backgroundLocation && (
                <Routes>
                    <Route path="/about" element={<AboutModal />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicyModal />} />
                    <Route path="/imprint" element={<ImprintModal />} />
                </Routes>
            )}
        </div>
    );
}

export default App;
