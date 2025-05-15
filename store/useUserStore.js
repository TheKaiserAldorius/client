// frontend/src/store/useUserStore.js

import create from 'zustand'

export const useUserStore = create((set) => ({
  user: null,
  telegramInitData: null,              // ← для сохранения initDataUnsafe
  balance: 0,
  isLoading: true,
  error: null,

  setTelegramInitData: (init) => set({ telegramInitData: init }), // ← сеттер
  setUser:    (u) => set({ user: u }),
  setBalance: (b) => set({ balance: b }),
  setLoading: (v) => set({ isLoading: v }),
  setError:   (e) => set({ error: e }),
}))