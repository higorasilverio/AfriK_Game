<template>
  <div class="game">
    <div v-if="timer" class="background-hold-game">
      <div>
        <h4 class="main-color">Are you ready?</h4>
      </div>
      <div v-on:click="start">
        <h5 class="main-color">Press to play</h5>
        <span class="fingerprint-icon material-icons main-color">fingerprint</span>
      </div>
      <div v-bind:class="[currentTeam === 'White' ? 'wtclass' : 'btclass' ]">
        <h5>{{ currentTeam }} Team</h5>
        <h5><b-icon icon="person"/> {{ currentPlayer }}</h5>
      </div>
    </div>
    <div v-else class="background-hold-game">
      <div>
        <h6>Round score</h6>
        <div class="round-score-teams">
          <div class="score-white"><h6> White: {{whiteScore}}</h6></div>
          <h6>X</h6>
          <div class="score-black"><h6> Black: {{blackScore}}</h6></div>
        </div>
        <hr>
        <h6>Current player: {{ currentPlayer }}</h6>
      </div>
      <div class="current-word">
        <h5 v-if="show" class="main-color">{{ currentWord }}</h5>
        <h5 v-else class="main-color">?</h5>
      </div>
      <div v-touch:start="startHandler" v-touch:end="endHandler">
        <h5 class="main-color">Reveal word</h5>
        <h5 class="fingerprint-icon material-icons main-color">fingerprint</h5>
      </div>
      <div class="stopwatch-button">
        <div class="stopwatch-align">
            <div class="timer-align-style">
             <h2 class="main-color"><Timer /></h2>
            </div>
        </div>
        <div class="button-align">
          <b-button :disabled="nextPlayer" class="main-color" variant="outline-dark" v-on:click="gotItRight">
            Got it right 
            <b-icon icon="check2-all">
          </b-icon></b-button>
        </div>
      </div>
    </div>
    <b-modal id="modal-team-won" centered hide-footer hide-header no-close-on-backdrop no-close-on-esc>
      <div style="display: flex; flex-direction: column; justify-content: space-evenly; align-items: center;">
        <h5 class="main-color">Congratulations,</h5>
        <h2 class="main-color" style="margin: 5vh 0;">{{ champion }}</h2>
        <h5 class="main-color">You are AfriK champion!</h5>
        <b-button :disabled="disabled" variant="dark" style="margin: 5vh 0 2vh 0;" v-on:click="$router.push('/')">Play again</b-button>
      </div>
    </b-modal>
    <b-modal id="modal-draw-game" centered hide-footer hide-header no-close-on-backdrop no-close-on-esc>
      <div style="display: flex; flex-direction: column; justify-content: space-evenly; align-items: center;">
        <h2 class="main-color">It is a draw!</h2>
        <h5 class="main-color" style="margin: 5vh 0 0 0;">Play again to find out</h5>
        <h5 class="main-color" style="margin: 0 0 5vh 0;">who is the AfriK champion!</h5>
        <b-button :disabled="disabled" variant="dark" style="margin: 5vh 0 2vh 0;" v-on:click="$router.push('/')">Play again</b-button>
      </div>
    </b-modal>
    <b-modal id="modal-round-time" centered hide-footer hide-header no-close-on-backdrop no-close-on-esc>
      <div style="display: flex; flex-direction: column; justify-content: space-evenly; align-items: center;">
        <h2 class="main-color">{{ modalMessageHeader }}</h2>
        <h5 class="main-color" style="margin: 3vh 0 1vh 0;">Now, it is time for the </h5>
        <h3 class="main-color" style="margin: 0;">{{ currentTeam }} Team</h3>
        <h5 class="main-color" style="margin: 1vh 0 3vh 0;">{{ modalMessageFooter }}</h5>
        <b-button :disabled="disabled" variant="dark" style="margin: 5vh 0 2vh 0;" v-on:click="closeModal">
          Understood
        </b-button>
      </div>
    </b-modal>
    <audio id="correct-audio">
      <source src="../assets/correct.mp3" type="audio/mpeg">
    </audio>
    <audio id="draw-audio">
      <source src="../assets/draw.mp3" type="audio/mpeg">
    </audio>
    <audio id="endround-audio">
      <source src="../assets/endround.mp3" type="audio/mpeg">
    </audio>
    <audio id="timeisup-audio">
      <source src="../assets/timeisup.mp3" type="audio/mpeg">
    </audio>
    <audio id="won-audio">
      <source src="../assets/won.mp3" type="audio/mpeg">
    </audio>
    <audio id="alarm-audio">
      <source src="../assets/alarm.mp3" type="audio/mpeg">
    </audio>
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
      currentTeam: 'White',
      currentPlayer: '',
      timeControl: false,
      roundControl: false,
      disabled: true,
      nextPlayer: false,
      champion: '',
      modalMessageHeader: '',
      modalMessageFooter: ''
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
  watch: {
    timer: function () {
      if (this.timeControl === true) {
        this.timeControl = false
        this.currentTeam = this.currentTeam === 'White' ? 'Black' : 'White'
        this.currentPlayer = this.currentTeam === 'White' ? this.white[0] : this.black[0]
        if (this.roundControl === false) {
          this.playAudio('alarm')
          this.callModal(true)
        } else this.roundControl = false
      } else this.timeControl = true
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
      if (this.gameWords.length > 1) this.playAudio('correct')
      this.nextPlayer = true
      setTimeout(() => {
        this.nextPlayer = false
      }, 3000)
      this.currentTeam === 'White' ? this.whiteScore++ : this.blackScore++
      let toRemoveIndex = this.gameWords.findIndex(found => found === this.currentWord)
      if (toRemoveIndex > -1) this.gameWords.splice(toRemoveIndex, 1)
      this.checkRoundGame(this.gameWords.length)
      this.currentTeam === 'White' ? this.handleWhitePlayer() : this.handleBlackPlayer()
      this.currentWord = this.pickRandomWord()
    },
    checkRoundGame (length) {
      if (length === 0) {
        if (this.blackScore > this.whiteScore) this.blackRoundsWon++
        if (this.blackScore < this.whiteScore) this.whiteRoundsWon++
        this.whiteScore = 0
        this.blackScore = 0
        this.roundControl = true
        this.$store.commit('UPDATE_TIMER_VERIFY', true)
        this.round++
        if (this.round !== 4) {
          this.playAudio('endround')
          this.callModal(false)
          this.gameWords = this.$session.get('Words')
          this.randomAllWords()
          this.currentWord = this.pickRandomWord()
        }
      }
      if (this.round === 4) {
        if (this.blackRoundsWon > this.whiteRoundsWon) {
          this.playAudio('won')
          this.champion = 'Black Team'
          this.$bvModal.show('modal-team-won')
          this.buttonDisable()
        }
        if (this.blackRoundsWon < this.whiteRoundsWon) {
          this.playAudio('won')
          this.champion = 'White Team'
          this.$bvModal.show('modal-team-won')
          this.buttonDisable()
        }
        if (this.blackRoundsWon === this.whiteRoundsWon) {
          this.playAudio('draw')
          this.$bvModal.show('modal-draw-game')
          this.buttonDisable()
        }
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
    },
    callModal (isItTimer) {
      this.modalMessageHeader = isItTimer ? 'Time is up!' : 'Round is over!'
      this.modalMessageFooter = isItTimer ? 'to play!' : 'to play the next round!'
      this.$bvModal.show('modal-round-time')
      this.buttonDisable()
    },
    closeModal () {
      this.$bvModal.hide('modal-round-time')
      this.buttonDisable()
    },
    buttonDisable () {
      if (this.disabled === true) {
        setTimeout(() => {
          this.disabled = false
        }, 5000)
      } else this.disabled = true
    },
    playAudio (value) {
      if (value === 'correct') document.getElementById('correct-audio').play()
      if (value === 'draw') document.getElementById('draw-audio').play()
      if (value === 'endround') document.getElementById('endround-audio').play()
      if (value === 'timeisup') document.getElementById('timeisup-audio').play()
      if (value === 'won') document.getElementById('won-audio').play()
      if (value === 'alarm') document.getElementById('alarm-audio').play()
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

.background-hold-game{
  background-color: #FFF; 
  border-radius: 10px; 
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px; 
  min-width: 90%; 
  min-height: 70vh;
  margin: 0 auto; 
  padding: 3%; 
  -webkit-box-shadow: 5px 5px #CCC; 
  box-shadow: 5px 5px #CCC;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.wtclass {
  -webkit-box-shadow: 5px 5px 20px #CCC; 
  box-shadow: 5px 5px 20px #CCC;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  padding: 3%;
}

.btclass {
  background-color: #343a40;
  color: #FFF;
  -webkit-box-shadow: 5px 5px 20px #CCC;
  box-shadow: 5px 5px 20px #CCC;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  padding: 3%;
}

.current-word {
  border-radius: 10px; 
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px; 
  min-width: 80%; 
  min-height: 10vh;
  margin: 0 auto;
  -webkit-box-shadow: 5px 5px 20px #CCC;
  box-shadow: 5px 5px 20px #CCC;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.stopwatch-button {
  border-radius: 10px; 
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px; 
  min-width: 95%; 
  min-height: 15vh;
  -webkit-box-shadow: 5px 5px 20px #CCC;
  box-shadow: 5px 5px 20px #CCC;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.round-score {
  border-radius: 10px; 
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px; 
  min-width: 95%;
  -webkit-box-shadow: 5px 5px 20px #CCC;
  box-shadow: 5px 5px 20px #CCC;
  padding: 1vh 0;
}

.round-score-teams {
  display: flex; 
  flex-direction: row; 
  justify-content: space-around;
}

.score-black {
  padding: 1% 3%;
  background-color: #343a40;
  color: #FFF;
  border-radius: 10px; 
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -webkit-box-shadow: 2px 2px 10px #CCC;
  box-shadow: 2px 2px 10px #CCC;
}

.score-white {
  padding: 1% 3%;
  color: #343a40;
  border-radius: 10px; 
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -webkit-box-shadow: 2px 2px 10px #CCC;
  box-shadow: 2px 2px 10px #CCC;
}

.stopwatch-align {
  margin: auto 0;
  width: 9vh;
  height: 9vh;
  border: 2px solid #000;
  border-radius: 50%; 
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.button-align {
  margin: auto 0;
}

.timer-align-style {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.main-color{
  color: #343a40;
}

hr {
 width: 50%;
}

.fingerprint-icon{
  font-size: 3rem;
}
</style>
