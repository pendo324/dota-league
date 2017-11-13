<template>
  <div class="col-9">
    <div class="row lobby">
      <Messages></Messages>
      <Members></Members>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import Messages from './Messages';
import Members from './Members';
import store from '../store';

export default {
  name: 'Lobby',
  components: {
    Messages,
    Members
  },
  computed: {
    ...mapGetters([
      'lobbies',
      'lobby',
      'user',
      'lobbyId'
    ])
  },
  methods: {
    ...mapMutations([
      // 'joinLobby',
      'clearLobby'
    ])
  },
  data: () => ({
    chatMessage: '',
    chatMessages: [{
      content: 'Cras justo odio'
    }, {
      content: 'Dapibus ac facilisis in'
    }, {
      content: 'Vestibulum at eros'
    }]
  }),
  mounted() {
    window.onbeforeunload = () => {
      this.$socket.emit('leaveLobby', { lobbyId: this.lobbyId, userId: this.user.id });
      this.clearLobby();
    };
  },
  beforeRouteEnter(to, from, next) {
    store.dispatch('getLobby', { lobbyId: to.params.id });
    next();
    // this.joinLobby({ lobbyId: this.$route.params.id });
    // console.log(this.$route.params.id);
  },
  beforeRouteLeave(to, from, next) {
    this.$socket.emit('leaveLobby', { lobbyId: this.lobbyId, userId: this.user.id });
    this.clearLobby();
    next();
  }
};
</script>

<style lang="scss">
.lobby {
  padding-top: 2rem;
}
</style>
