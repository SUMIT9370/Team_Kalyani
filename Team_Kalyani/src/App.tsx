import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LoginPage } from './components/auth/LoginPage';
import { SignupPage } from './components/auth/SignupPage';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';
import { Header } from './components/layout/Header';
import { Dashboard } from './components/dashboard/Dashboard';
import { SummarizePage } from './components/summarize/SummarizePage';
import { AnalyticsPage } from './components/analytics/AnalyticsPage';
import { HistoryPage } from './components/history/HistoryPage';
import { SettingsPage } from './components/settings/SettingsPage';
import { WelcomeTour } from './components/common/WelcomeTour';
import { Toaster } from './components/ui/sonner';

type Page = 'dashboard' | 'summarize' | 'analytics' | 'history' | 'settings';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [authView, setAuthView] = useState<'login' | 'signup'>('login');
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showWelcomeTour, setShowWelcomeTour] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      const hasSeenTour = localStorage.getItem('hasSeenWelcomeTour');
      if (!hasSeenTour) {
        setShowWelcomeTour(true);
      }
    }
  }, [isAuthenticated]);

  const handleCompleteTour = () => {
    localStorage.setItem('hasSeenWelcomeTour', 'true');
    setShowWelcomeTour(false);
  };

  if (!isAuthenticated) {
    return authView === 'login' ? (
      <LoginPage onNavigateToSignup={() => setAuthView('signup')} />
    ) : (
      <SignupPage onNavigateToLogin={() => setAuthView('login')} />
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={(page) => setCurrentPage(page as Page)} />;
      case 'summarize':
        return <SummarizePage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'history':
        return <HistoryPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard onNavigate={(page) => setCurrentPage(page as Page)} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
      <Sidebar
        currentPage={currentPage}
        onNavigate={(page) => setCurrentPage(page as Page)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
          {renderPage()}
        </main>
        <MobileNav
          currentPage={currentPage}
          onNavigate={(page) => setCurrentPage(page as Page)}
        />
      </div>
      {showWelcomeTour && <WelcomeTour onComplete={handleCompleteTour} />}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
        <Toaster position="top-right" />
      </AuthProvider>
    </ThemeProvider>
  );
}