<template>
  <b-container>
    <b-row style="justify-content: center">
      <router-view></router-view>
    </b-row>
    <b-modal id="queue-accept-modal" centered title="Bootstrap-Vue" v-model="matchReady">
      <p class="my-4">Vertically centered modal!</p>
      <template slot="modal-footer">
        <button type="button" class="btn btn-secondary" @click="decline">Decline</button>
        <button type="button" class="btn btn-primary" @click="accept">Accept</button>
      </template>
    </b-modal>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Queue from './Dashboard/Queue';
import PlayerInfo from './Dashboard/PlayerInfo';
import Party from './Dashboard/Party';

export default {
  components: {
    Queue,
    PlayerInfo,
    Party
  },
  computed: {
    ...mapGetters([
      'acceptQueueId',
      'matchReady'
    ])
  },
  methods: {
    ...mapActions([
      'acceptQueue'
    ]),
    accept() {
      this.$root.$emit('bv::hide::modal', 'queue-accept-modal');
      this.acceptQueue({ acceptQueueId: this.acceptQueueId });
    },
    decline() {
      this.$root.$emit('bv::hide::modal', 'queue-accept-modal');
    }
  }
};
</script>

<style>

</style>
