import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("theme-app") || "wireframe",
  setTheme: (theme) => {
    localStorage.setItem("theme-app", theme);
    set({ theme });
  },
}));
