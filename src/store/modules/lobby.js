import router from '@/router/';

export default {
  state: {
    lobbies: [],
    messages: [],
    lobbyId: '',
    members: [],
    queuing: false,
    acceptQueueId: '',
    matchAccepted: ''
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

    setMembers(state, { members }) {
      state.members = members;
    },

    addMember(state, member) {
      member.lobbyId = state.lobbyId;
      state.members.push(member);
    },

    removeMember(state, userId) {
      state.members = state.members.splice(
        state.members.findIndex(member => member.userId === userId),
        1
      );
    },

    setTeam(state, userId, team) {
      const playerIndex = state.members.findIndex(member => member.userId === userId);
      const player = { ...state.members[playerIndex], ...{ team } };

      state.members = state.members.splice(playerIndex, 1, player);
    },

    joinQueue(state) {
      state.queuing = true;
    },

    matchReady(state, acceptQueueId) {
      state.acceptQueueId = acceptQueueId;
    },

    matchAccepted(state) {
      state.matchAccepted = '';
    },

    lobbyReady(state, { lobbyId }) {
      router.push({ name: 'match', params: { id: lobbyId } });
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
      setTimeout(() => {
        commit('addMember', {
          displayName,
          userId,
          avatar
        });
      }, 500);
    },

    socket_userLeft({ commit }, { userId }) {
      commit('removeMember', {
        userId
      });
    },

    socket_setTeam({ commit }, { userId, team }) {
      commit('setTeam', {
        userId,
        team
      });
    },

    socket_acceptQueue({ commit }, { acceptQueueId }) {
      commit('matchReady', acceptQueueId);
    },

    socket_lobbyReady({ commit }, { lobbyId }) {
      commit('lobbyReady', { lobbyId });
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
      fetch(`/lobby/${lobbyId}`, {
        credentials: 'include'
      }).then((response) => {
        response.json().then((json) => {
          commit('setMessages', {
            messages: json.messages
          });
          commit('setMembers', {
            members: json.members
          });
        });
      });
    },

    joinQueue({ commit }, { socketId }) {
      fetch('/joinQueue', {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({
          socketId
        }),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then(() => {
        commit('joinQueue');
      });
    },

    acceptQueue({ commit }, { acceptQueueId }) {
      fetch('/acceptQueue', {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({
          acceptQueueId
        }),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then(() => {
        commit('matchAccepted');
      });
    }
  },
  getters: {
    lobbies: store => store.lobbies,
    lobby: store => store.lobby,
    lobbyId: store => store.lobbyId,
    chatMessages: store => store.messages,
    lobbyMembers: store => store.members,
    queuing: store => store.queuing,
    acceptQueueId: store => store.acceptQueueId,
    matchReady: store => store.acceptQueueId.length > 0
  }
};
