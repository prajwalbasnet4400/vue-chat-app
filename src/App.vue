<template>
  <div class="container">
    <div class="row chat-container m-3 rounded" style="height: 80vh">
      <div class="col-4 p-0 d-flex flex-column h-100">
        <User />
        <Rooms />
      </div>
      <div class="col-8 p-0 h-100">
        <Chat />
      </div>
    </div>
  </div>
</template>

<script>
import User from "./components/User.vue";
import Rooms from "./components/Rooms.vue";
import Chat from "./components/Chat.vue";

export default {
  name: "App",
  inject: ["store"],
  components: {
    User,
    Rooms,
    Chat,
  },
  created: function () {
    let self = this;
    let state = this.store.state;
    let commands = this.store.commands;

    state.socket.onopen = () => {
      Notiflix.Notify.Success('Socket Connected')
      commands.getUser();
      commands.getRooms();
      self.store.handleQuery();
    };
    state.socket.onmessage = (event) => {
      this.store.handleMessage(event)
    };
    state.socket.onerror = (event) => {
      Notiflix.Notify.Failure('Socket Error')
    };
    state.socket.onclose = (event) => {
      Notiflix.Notify.Warning('Socket Closed')
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.chat-container {
  background-color: #131415;
  color: white;
}
.chat-container-light {
  background-color: #181a1b;
  color: white;
}
</style>
