<template>
  <b-card :title="user.displayName">
    <p class="card-text stat-container">
      <StatLine field="Winrate" value="77%"></StatLine>
      <StatLine field="Preferred Position" value="1"></StatLine>
      <StatLine field="Favorite Heroes" value="Storm Sprit, Lina, Mirana"></StatLine>
      <StatLine field="Dotabuff">
        <template slot="stat">
          <a href="#">Dotabuff</a>
        </template>
      </StatLine>
      <StatLine field="Partner in Crime">
        <template slot="stat">
          <router-link to="#">Other Dude</router-link>
          <span> (90% winrate)</span>
        </template>
      </StatLine>
      <StatLine field="Current Ladder">
        <template slot="stat">
          <router-link to="#">Pro League (Season 5)</router-link>
        </template>
      </StatLine>
      <StatLine field="Ladder Position" value="14"></StatLine>
      <StatLine field="Highest Ladder Position" value="5 (Pro League Season 4)"></StatLine>
      <StatLine field="More stats" value="More stats"></StatLine>
      <StatLine field="More stats" value="More stats"></StatLine>
    </p>
  </b-card>
</template>

<script>
import { mapGetters } from 'vuex';
import StatLine from './PlayerInfo/StatLine';

export default {
  name: 'PlayerInfo',
  components: { StatLine },
  computed: {
    ...mapGetters(['user'])
  }
};
</script>

<style lang="scss" scoped>
.stat-container > .row {
  padding-top: 10px;
}

.stat-container > .row:first-child {
  padding-top: 0px;
}
</style>
