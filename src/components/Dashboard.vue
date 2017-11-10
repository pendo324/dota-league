<template>
  <b-container>
    <b-row style="justify-content: center">
      <router-view></router-view>
    </b-row>
    <b-modal id="queue-accept-modal" centered title="Bootstrap-Vue">
      <p class="my-4">Vertically centered modal!</p>
    </b-modal>
  </b-container>
</template>

<script>
import Queue from './Dashboard/Queue';
import PlayerInfo from './Dashboard/PlayerInfo';
import Party from './Dashboard/Party';

export default {
  components: {
    Queue,
    PlayerInfo,
    Party
  }
};
</script>

<style>

</style>
