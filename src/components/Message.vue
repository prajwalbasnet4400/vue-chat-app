<template>
  <div class="d-flex">
    <div :class="{ownuser:store.state.user.steamid64==message.steamid64}" class="message">
      <span class="message-content" v-html="message.content">
      </span>
    </div>
  </div>
</template>


<script>
export default {
  name: "Message",
  inject:['store'],
  props: {
    message: Object,
  },
  mounted(){
    $('#chat-body').scrollTop(9999);
}
};
</script>

<style>
.message {
  margin: 5px;
  border: hsl(0, 0%, 30%) 1px solid;
  border-radius: 5rem;
}
.message-content {
  padding: 20px;
}
.ownuser {
  margin-left: auto;
  background-color: hsl(0, 0%, 30%);
}
</style>