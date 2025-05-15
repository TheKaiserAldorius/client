import React, { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Tabbar } from '@telegram-apps/telegram-ui';
import { Boxes, Globe, CircleUser } from 'lucide-react';
import { backButton, miniApp, useSignal } from '@telegram-apps/sdk-react';
import { Page } from '@/components/Page';
import { CasesPage } from '@/pages/CasesPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { LeaderboardPage } from '@/pages/LeaderboardPage';
import { useLanguage } from '@/components/LanguageContext';
import styles from './IndexPage.module.css';

export const IndexPage: FC = () => {
  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab') as 'case' | 'leaders' | 'profile' | null;
  const [currentTab, setCurrentTab] = useState<'case' | 'leaders' | 'profile'>(tabFromUrl || 'case');
  const isDark = useSignal(miniApp.isDark);
  const { language } = useLanguage();

  useEffect(() => {
    if (tabFromUrl) setCurrentTab(tabFromUrl);
  }, [tabFromUrl]);

  useEffect(() => {
    backButton.hide();
  }, [currentTab]);

  return (
    <Page>
      <div style={{ padding: '138px 0 73px' }}>
        {currentTab === 'case' && <CasesPage />}
        {currentTab === 'leaders' && <LeaderboardPage />}
        {currentTab === 'profile' && <ProfilePage />}
      </div>

      <Tabbar className={styles.tabbar} appearance={isDark ? 'dark' : 'light'}>
        <Tabbar.Item
          id="leaders"
          text={language === 'ru' ? 'Лидеры' : 'Leaders'}
          selected={currentTab === 'leaders'}
          onClick={() => setCurrentTab('leaders')}
        >
          <Globe size={20} />
        </Tabbar.Item>
        <Tabbar.Item
          id="case"
          text={language === 'ru' ? 'Кейсы' : 'Cases'}
          selected={currentTab === 'case'}
          onClick={() => setCurrentTab('case')}
        >
          <Boxes size={20} />
        </Tabbar.Item>
        <Tabbar.Item
          id="profile"
          text={language === 'ru' ? 'Профиль' : 'Profile'}
          selected={currentTab === 'profile'}
          onClick={() => setCurrentTab('profile')}
        >
          <CircleUser size={20} />
        </Tabbar.Item>
      </Tabbar>
    </Page>
  );
};
