<template>
  <div class="w-100 chat-container-light">
    <div class="p-2">
      <img :src="user.avatar" class="avatar" alt="avatar" />
      <span class="s-0">
        {{ user.username }}
      </span>
    </div>
  </div>
</template>


<script>
export default {
  name: "User",
  inject: ["store"],
  data() {
    return {
      user: null,
    };
  },
  created() {
    this.user = this.store.state.user;
  },
};
</script>

<style scoped>
.avatar {
  width: 50px;
  border: solid 1px rgba(255, 255, 255, 0.377);
  border-radius: 5rem;
}
</style>