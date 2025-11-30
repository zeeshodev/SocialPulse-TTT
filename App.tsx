import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { TopicsPage } from './pages/TopicsPage';
import { TagsPage } from './pages/TagsPage';
import { HowToUsePage } from './pages/HowToUsePage';
import { ComingSoonPage } from './components/ComingSoonPage';
import { PenTool } from 'lucide-react';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1e293b',
            color: '#f8fafc',
            border: '1px solid rgba(255,255,255,0.1)',
          },
          success: {
            iconTheme: { primary: '#34d399', secondary: '#1e293b' },
          },
          error: {
            iconTheme: { primary: '#fb7185', secondary: '#1e293b' },
          },
        }}
      />

      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/topics" element={<TopicsPage />} />
        <Route path="/tags" element={<TagsPage />} />
        <Route path="/how-to-use" element={<HowToUsePage />} />
        <Route
          path="/create"
          element={
            <ComingSoonPage
              title="Post Creator & Scheduler"
              description="Create, schedule, and publish posts across all your connected social media platforms from one place."
              icon={<PenTool className="w-16 h-16 text-pink-400" />}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;