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
      <div class="background-hold container-column">
        <h6>Team: {{ currentTeam }}</h6>
        <h6>Player: {{ currentPlayer }}</h6>
      </div>
    </div>
    <div v-else class="container-column height-content">
      <div class="background-hold container-column">
        <div><h5 v-if="show">{{ currentWord }}</h5></div>
      </div>
      <div class="background-hold" v-touch:start="startHandler" v-touch:end="endHandler">
        <h6>Reveal word:</h6>
        <h6 class="fingerprint-icon material-icons">fingerprint</h6>
      </div>
      <div style="display: flex; flex-direction: row;">
        <div class="background-hold-row">
          <Timer />
        </div>
        <div class="background-hold-row">
          <b-button variant="outline-dark" v-on:click="goItRight">
            Got it right 
            <b-icon icon="check2-all">
          </b-icon></b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Timer from '@/components/Timer'
export default {
  name: 'game',
  components: {
    Timer
  },
  props: ['allWords', 'black', 'white'],
  data () {
    return {
      setting: true,
      show: false,
      round: 1,
      currentWord: '',
      currentTeam: 'white',
      currentPlayer: ''
    }
  },
  mounted: function () {
    this.randomAllWords()
    this.currentPlayer = this.white[0]
    this.currentWord = this.allWords[0]
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
    },
    randomAllWords () {
      // Fisher-Yates shuffle algorithm
      let indexLength = this.allWords.length
      if (indexLength === 0) return false
      while (--indexLength) {
        let indexRandom = Math.floor(Math.random() * (indexLength + 1))
        let temporaryLength = this.allWords[indexLength]
        let temporaryRandom = this.allWords[indexRandom]
        this.allWords[indexLength] = temporaryRandom
        this.allWords[indexRandom] = temporaryLength
      }
    },
    goItRight () {
      let team = this.currentTeam
      let player = this.currentPlayer
      let word = this.currentWord
      if (team === 'white') {
        let playerPosition = this.white.indexOf(player)
        console.log(word, playerPosition)
      } else console.log(word)
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

.background-hold-row{
  background-color: #FFF; 
  border-radius: 10px; 
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px; 
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
