<template>
  <div class="players">
    <span>Words</span>
    <span>{{ black }}</span>
    <span>{{ white }}</span>
  </div>
</template>

<script>
export default {
  name: 'words',
  props: ['black', 'white'],
  data () {
    return {
      blackTeam: [],
      whiteTeam: []
    }
  },
  mounted () {
    console.log(this.black)
    console.log(this.white)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
