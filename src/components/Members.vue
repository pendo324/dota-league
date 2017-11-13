<template>
  <div class="col-4 members">
    <ul class="list-group memberList">
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

<style lang="scss">
.members {
  padding-left:0px;
}

.memberList > li {
  background-color: #343a40;
}
</style>
