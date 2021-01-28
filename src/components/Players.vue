<template>
  <div class="players">
    <b-form class="data">
      <div class="margin-bottom">
        <label for="number">Players:</label>
        <b-form-spinbutton id="number" size="sm" v-model="players" inline wrap min="4" max="10" placeholder="--"></b-form-spinbutton>
      </div>
      <div class="margin-bottom">
        <b-form-checkbox
          id="checkbox-1"
          v-model="status"
          name="checkbox-1"
          value="accepted"
          unchecked-value="not_accepted"
        >
          Select teams at random
        </b-form-checkbox>
      </div>
      <div v-if="status == 'not_accepted'">
        <div class="container-row shadow-border">
          <div class="team">WHITE TEAM</div>
          <div class="container-column">
            <div class="spacing"><b-form-input class="alignment" v-model="white.player1" size="sm" placeholder="Player 1"></b-form-input></div>
            <div class="spacing"><b-form-input class="alignment" v-model="white.player2" size="sm" placeholder="Player 2"></b-form-input></div>
            <div v-if="players > 4" class="spacing"><b-form-input class="alignment" v-model="white.player3" size="sm" placeholder="Player 3"></b-form-input></div>
            <div v-if="players > 6" class="spacing"><b-form-input class="alignment" v-model="white.player4" size="sm" placeholder="Player 4"></b-form-input></div>
            <div v-if="players > 8" class="spacing"><b-form-input class="alignment" v-model="white.player5" size="sm" placeholder="Player 5"></b-form-input></div>
          </div>
        </div>
        <div class="container-row shadow-border dark">
          <div class="team">BLACK TEAM</div>
          <div class="container-column">
            <div class="spacing"><b-form-input class="alignment" v-model="black.player1" size="sm" placeholder="Player 1"></b-form-input></div>
            <div class="spacing"><b-form-input class="alignment" v-model="black.player2" size="sm" placeholder="Player 2"></b-form-input></div>
            <div v-if="players > 5" class="spacing"><b-form-input class="alignment" v-model="black.player3" size="sm" placeholder="Player 3"></b-form-input></div>
            <div v-if="players > 7" class="spacing"><b-form-input class="alignment" v-model="black.player4" size="sm" placeholder="Player 4"></b-form-input></div>
            <div v-if="players > 9" class="spacing"><b-form-input class="alignment" v-model="black.player5" size="sm" placeholder="Player 5"></b-form-input></div>
          </div>
        </div>
      </div>
      <div v-if="status == 'accepted'">
        <div class="container-row">
          <div class="container-column">
            <div class="spacing"><b-form-input class="alignment" v-model="random.player1" size="sm" placeholder="Player 1"></b-form-input></div>
            <div class="spacing"><b-form-input class="alignment" v-model="random.player2" size="sm" placeholder="Player 2"></b-form-input></div>
            <div class="spacing"><b-form-input class="alignment" v-model="random.player3" size="sm" placeholder="Player 3"></b-form-input></div>
            <div class="spacing"><b-form-input class="alignment" v-model="random.player4" size="sm" placeholder="Player 4"></b-form-input></div>
            <div v-if="players > 4" class="spacing"><b-form-input class="alignment" v-model="random.player5" size="sm" placeholder="Player 5"></b-form-input></div>
            <div v-if="players > 5" class="spacing"><b-form-input class="alignment" v-model="random.player6" size="sm" placeholder="Player 6"></b-form-input></div>
            <div v-if="players > 6" class="spacing"><b-form-input class="alignment" v-model="random.player7" size="sm" placeholder="Player 7"></b-form-input></div>
            <div v-if="players > 7" class="spacing"><b-form-input class="alignment" v-model="random.player8" size="sm" placeholder="Player 8"></b-form-input></div>
            <div v-if="players > 8" class="spacing"><b-form-input class="alignment" v-model="random.player9" size="sm" placeholder="Player 9"></b-form-input></div>
            <div v-if="players > 9" class="spacing"><b-form-input class="alignment" v-model="random.player10" size="sm" placeholder="Player 10"></b-form-input></div>
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
      white: {
        player1: '',
        player2: '',
        player3: '',
        player4: '',
        player5: ''
      },
      black: {
        player1: '',
        player2: '',
        player3: '',
        player4: '',
        player5: ''
      },
      random: {
        player1: '',
        player2: '',
        player3: '',
        player4: '',
        player5: '',
        player6: '',
        player7: '',
        player8: '',
        player9: '',
        player10: ''
      }
    }
  },
  methods: {
    checkPlayers (append = false) {
      if (status === 'accepted') {
        this.$bvToast.toast(`Toast accept`, {
          title: 'Toast accept',
          autoHideDelay: 5000,
          appendToast: append
        })
      } else {
        this.$bvToast.toast(`Toast not_accept`, {
          title: 'Toast not_accept',
          autoHideDelay: 5000,
          appendToast: append
        })
      }
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
