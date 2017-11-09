<template>
  <div>
    <ul class="list-group">
      <router-link v-for="lobby in lobbies" :key="lobby.id" class="list-group-item list-group-item-action" active-class="active" :to="{ name: 'lobby', params: { id: lobby.id }}">{{lobby.name}}</router-link>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'lobbyList',
  computed: {
    ...mapGetters([
      'lobbies'
    ])
  },
  methods: {
    ...mapMutations([
      'joinLobby'
    ])
  }
};
</script>

<style>

</style>
