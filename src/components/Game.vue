<template>
  <div class="game">
    <div v-if="timer">
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
          <b-button variant="outline-dark" v-on:click="gotItRight">
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
  data () {
    return {
      show: false,
      gameWords: [],
      round: 1,
      whiteScore: 0,
      blackScore: 0,
      whiteRoundsWon: 0,
      blackRoundsWon: 0,
      currentWord: '',
      currentTeam: 'white',
      currentPlayer: ''
    }
  },
  mounted: function () {
    this.white = this.$session.get('Teams').white
    this.black = this.$session.get('Teams').black
    this.gameWords = this.$session.get('Words')
    this.randomAllWords()
    this.currentPlayer = this.white[0]
    this.currentWord = this.pickRandomWord()
  },
  computed: {
    timer () {
      return this.$store.state.timerVerify
    }
  },
  methods: {
    start () {
      this.$store.commit('UPDATE_TIMER_VERIFY', false)
    },
    startHandler () {
      this.show = true
    },
    endHandler () {
      this.show = false
    },
    randomAllWords () {
      // Fisher-Yates shuffle algorithm
      let indexLength = this.gameWords.length
      if (indexLength === 0) return false
      while (--indexLength) {
        let indexRandom = Math.floor(Math.random() * (indexLength + 1))
        let temporaryLength = this.gameWords[indexLength]
        let temporaryRandom = this.gameWords[indexRandom]
        this.gameWords[indexLength] = temporaryRandom
        this.gameWords[indexRandom] = temporaryLength
      }
    },
    pickRandomWord () {
      return this.gameWords[Math.floor(Math.random() * this.gameWords.length)]
    },
    gotItRight () {
      this.currentTeam === 'white' ? this.whiteScore++ : this.blackScore++
      let toRemoveIndex = this.gameWords.findIndex(found => found === this.currentWord)
      if (toRemoveIndex > -1) this.gameWords.splice(toRemoveIndex, 1)
      this.checkRoundGame(this.gameWords.length)
      this.currentTeam === 'white' ? this.handleWhitePlayer() : this.handleBlackPlayer()
      this.currentWord = this.pickRandomWord()
    },
    checkRoundGame (length) {
      if (length === 0) {
        this.blackScore > this.whiteScore ? this.blackRoundsWon++ : this.whiteRoundsWon++
        this.whiteScore = 0
        this.blackScore = 0
        this.$store.commit('UPDATE_TIMER_VERIFY', true)
        this.round++
        if (this.round !== 4) {
          alert('Round over')
          this.currentTeam = this.currentTeam === 'white' ? 'black' : 'white'
          this.currentPlayer = this.currentTeam === 'white' ? this.white[0] : this.black[0]
          this.gameWords = this.$session.get('Words')
          this.randomAllWords()
          this.currentWord = this.pickRandomWord()
        }
      }
      if (this.round === 4) {
        if (this.blackRoundsWon > this.whiteRoundsWon) console.log('Black Team Won!')
        if (this.blackRoundsWon < this.whiteRoundsWon) console.log('White Team Won!')
        if (this.blackRoundsWon === this.whiteRoundsWon) console.log('It is a Draw!')
        alert('Game Over')
      }
    },
    handleWhitePlayer () {
      let whitePlayerIndex = this.white.findIndex(found => found === this.currentPlayer)
      this.currentPlayer =
        this.white.length === whitePlayerIndex + 1 ? this.currentPlayer = this.white[0] : this.white[whitePlayerIndex + 1]
    },
    handleBlackPlayer () {
      let blackPlayerIndex = this.black.findIndex(found => found === this.currentPlayer)
      this.currentPlayer =
        this.black.length === blackPlayerIndex + 1 ? this.currentPlayer = this.black[0] : this.black[blackPlayerIndex + 1]
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
