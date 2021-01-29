<template>
  <div class="players">
    <b-form class="data">
      <div class="margin-bottom">
        <label for="number">Players:</label>
        <b-form-spinbutton id="number" size="sm" v-model="players" inline wrap min="4" max="10" placeholder="--"></b-form-spinbutton>
      </div>
      <div v-if="!missingName" class="margin-bottom">
        <b-form-checkbox
          id="checkbox-1"
          v-model="status"
          name="checkbox-1"
          value='accepted'
          unchecked-value='not_accepted'
        >
          Select teams at random
        </b-form-checkbox>
      </div>
      <div v-if="status == 'not_accepted'">
        <div class="container-row shadow-border">
          <div class="team">WHITE TEAM</div>
          <div class="container-column">
            <div class="spacing">
              <b-form-input class="alignment" v-model="white[0]" size="sm" placeholder="Player 1"></b-form-input>
            </div>
            <div class="spacing">
              <b-form-input class="alignment" v-model="white[1]" size="sm" placeholder="Player 2"></b-form-input>
            </div>
            <div v-if="players > 4" class="spacing">
              <b-form-input class="alignment" v-model="white[2]" size="sm" placeholder="Player 3"></b-form-input>
            </div>
            <div v-if="players > 6" class="spacing">
              <b-form-input class="alignment" v-model="white[3]" size="sm" placeholder="Player 4"></b-form-input>
            </div>
            <div v-if="players > 8" class="spacing">
              <b-form-input class="alignment" v-model="white[4]" size="sm" placeholder="Player 5"></b-form-input>
            </div>
          </div>
        </div>
        <div class="container-row shadow-border dark">
          <div class="team">BLACK TEAM</div>
          <div class="container-column">
            <div class="spacing">
              <b-form-input class="alignment" v-model="black[0]" size="sm" placeholder="Player 1"></b-form-input>
            </div>
            <div class="spacing">
              <b-form-input class="alignment" v-model="black[1]" size="sm" placeholder="Player 2"></b-form-input>
            </div>
            <div v-if="players > 5" class="spacing">
              <b-form-input class="alignment" v-model="black[2]" size="sm" placeholder="Player 3"></b-form-input>
            </div>
            <div v-if="players > 7" class="spacing">
              <b-form-input class="alignment" v-model="black[3]" size="sm" placeholder="Player 4"></b-form-input>
            </div>
            <div v-if="players > 9" class="spacing">
              <b-form-input class="alignment" v-model="black[4]" size="sm" placeholder="Player 5"></b-form-input>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="container-row">
          <div class="container-column">
            <div class="spacing">
              <b-form-input class="alignment" v-model="random[0]" size="sm" placeholder="Player 1"></b-form-input>
            </div>
            <div class="spacing">
              <b-form-input class="alignment" v-model="random[1]" size="sm" placeholder="Player 2"></b-form-input>
            </div>
            <div class="spacing">
              <b-form-input class="alignment" v-model="random[2]" size="sm" placeholder="Player 3"></b-form-input>
            </div>
            <div class="spacing">
              <b-form-input class="alignment" v-model="random[3]" size="sm" placeholder="Player 4"></b-form-input>
            </div>
            <div v-if="players > 4" class="spacing">
              <b-form-input class="alignment" v-model="random[4]" size="sm" placeholder="Player 5"></b-form-input>
            </div>
            <div v-if="players > 5" class="spacing">
              <b-form-input class="alignment" v-model="random[5]" size="sm" placeholder="Player 6"></b-form-input>
            </div>
            <div v-if="players > 6" class="spacing">
              <b-form-input class="alignment" v-model="random[6]" size="sm" placeholder="Player 7"></b-form-input>
            </div>
            <div v-if="players > 7" class="spacing">
              <b-form-input class="alignment" v-model="random[7]" size="sm" placeholder="Player 8"></b-form-input>
            </div>
            <div v-if="players > 8" class="spacing">
              <b-form-input class="alignment" v-model="random[8]" size="sm" placeholder="Player 9"></b-form-input>
            </div>
            <div v-if="players > 9" class="spacing">
              <b-form-input class="alignment" v-model="random[9]" size="sm" placeholder="Player 10"></b-form-input>
            </div>
          </div>
        </div>
      </div>
    </b-form>
    <div class="continue-button">
      <b-button variant="outline-dark" v-on:click="checkPlayers ()">Continue</b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'players',
  data () {
    return {
      players: 6,
      status: 'not_accepted',
      missingName: true,
      randomControl: false,
      flag: 0,
      white: ['', '', '', '', '', ''],
      black: ['', '', '', '', '', ''],
      random: ['', '', '', '', '', '', '', '', '', '']
    }
  },
  watch: {
    status: function () {
      if (this.status === 'accepted') {
        this.sizingTeams()
        this.random = []
        this.random = this.random.concat(this.white, this.black)
      } else {
        let control = Math.ceil(this.players / 2)
        for (let i in this.random) {
          if (i < control) this.white[i] = this.random[i]
          else this.black[i] = this.random[i]
        }
      }
    },
    players: function () {
      let control = Math.ceil(this.players / 2)
      if (this.status === 'accepted') {
        for (let i = 0; i < this.players; i++) {
          this.flag = this.random[i] === '' ? this.flag++ : this.flag
        }
      } else {
        for (let i = 0; i < control; i++) {
          this.flag = this.white[i] === '' ? this.flag++ : this.flag
        }
        control = Math.floor(this.players / 2)
        for (let i = 0; i < control; i++) {
          this.flag = this.black[i] === '' ? this.flag++ : this.flag
        }
      }
      this.missingName = this.flag > 0
      this.flag = 0
    }
  },
  methods: {
    checkPlayers () {
      this.randomControl = this.status === 'accepted'
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
        console.log('White: ' + this.white)
        console.log('Black: ' + this.black)
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
      console.log('White: ' + this.white)
      console.log('Black: ' + this.black)
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
      console.log('White: ' + this.white)
      console.log('Black: ' + this.black)
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
      this.$router.push('/words')
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
  background-color: #000;
  margin-top: 1vh;
}

.spacing{
  margin: 0.2vh;
}

.alignment{
  text-align: center;
}

.continue-button{
  background-color: #FFF; 
  border-radius: 10px; 
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px; 
  width: 80%; 
  margin: 0 auto; 
  padding: 3%; 
  -webkit-box-shadow: 5px 5px #CCC; 
  box-shadow: 5px 5px #CCC;
}
</style>
