<template>
  <div class="chat d-flex flex-column" v-if="store.state.activeRoom">
    <div class="chat-header chat-container-light p-2 mb-auto">
      <img :src="store.state.activeUser.avatar" alt="avatar" class="avatar" />
      <span class="ms-3">
        {{ store.state.activeUser.username }}
      </span>
    </div>
    <div class="chat-body px-2" id="chat-body" @scroll="handleScroll">
      <div v-for="message in store.state.messages" :key="message.room">
        <Message :message="message" />
      </div>
    </div>
    <div class="chat-input mt-auto d-flex">
      <input
        type="text"
        v-model="chatInput"
        class="p-2 m-1"
        @keydown.enter="sendMessage"
      />
      <button class="btn btn-sm text-white" @click="sendMessage">
        <i class="fa-solid fa-paper-plane-top">Send</i>
      </button>
    </div>
  </div>
  <div v-else>
    <div class="w-100 h-100 text-center">
      <p class="text-muted"><i>
        No messages <br>
        <span>All messages are stored in the server, Please do not share any credentials or contact information</span>
        </i></p>
    </div>
  </div>
</template>


<script>
import Message from "./Message.vue";

export default {
  name: "Chat",
  components: { Message },
  inject: ["store"],
  data() {
    return {
      chatInput: "",
    };
  },
  methods: {
    sendMessage:function(){
      this.store.commands.sendChatMessage(this.chatInput);
      this.chatInput = "";
    }
  },
};
</script>

<style scoped>
.chat {
  width: 100%;
  height: 100%;
}
.chat-body {
  overflow: hidden scroll;
  scrollbar-width: thin;
  height: 100%;
}

.chat-input input {
  background-color: #202223;
  color: #fff;
  overflow: hidden;
  box-sizing: content-box;
  resize: none;
  width: 100%;
  min-height: 20px;
  height: 20px;
  outline: 0;
  border: 1px solid #fff;
  border-radius: 10px;
  padding: 5px 0px 5px 0px;
}

.avatar {
  width: 50px;
  border: solid 1px rgba(255, 255, 255, 0.377);
  border-radius: 5rem;
}
</style>