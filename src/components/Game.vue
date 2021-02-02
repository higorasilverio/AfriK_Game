<template>
  <div class="game">
    <div v-if="setting">
      <div class="background-hold centered">
        <h4 class="main-color">We are all set to start!</h4>
        <h4 class="main-color">Are you ready?</h4>
      </div>
      <div class="background-hold centered" v-on:click="start">
        <h6 class="main-color">Click here to start playing</h6>
        <span class="fingerprint-icon material-icons">fingerprint</span>
      </div>
    </div>
    <div v-else class="container-column height-content">
      <div class="background-hold container-column">
        <h6>Team: White</h6>
        <h6>Player: Higor</h6>
      </div>
      <div class="background-hold container-column">
        <div><h5 v-if="show">{{ word }}</h5></div>
      </div>
      <div class="background-hold container-column" v-touch:start="startHandler" v-touch:end="endHandler">
        <h6>Reveal word:</h6>
        <h6 class="fingerprint-icon material-icons">fingerprint</h6>
      </div>
      <div class="background-hold">
        <span>Timer</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'game',
  props: ['allWords', 'black', 'white'],
  data () {
    return {
      setting: true,
      word: 'Orangotango',
      show: false
    }
  },
  methods: {
    start () {
      this.setting = false
    },
    startHandler () {
      this.show = true
    },
    endHandler () {
      this.show = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.game{
  min-height: 100%;
  min-width: 100%;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.background-hold{
  background-color: #FFF; 
  border-radius: 10px; 
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px; 
  width: 80%; 
  margin: 0 auto; 
  padding: 3%; 
  -webkit-box-shadow: 5px 5px #CCC; 
  box-shadow: 5px 5px #CCC;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.container-column{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.height-content {
  height: 70vh;
}

.centered{ 
  margin: 2vh auto; 
  flex-direction: column;
}

.main-color{
  color: #343a40;
}

.fingerprint-icon{
  font-size: 3rem;
}
</style>
