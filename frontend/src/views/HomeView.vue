<template>
  <div class="home">
    아 헬로우 안쓰네 ㅋㅋ;
    <Login />
    <Hello />
  </div>
</template>

<script>
import Login from '../components/LoginBis.vue'
import Hello from '../components/HelloWorld.vue'
export default {
  name: 'HomeBis',
  components: {
    Login, Hello
  }
}
</script>
