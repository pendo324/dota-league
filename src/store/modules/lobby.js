export default {
  state: {
    lobbies: [],
    messages: [],
    lobbyId: '',
    members: []
  },
  mutations: {
    setLobbies(state, { lobbies }) {
      state.lobbies = lobbies;
    },

    joinLobby(state, { lobbyId, members, messages }) {
      state.lobbyId = lobbyId;
      state.members = members;
      state.messages = messages;
    },

    clearLobby(state) {
      state.messages = [];
      state.lobbyId = '';
      state.members = [];
    },

    setMessages(state, { messages }) {
      state.messages = messages;
    },

    addMessage(state, message) {
      message.lobbyId = state.lobbyId;
      state.messages.push(message);
    },

    addMember(state, member) {
      member.lobbyId = state.lobbyId;
      state.members.push(member);
    },

    removeMember(state, userId) {
      state.members = state.members.splice(state.members.findIndex(member =>
        member.userId === userId), 1);
    }
  },
  actions: {
    socket_newMessage({ commit }, { displayName, content, sent }) {
      commit('addMessage', {
        displayName,
        content,
        sent
      });
    },

    socket_userJoined({ commit }, { displayName, userId, avatar }) {
      commit('addMember', {
        displayName,
        userId,
        avatar
      });
    },

    socket_userLeft({ commit }, { userId }) {
      console.log('test');
      commit('removeMember', {
        userId
      });
    },

    getLobbies({ commit }) {
      fetch('/lobbies', {
        credentials: 'include'
      }).then((response) => {
        response.json().then((json) => {
          commit('setLobbies', {
            lobbies: json
          });
        });
      });
    },

    getMessages({ commit }, id) {
      fetch(`/lobby/${id}/messages`, {
        credentials: 'include'
      }).then((response) => {
        response.json().then((json) => {
          commit('setMessages', {
            messages: json
          });
        });
      });
    },

    getLobby({ commit }, { lobbyId }) {
      console.log(lobbyId);
      fetch(`/lobby/${lobbyId}`, {
        credentials: 'include'
      }).then((response) => {
        response.json().then((json) => {
          commit('joinLobby', {
            lobbyId: json.lobbyId,
            members: json.members,
            messages: json.messages
          });
        });
      });
    }
  },
  getters: {
    lobbies: store => store.lobbies,
    lobby: store => store.lobby,
    lobbyId: store => store.lobbyId,
    chatMessages: store => store.messages,
    lobbyMembers: store => store.members
  }
};
