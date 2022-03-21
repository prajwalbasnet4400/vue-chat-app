<template>
  <div>
    <div
      v-for="user in room.user"
      :key="user.steamid64"
      @click="changeActiveRoom(user)"
    >
      <div
        class="p-2 m-1 rounded room"
        :class="{ active: isActive() }"
        v-if="user.steamid64 != store.state.user.steamid64"
      >
        <img :src="user.avatar" alt="avatar" class="avatar" />
        {{ user.username }}
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "Room",
  inject: ["store"],
  props: {
    room: Object,
  },
  methods: {
    changeActiveRoom: function () {
      if (this.store.state.activeRoom != this.room.id) {
        this.store.commands.makeActiveRoom(this.room.id);
      }
    },
    isActive: function () {
      return this.room.id == this.store.state.activeRoom;
    },
  },
};
</script>

<style scoped>
.room {
  /* background-color: hsl(204, 6%, 10%); */
  transition: 200ms;
  cursor: pointer;
}
.room:hover {
  background-color: hsl(204, 6%, 15%);
  transition: 200ms;
}

.active {
  background-color: hsl(204, 6%, 13%);
  transition: 200ms;
}
.avatar {
  width: 40px;
  border-radius: 5rem;
  border: #242729 1px solid;
}
</style>