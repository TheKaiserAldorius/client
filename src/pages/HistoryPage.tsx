// src/pages/HistoryPage.tsx
import { FC, useEffect } from "react";
import { Page } from "@/components/Page";
import { useSignal, initData, miniApp, useLaunchParams, backButton } from "@telegram-apps/sdk-react";
import { Text, Headline } from "@telegram-apps/telegram-ui";
import { useHistory } from "@/hooks/useHistory";
import styles from "./HistoryPage.module.css";
import MoneyBagIcon from "../../assets/prize/moneyBag.webp";
import StarIcon from "../../assets/prize/StarsIcon.webp";
import { useNavigate } from "react-router-dom";
import { useLanguage } from '@/components/LanguageContext';
import histIcon    from '../../assets/iconitems/HistoryCock.svg';

export const HistoryPage: FC = () => {
  const initDataState = useSignal(initData.state);
  const user = initDataState?.user;
  const { history, loading } = useHistory();
  const navigate = useNavigate();

  const isDark = useSignal(miniApp.isDark);
  const { platform } = useLaunchParams();
  const { language } = useLanguage();

  useEffect(() => {
    backButton.show();
    return backButton.onClick(() => {
      navigate('/?tab=profile');
    });
  }, [navigate]);

  const translateHistoryType = (type: string) => {
    switch (type) {
      case "Deposit":
        return language === 'ru' ? "Пополнение" : "Deposit";
      case "Sold":
        return language === 'ru' ? "Продажа" : "Sold";
      case "Gift won":
        return language === 'ru' ? "Подарок получен" : "Gift won";
      case "Gift exchanged":
        return language === 'ru' ? "Подарок обменян" : "Gift exchanged";
      default:
        return type;
    }
  };

  useEffect(() => {
    if (platform === 'ios') {
      const container = document.querySelector(`.${styles.historyItem}`) as HTMLElement;
      document.querySelectorAll(`.${styles.historyItem}`).forEach(el => {
        el.style.backgroundColor = isDark ? "#2B313A" : "#FFFFFF";
        el.style.color = isDark ? "#FFFFFF" : "#000000";
      });
    }
  }, [isDark, platform]);

  return (
    <Page back={true}>
      <div className={styles.historyPage}>
        <div className={styles.historyHeader}>
          <div className={styles.historyIconCircle}>
            <img src={histIcon} alt="История" />
          </div>
          <div className={styles.historyTitles}>
            <div className={styles.historyTitle}>
              {language === 'ru' ? 'История действий' : 'Action History'}
            </div>
            <div className={styles.historySubtitle}>
              {language === 'ru'
                ? 'Следите за вашими операциями'
                : 'Track your gift activities below'}
            </div>
          </div>
        </div>

        <div className={styles.historyList}>
          {loading
            ? <div className={styles.historyLoading}>
                {language === 'ru' ? 'Загрузка истории…' : 'Loading history…'}
              </div>
            : history.length > 0
              ? history.map((item, idx) => {
                  const isPositive = item.direction === "+";
                  return (
                    <div key={idx} className={styles.historyItem}>
                      <img
                        src={item.type === "Gift exchanged" ? MoneyBagIcon : undefined}
                        alt={item.type}
                        className={styles.itemIcon}
                      />
                      <div className={styles.itemContent}>
                        <div className={styles.itemType}>
                          {translateHistoryType(item.type)}{item.id && ` #${item.id}`}
                        </div>
                        <div className={styles.itemMeta}>
                          {item.type !== "Gift exchanged" && (
                            <span className={styles.itemStars}>
                              <img src={StarIcon} alt="звезда" className={styles.starIcon} />
                              <span className={isPositive ? styles.plus : styles.minus}>
                                {item.direction}{item.amount}
                              </span>
                            </span>
                          )}
                          <span className={styles.itemDate}>
                            {new Date(item.date).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              : <div className={styles.historyEmpty}>
                  {language === 'ru' ? 'У вас ещё нет транзакций' : 'No history available'}
                </div>
          }
        </div>
      </div>
    </Page>
  );
};
