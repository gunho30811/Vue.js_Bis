<template>
  <div class="Search">
    <Search />
    <HelloWorld />
  </div>
</template>

<script>
import Search from '@/components/SearchBis.vue'
import Hello from '../components/HelloWorld.vue'
export default {
  name: 'SearchBis',
  components: {
    Search,
    Hello
}
}

</script>
