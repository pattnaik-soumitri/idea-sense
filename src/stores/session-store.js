import { defineStore } from 'pinia';

export const useSessionStore = defineStore('user', {
  state: () => ({
    loggedIn: false,
    fullName: 'The mighty Thorr'
  }),
  getters: {
    isLoggedIn: (state) => state.loggedIn,
  },
  actions: {
    login() {
      this.loggedIn = true;
    },
    logout() {
      this.loggedIn = false;
    }
  },
});
