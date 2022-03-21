<template>
  <div class="chat-container-light rooms ms-2">
    <div v-for="room in store.state.rooms" :key="room.id">
      <Room :room="room" />
    </div>
  </div>
</template>


<script>
import Room from "./Room.vue";

export default {
  name: "Rooms",
  inject: ["store"],
  components: {
    Room,
  },
};
</script>

<style scoped>
.rooms {
  overflow-y: scroll;
  height: 100%;
  scrollbar-width: thin;
}
</style>