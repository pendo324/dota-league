export const STORAGE_KEY = 'tracks';

export const state = {
  user: {},
  lobbies: []
};

export const mutations = {
  setUser(s, { user }) {
    s.user = user;
  },

  clearUser(s) {
    s.user = {};
  },

  SOCKET_CONNECT: (s) => {
    s.connect = true;
  }
};
