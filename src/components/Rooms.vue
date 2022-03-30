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

.rooms::-webkit-scrollbar {
  width: 5px;
}
 
.rooms::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
 
.rooms::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: 1px solid slategrey;
}



</style>