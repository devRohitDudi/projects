// store/useAuthStore.js
import { create } from "zustand";

const useAuthStore = create((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (value) => set({ isLoggedIn: value }),
  currentUsername: "",
  setCurrentUsername: (value) => set({ currentUsername: value }),
}));

export default useAuthStore;
