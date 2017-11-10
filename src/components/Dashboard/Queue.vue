<template>
  <b-card title="Queue">
    <div class="card-text">
      <b-button variant="outline-secondary" class="queue-button" @click="queuing=!queuing">
        <template v-if="!queuing">
          Join Queue
        </template>
        <template v-if="queuing">
          Cancel Queue
        </template>
      </b-button>
      <div class="stat-container">
        <template v-if="queuing">
          <StatLine field="Position in Queue" value="14" left="7" right="5"></StatLine>
          <StatLine field="Players Queuing" value="19" left="7" right="5"></StatLine>
          <hr/>
        </template>
        <StatLine field="Total Queuing" value="19" left="7" right="5"></StatLine>
        <StatLine field="Total Online" value="37" left="7" right="5"></StatLine>
        <StatLine field="Estimated Wait Time" value="5 mins" left="7" right="5"></StatLine>
      </div>
      <b-button v-b-modal.modal-center @click="toggleModal">
        Toggle Modal
      </b-button>
    </div>
  </b-card>
</template>

<script>
import StatLine from './PlayerInfo/StatLine';

export default {
  components: {
    StatLine
  },
  data() {
    return {
      queuing: false,
      modal: false
    };
  },
  methods: {
    toggleModal() {
      if (this.modal) {
        this.$root.$emit('bv::show::modal', 'queue-accept-modal');
      } else {
        this.$root.$emit('bv::show::modal', 'queue-accept-modal');
      }
      this.modal = !this.modal;
    },
    showModal() {
      this.modal = !this.modal;
      this.$root.$emit('bv::show::modal', 'queue-accept-modal');
    },
    hideModal() {
      this.modal = !this.modal;
      this.$root.$emit('bv::hide::modal', 'queue-accept-modal');
    }
  }
};
</script>

<style lang="scss" scoped>
.queue-button {
  margin-bottom: 0.75rem;
}

.stat-container > .row {
  padding-top: 10px;
}

.stat-container > .row:first-child {
  padding-top: 0px;
}

hr {
  border-top-color: #b0b3be;
}

button:focus {
  outline: none;
  box-shadow: none;
}

</style>
