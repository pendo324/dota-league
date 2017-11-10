<template>
  <b-col :cols="expanded ? 12 : 10">
    <b-row>
      <b-col :cols="expanded ? 6 : 7">
        <PlayerInfo></PlayerInfo>
      </b-col>
      <router-view></router-view>
      <b-col v-if="!expanded" :cols="expanded ? 4 : 5">
        <Queue></Queue>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import PlayerInfo from './PlayerInfo';
import Queue from './Queue';

export default {
  components: {
    PlayerInfo,
    Queue
  },
  data() {
    return {
      expanded: false
    };
  },
  beforeRouteUpdate(to, from, next) {
    if (to.name === 'match') {
      this.$data.expanded = true;
    }
    if (to.name === 'queuing') {
      this.$data.expanded = false;
    }
    next();
  }
};
</script>

<style>

</style>
