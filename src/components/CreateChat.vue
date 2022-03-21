<template>
  <div class="d-flex m-2" style="overflow-x:hidden;">
    <input type="text" v-model="steamid64" @keydown.enter="createchat" placeholder="steamid" />
    <button class="btn btn-sm btn-success ms-1" @keydown.enter="createchat">
      Create Chat
    </button>
  </div>
</template>


<script>
export default {
  name: "CreateChat",
  inject: ["store"],
  data() {
    return { steamid64: "" };
  },
  methods: {
    createchat: function (event) {
      this.store.commands.createChat(this.steamid64);
    },
  },
};
</script>

<style scoped>
input {
  color: white;
  padding: 5px;
  border-radius: 10px;
  border: #181a1b 1px solid;
  background-color: hsl(204, 6%, 13%);
}
input:active,
input:focus-within {
  color: white;
  border-radius: 10px;
  outline: none;
  border: #ffffff5d 1px solid;
  background-color: hsl(204, 6%, 13%);
}
</style>