<template>
  <div class="hello">
    <play></play>
  </div>
</template>

<script>
import play from '@/components/Play'
export default {
  name: 'hello',
  components: {
    play
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js PWA'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
