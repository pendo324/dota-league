<template>
  <div class="home container-fluid">
    <div class="col-3" v-bind:class="{ 'col-8': $route.params.id }">
      <div class="card">
        <div class="card-header">
          {{ this.lobbyId ? this.lobbyId : 'Lobbies' }}
        </div>
        <div class="row lobby">
          <lobbyList v-bind:class="{ 'col-3': $route.params.id, 'col-12': !$route.params.id }"></lobbyList>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import LobbyList from './LobbyList';

export default {
  name: 'home',
  components: { LobbyList },
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
  computed: {
    ...mapGetters([
      'lobbies',
      'lobby',
      'lobbyId'
    ])
  },
  methods: {
    ...mapActions([
      'getLobbies'
    ])
  },
  mounted: function () {
    this.getLobbies();
    console.log(this.$route);
  }
};
</script>

<style lang="scss">
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.lobby * {
  border-radius: 0px !important;
}

.messageList {
  overflow: hidden;
  height: 150px;
  overflow-x: hidden;
}

.messageList:hover {
  overflow-y: scroll;
}

.messageList::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #F5F5F5;
}

.messageList::-webkit-scrollbar {
  width: 12px;
  background-color: #F5F5F5;
}

.messageList::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  background-color: #555;
}
</style>
