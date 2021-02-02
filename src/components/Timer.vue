<template>
    <div>
        <vac :left-time="60000" :auto-start="false" ref="vac2" @start="start">
        <span
            slot="process"
            slot-scope="{ timeObj }">
            {{ timeObj.ceil.s }}
            </span>
            <span slot="finish">Done!</span>
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
    start () {
      console.log('start')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
