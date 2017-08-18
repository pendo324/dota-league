export const getUser = ({ commit }) =>
  fetch('/user', {
    credentials: 'include'
  }).then((response) => {
    if (response.ok) {
      return response.json().then((json) => {
        commit('setUser', {
          user: json
        });
        return Promise.resolve(json);
      });
    }
    return Promise.reject(new Error('No user available.'));
  });

export const logout = ({ commit }) => {
  fetch('/logout', {
    credentials: 'include'
  }).then((response) => {
    if (!response.ok) {
      commit('clearUser');
    }
  });
};
