// src/App.tsx
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useLaunchParams, miniApp, useSignal } from '@telegram-apps/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { LanguageProvider } from './LanguageContext';
import { Header } from '@/components/Header';
import { BottomNavigation } from '@/components/BottomNavigation';
import { IndexPage } from '@/pages/IndexPage/IndexPage';
import { HistoryPage } from '@/pages/HistoryPage';
import { LeaderboardPage } from '@/pages/LeaderboardPage';
import { ProfilePage } from '@/pages/ProfilePage';


export const App: React.FC = () => {
  const lp = useLaunchParams();
  const isDark = useSignal(miniApp.isDark);

  return (
    <LanguageProvider>
      <AppRoot
        appearance={isDark ? 'dark' : 'light'}
        platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
      >
        <HashRouter>
          <Header />

         <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
 

          <BottomNavigation />
        </HashRouter>
      </AppRoot>
    </LanguageProvider>
  );
};
