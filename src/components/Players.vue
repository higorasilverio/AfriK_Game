<template>
  <div class="players">
    <div class="message-top">
      <h3 class="main-color">{{ message[number].messageTop }}</h3>
    </div>
    <b-form class="data">
      <div v-if="configuration" class="margin-bottom">
        <label for="number">#Players:</label>
        <b-form-spinbutton id="number" size="sm" v-model="players" inline wrap min="4" max="10" placeholder="--" />
      </div>
      <div v-if="configuration" class="margin-bottom">
        <b-form-checkbox
          id="checkbox-1"
          v-model="choice"
          name="checkbox-1"
          value='random'
          unchecked-value='fixed'
        >
          Random
        </b-form-checkbox>
      </div>
      <div v-if="choice == 'fixed' && !configuration">
        <div class="container-row shadow-border">
          <div class="team">WHITE TEAM</div>
          <div class="container-column">
            <div class="spacing">
              <b-form-input v-on:keypress="nominate('w', 0, $event)"
                class="alignment" v-model="white[0]" size="sm" placeholder="Player 1" />
            </div>
            <div class="spacing">
              <b-form-input v-on:keypress="nominate('w', 1, $event)" 
                class="alignment" v-model="white[1]" size="sm" placeholder="Player 2" />
            </div>
            <div v-if="players > 4" class="spacing">
              <b-form-input v-on:keypress="nominate('w', 2, $event)" 
                class="alignment" v-model="white[2]" size="sm" placeholder="Player 3" />
            </div>
            <div v-if="players > 6" class="spacing">
              <b-form-input v-on:keypress="nominate('w', 3, $event)" 
                class="alignment" v-model="white[3]" size="sm" placeholder="Player 4" />
            </div>
            <div v-if="players > 8" class="spacing">
              <b-form-input v-on:keypress="nominate('w', 4, $event)" 
                class="alignment" v-model="white[4]" size="sm" placeholder="Player 5" />
            </div>
          </div>
        </div>
        <div class="container-row shadow-border dark">
          <div class="team">BLACK TEAM</div>
          <div class="container-column">
            <div class="spacing">
              <b-form-input v-on:keypress="nominate('b', 0, $event)" 
                class="alignment" v-model="black[0]" size="sm" placeholder="Player 1" />
            </div>
            <div class="spacing">
              <b-form-input v-on:keypress="nominate('b', 1, $event)" 
                class="alignment" v-model="black[1]" size="sm" placeholder="Player 2" />
            </div>
            <div v-if="players > 5" class="spacing">
              <b-form-input v-on:keypress="nominate('b', 2, $event)" 
                class="alignment" v-model="black[2]" size="sm" placeholder="Player 3" />
            </div>
            <div v-if="players > 7" class="spacing">
              <b-form-input v-on:keypress="nominate('b', 3, $event)" 
                class="alignment" v-model="black[3]" size="sm" placeholder="Player 4" />
            </div>
            <div v-if="players > 9" class="spacing">
              <b-form-input v-on:keypress="nominate('b', 4, $event)" 
                class="alignment" v-model="black[4]" size="sm" placeholder="Player 5" />
            </div>
          </div>
        </div>
      </div>
      <div v-if="choice == 'random' && !configuration">
        <div class="container-row">
          <div class="container-column">
            <div class="spacing">
              <b-form-input v-on:keypress="nominate('r', 0, $event)" 
                class="alignment" v-model="random[0]" size="sm" placeholder="Player 1" />
            </div>
            <div class="spacing">
              <b-form-input v-on:keypress="nominate('r', 1, $event)" 
                class="alignment" v-model="random[1]" size="sm" placeholder="Player 2" />
            </div>
            <div class="spacing">
              <b-form-input v-on:keypress="nominate('r', 2, $event)" 
                class="alignment" v-model="random[2]" size="sm" placeholder="Player 3" />
            </div>
            <div class="spacing">
              <b-form-input v-on:keypress="nominate('r', 3, $event)" 
                class="alignment" v-model="random[3]" size="sm" placeholder="Player 4" />
            </div>
            <div v-if="players > 4" class="spacing">
              <b-form-input v-on:keypress="nominate('r', 4, $event)" 
                class="alignment" v-model="random[4]" size="sm" placeholder="Player 5" />
            </div>
            <div v-if="players > 5" class="spacing">
              <b-form-input v-on:keypress="nominate('r', 5, $event)" 
                class="alignment" v-model="random[5]" size="sm" placeholder="Player 6" />
            </div>
            <div v-if="players > 6" class="spacing">
              <b-form-input v-on:keypress="nominate('r', 6, $event)" 
                class="alignment" v-model="random[6]" size="sm" placeholder="Player 7" />
            </div>
            <div v-if="players > 7" class="spacing">
              <b-form-input v-on:keypress="nominate('r', 7, $event)" 
                class="alignment" v-model="random[7]" size="sm" placeholder="Player 8" />
            </div>
            <div v-if="players > 8" class="spacing">
              <b-form-input v-on:keypress="nominate('r', 8, $event)" 
                class="alignment" v-model="random[8]" size="sm" placeholder="Player 9" />
            </div>
            <div v-if="players > 9" class="spacing">
              <b-form-input v-on:keypress="nominate('r', 9, $event)" 
                class="alignment" v-model="random[9]" size="sm" placeholder="Player 10" />
            </div>
          </div>
        </div>
      </div>
    </b-form>
    <div class="background-hold">
      <b-button v-if="!configuration" variant="dark" v-on:click="switchConfiguration ()">
        <b-icon icon="arrow-left"/> Config.
      </b-button>
      <b-button v-if="!configuration" variant="outline-dark" v-on:click="checkPlayers ()">
        {{ message[number].messageButton }} <b-icon icon="arrow-right"/>
      </b-button>
      <b-button v-else variant="outline-dark" v-on:click="switchConfiguration ()">
        {{ message[number].messageButton }} <b-icon icon="arrow-right"/>
      </b-button>
    </div>
    <b-modal id="confirm-teams" centered>
      <template #modal-title>
        <h4>Confirm teams?</h4>
      </template>
      <div class="shadow-border container-column rounded interna-spacing vh-bottom">
        <h5 class="vh-bottom">White</h5>
        <div class="container-row">
          <div class="player-highlight"><h6><b-icon icon="person"/> {{ white[0] }}</h6></div>
          <div class="player-highlight"><h6><b-icon icon="person"/> {{ white[1] }}</h6></div>
        </div>
        <div class="container-row">
          <div v-if="white[2]" class="player-highlight"><h6><b-icon icon="person"/> {{ white[2] }}</h6></div>
          <div v-if="white[3]" class="player-highlight"><h6><b-icon icon="person"/> {{ white[3] }}</h6></div>
        </div>
        <div class="container-row">
          <div v-if="white[4]" class="player-highlight"><h6><b-icon icon="person"/> {{ white[4] }}</h6></div>
        </div>
      </div>
      <div class="dark shadow-border container-column rounded interna-spacing vh-bottom">
        <h5 class="vh-bottom">Black</h5>
        <div class="container-row">
          <div class="player-highlight"><h6><b-icon icon="person"/> {{ black[0] }}</h6></div>
          <div class="player-highlight"><h6><b-icon icon="person"/> {{ black[1] }}</h6></div>
        </div>
        <div class="container-row">
          <div v-if="black[2]" class="player-highlight"><h6><b-icon icon="person"/> {{ black[2] }}</h6></div>
          <div v-if="black[3]" class="player-highlight"><h6><b-icon icon="person"/> {{ black[3] }}</h6></div>
        </div>
        <div class="container-row">
          <div v-if="black[4]" class="player-highlight"><h6><b-icon icon="person"/> {{ black[4] }}</h6></div>
        </div>
      </div>
      <template #modal-footer>
        <div class="background-hold">
          <b-button v-if="choice === 'random'" variant="dark" v-on:click="selectTeams ()">
            <b-icon icon="arrow-clockwise"/> Shuffle
          </b-button>
          <b-button variant="outline-dark" v-on:click="goToWords ()">
             OK <b-icon icon="arrow-right"/>
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'players',
  data () {
    return {
      players: 4,
      choice: 'fixed',
      configuration: true,
      randomControl: false,
      number: 0,
      message: [{messageTop: 'Configurations', messageButton: 'Names'}, {messageTop: 'Names', messageButton: 'Words'}],
      white: [],
      black: [],
      random: []
    }
  },
  watch: {
    white: function () {
      for (const key in this.white) {
        if (this.white[key]) this.white[key] = this.white[key].charAt(0).toUpperCase() + this.white[key].slice(1)
      }
    },
    black: function () {
      for (const key in this.black) {
        if (this.black[key]) this.black[key] = this.black[key].charAt(0).toUpperCase() + this.black[key].slice(1)
      }
    },
    random: function () {
      for (const key in this.random) {
        if (this.random[key]) this.random[key] = this.random[key].charAt(0).toUpperCase() + this.random[key].slice(1)
      }
    }
  },
  methods: {
    switchConfiguration () {
      this.white = ['', '', '', '', '', '']
      this.black = ['', '', '', '', '', '']
      this.random = ['', '', '', '', '', '', '', '', '', '']
      this.configuration = !this.configuration
      this.number = this.number === 0 ? 1 : 0
    },
    checkPlayers () {
      this.randomControl = this.choice === 'random'
      if (this.randomControl) {
        this.selectTeams()
      } else {
        this.sizingTeams()
        this.players % 2 === 0 ? this.verifyTeamsEven() : this.verifyTeamsOver()
      }
    },
    selectTeams () {
      this.white = []
      this.black = []
      let sequence = this.generateSequence()
      if (sequence) {
        for (let i = 0; i < this.players; i++) {
          if (i % 2 === 0) {
            this.white.push(this.random[sequence[i]])
          } else {
            this.black.push(this.random[sequence[i]])
          }
        }
        this.$bvModal.show('confirm-teams')
      }
    },
    verifyTeamsEven () {
      let validWhite = false
      let validBlack = false
      let count = this.players / 2
      for (let i = 0; i < count; i++) {
        validWhite = this.white[i] === ''
        validBlack = this.black[i] === ''
        if (validWhite || validBlack) {
          this.missingPlayers()
          return
        }
      }
      this.$bvModal.show('confirm-teams')
    },
    verifyTeamsOver () {
      let validWhite = false
      let validBlack = false
      let count = Math.floor((this.players / 2) + 1)
      for (let i = 0; i < count; i++) {
        validWhite = this.white[i] === ''
        if (validWhite) {
          this.missingPlayers()
          return
        }
      }
      count = Math.floor(this.players / 2)
      for (let i = 0; i < count; i++) {
        validBlack = this.black[i] === ''
        if (validBlack) {
          this.missingPlayers()
          return
        }
      }
      this.$bvModal.show('confirm-teams')
    },
    generateSequence () {
      let sequence = []
      for (let i = 0; i < this.players; i++) {
        if (this.random[i] === '') {
          this.missingPlayers()
          return
        }
        let randomNumber = this.getRandomIntInclusive(0, this.players - 1)
        while (sequence.includes(randomNumber)) {
          randomNumber = this.getRandomIntInclusive(0, this.players - 1)
        }
        sequence.push(randomNumber)
      }
      return sequence
    },
    getRandomIntInclusive (min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min + 1)) + min
    },
    missingPlayers (append = false) {
      this.$bvToast.toast('Name all players before continue!', {
        title: 'Missing player name',
        autoHideDelay: 3500,
        toaster: 'b-toaster-bottom-center',
        solid: true,
        variant: 'danger',
        appendToast: append
      })
    },
    sizingTeams () {
      let whiteTeamSize = Math.ceil(this.players / 2)
      let blackTeamSize = Math.floor(this.players / 2)
      this.white = this.white.slice(0, whiteTeamSize)
      this.black = this.black.slice(0, blackTeamSize)
    },
    goToWords () {
      this.$session.set('Teams', { 'white': this.white, 'black': this.black })
      this.$router.push('/words')
    },
    nominate (letter, number, event) {
      let char = String.fromCharCode(event.keyCode)
      if (/^[A-Za-záéíóúÁÉÍÓÚâêîôûÂÊÎÔÛãõÃÕ]+$/.test(char)) {
        switch (letter) {
          case 'w':
            if (this.white[number].split('').length >= 12) event.preventDefault()
            break
          case 'b':
            if (this.black[number].split('').length >= 12) event.preventDefault()
            break
          default:
            if (this.random[number].split('').length >= 12) event.preventDefault()
            break
        }
      } else event.preventDefault()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.players{
  min-height: 100%;
  min-width: 100%;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  text-align: center;
}

.data{
  background-color: #FFF; 
  border-radius: 10px; 
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px; 
  width: 80%; 
  height: 75  vh;
  margin: 0 auto; 
  padding: 3%; 
  -webkit-box-shadow: 5px 5px #CCC; 
  box-shadow: 5px 5px #CCC;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  text-align: center;
}

.container-row{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: auto 0;
  border-radius: 10px; 
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
}

.container-column{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.shadow-border{
  -webkit-box-shadow: 2px 2px #CCC; 
  box-shadow: 2px 2px #CCC;
}

.team{
  padding: 2vh 0;
}

.margin-bottom{
  margin-bottom: 1vh;
}

.dark{
  color: #fff;
  background-color: #343a40;
  margin-top: 1vh;
}

.spacing{
  margin: 0.2vh;
}

.interna-spacing{
  padding: 1vh;
}

.alignment{
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

.main-color{
  color: #343a40;
}

.rounded {
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
}

.player-highlight {
  border: 1px solid #CCC;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -webkit-box-shadow: 2px 2px #CCC; 
  box-shadow: 2px 2px #CCC;
  border-radius: 10px;
  padding: 0.5vh 1.5vh;
  margin: 0.5vh;
  width: 45%;
  text-align: center;
}

.player-highlight h6 {
  margin: 0.5rem 0;
  font-size: 0.9rem;
}

.vh-bottom {
  padding-bottom: 2vh;
}

.message-top {
  width: fit-content; 
  background-color: #fff; 
  margin: 0 auto; 
  padding: 2px 10px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -webkit-box-shadow: 2px 2px #CCC; 
  box-shadow: 2px 2px #CCC;
  border-radius: 10px;
}
</style>
