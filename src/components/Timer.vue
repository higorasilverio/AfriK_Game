<template>
    <div>
        <vac :left-time="60000" :auto-start="false" ref="vac2" @finish="finish">
        <span
            slot="process"
            slot-scope="{ timeObj }">
            {{ timeObj.ceil.s }}
            </span>
            <span slot="finish">0</span>
        </vac>
    </div>
</template>

<script>
export default {
  name: 'timer',
  data () {
    return {}
  },
  mounted () {
    this.startCountdown()
  },
  methods: {
    startCountdown () {
      const vm = this
      vm.$refs.vac2.startCountdown(true)
    },
    finish () {
      this.$store.commit('UPDATE_TIMER_VERIFY', true)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
