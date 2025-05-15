// src/components/Header.tsx
import React, { useEffect, useState, useMemo } from 'react';
import { Avatar, Modal, Placeholder, Input, Button } from "@telegram-apps/telegram-ui";
import { useNavigate } from 'react-router-dom';
import { useSignal, initData, openPopup, useLaunchParams } from "@telegram-apps/sdk-react";
import { ModalHeader } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";
import { ModalClose } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalClose/ModalClose";
import { X } from "lucide-react";

import starIcon from '../../assets/buttonsicons/StarTg.png';
import { useStars } from '@/hooks/useStars';
import { useLanguage } from '@/components/LanguageContext';
import { useProfileDeposit } from '@/hooks/useProfileDeposit';
import './Header.css';

export const Header: React.FC = () => {
  const { stars, refetchStars } = useStars();
  const { language } = useLanguage();
  const initDataState = useSignal(initData.state);
  const { platform } = useLaunchParams();
  const { handleDeposit } = useProfileDeposit();

  const user = initDataState?.user;
  const [userData, setUserData] = useState<any>(null);
  const [amount, setAmount] = useState<string>('');

  useEffect(() => {
    if (user) setUserData(user);
  }, [user]);

  const initials = userData ? userData.firstName[0] : 'Г';

  const handleTopUp = () => {
    const parsedAmount = Number(amount);
    if (parsedAmount <= 0 || isNaN(parsedAmount)) {
      openPopup({
        title: language === 'ru' ? "Неверная сумма" : "Invalid Amount",
        message: language === 'ru' ? "Пожалуйста, введите правильную сумму." : "Please enter a valid amount.",
        buttons: [{ id: "ok", type: "default", text: "OK" }],
      });
      return;
    }
    handleDeposit(parsedAmount, refetchStars);
    setAmount('');
  };

  return (
    <header className="header">
      <div className="header__user">
        {userData?.photoUrl ? (
          <Avatar size={30} src={userData.photoUrl} />
        ) : (
          <div className="header__avatar placeholder">{initials}</div>
        )}
        <div className="header__info">
          <div className="header__name">
            {userData ? `${userData.firstName} ${userData.lastName}` : 'Гость'}
          </div>
          <div className="header__sub">
            {language === 'ru' ? `${stars ?? 0} звёзд` : `${stars ?? 0} stars`}
          </div>
        </div>
      </div>

      <div className="header__actions">
        <div className="header__balance">
          <img
            src={starIcon}
            alt="Star"
            className="header__star-icon"
            style={{ width: 14, height: 14, marginRight: 5, verticalAlign: 'middle' }}
          />
          {stars ?? 0}
        </div>

        {/* 💸 Кнопка пополнения в модалке */}
        <Modal
          header={
            <ModalHeader after={<ModalClose><X /></ModalClose>}>
              {language === 'ru' ? 'Пополнение баланса' : 'Top Up Balance'}
            </ModalHeader>
          }
          trigger={
            <button className="header__topup-btn">+</button>
          }
        >
          <Placeholder
            description={language === 'ru'
              ? "Введите сумму для пополнения"
              : "Enter the amount to top up"}
            header={language === 'ru'
              ? "Пополните баланс"
              : "Top Up Your Balance"}
          >
            <Input
              type="number"
              placeholder={language === 'ru' ? 'Сумма' : 'Amount'}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={platform === "ios" ? "input-ios-fix" : undefined}
            />
            <Button onClick={handleTopUp}>
              {language === 'ru' ? 'Пополнить' : 'Top Up'}
            </Button>
          </Placeholder>
        </Modal>
      </div>
    </header>
  );
};
