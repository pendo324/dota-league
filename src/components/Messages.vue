<template>
  <div class="col-8 messages">
    <ul class="list-group messageList">
      <li class="list-group-item" v-for="chatMessage in chatMessages" :key="chatMessage.sent + chatMessage.userId">
        <span class="timestamp">[{{format(chatMessage.sent)}}]</span><span class="sender">{{chatMessage.displayName}}:</span><span class="content">{{chatMessage.content}}</span></li>
    </ul>
    <form v-on:submit.prevent="addChatMessage">
      <input type="text" class="form-control" v-model="chatMessage">
    </form>
  </div>
</template>

<script>
import { debounce } from 'lodash-es';
import { mapActions, mapGetters } from 'vuex';
import moment from 'moment';

export default {
  name: 'messages',
  data: () => ({
    chatMessage: ''/* ,
    chatMessages: [{
      content: 'Cras justo odio'
    }, {
      content: 'Dapibus ac facilisis in'
    }, {
      content: 'Vestibulum at eros'
    }] */
  }),
  computed: {
    ...mapGetters([
      'lobbyId',
      'chatMessages',
      'user'
    ])
  },
  sockets: {
    // userJoined(data) {
    //   console.log(data);
    // },

    // userLeft(data) {
    //   console.log(data);
    // }
    newMessage() {
      this.scrollToBottom();
    }
  },
  methods: {
    ...mapActions([
      'getMessages'
    ]),
    format(date) {
      return moment(new Date(date)).format('h:mm:ss A');
    },
    scrollToBottom() {
      debounce((scrollTo) => {
        if (document.getElementsByClassName('messageList').length > 0) {
          scrollTo(document.getElementsByClassName('messageList')[0].lastChild, 10, {
            container: '.messageList',
            easing: 'ease-in'
          });
        }
      }, 100)(this.$scrollTo);
    },
    addChatMessage() {
      this.$socket.emit('newMessage', { id: this.lobbyId, message: this.chatMessage });
      this.chatMessage = '';
      this.scrollToBottom();
    }
  },
  updated() {
    this.scrollToBottom();
  }
};
</script>

<style>
.timestamp {
  display: inline-block;
  margin-right: .5em;
}

.sender {
  display: inline-block;
  margin-right: .5em;
  font-weight: bold;
}

.messages { 
  padding-right:0px;
}

.messageList {
  background-color: #343a40;
}

.messages > * > input {
  background-color: #343a40;
  border-color: #343a40;
  color: #b0b3be;
}

.messages > * > input:focus {
  background-color: #343a40;
  color: #b0b3be;
}

.messageList > li {
  background-color: #343a40;
}
</style>
