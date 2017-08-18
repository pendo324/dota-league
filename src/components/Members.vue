<template>
  <div class="col-4" style="padding-left:0px;">
    <ul class="list-group">
      <li class="list-group-item" v-for="member in lobbyMembers"><img :src="member.avatar">{{member.displayName}}</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'members',
  computed: {
    ...mapGetters([
      'lobbyMembers'
    ])
  }
};
</script>

<style>

</style>
