import { create } from "zustand";
import { persist } from "zustand/middleware"


const useAuthStore = create(
    persist(
        (set) => ({
            isLoggedIn: false,
            token: null,

            login: (token) => {
                set({ isLoggedIn: true, token: token });
            },

            logout: () => {
                set({ isLoggedIn: false, token: null });
            },
        }),
        {
            name: "auth-storage",
        }
    )
);

export default useAuthStore