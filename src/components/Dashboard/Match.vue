<template>
  <b-col cols="6">
    <b-card title="Teams">
      <div class="card-text">
        <b-row>
          <b-col cols="4">
            <h5>Dire</h5>
          </b-col>
          <b-col cols="4">
            <h5>Radiant</h5>
          </b-col>
          <b-col cols="4">
            <h5>Available</h5>
            <b-row v-for="player in lobbyMembers" :key="player.id">
              <b-col cols="12">
                <span>{{player.displayName}}</span>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
    </b-card>
  </b-col>
</template>

<script>
/**
 * TODO:
 *
 * When a player is selected, his info appears on the left
 * Show teams and players and let captains select players for their teams
 */

import { mapGetters } from 'vuex';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['lobbyMembers'])
  }
};
</script>

<style>

</style>
