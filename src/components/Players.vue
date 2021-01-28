<template>
  <div class="players">
    <b-form class="data">
      <div class="margin-bottom">
        <label for="number">Players:</label>
        <b-form-spinbutton id="number" size="sm" v-model="value" inline wrap min="4" max="10" placeholder="--"></b-form-spinbutton>
      </div>
      <div class="margin-bottom">
        <b-form-checkbox id="method" v-model="method" name="method" value="true" unchecked-value="false">
          Random team
        </b-form-checkbox>
      </div>
      <div class="container-row">
        <div class="team">WHITE TEAM</div>
        <div class="container-column">
          <div class="spacing"><b-form-input v-model="white.player1" size="sm" placeholder="Player 1"></b-form-input></div>
          <div class="spacing"><b-form-input v-model="white.player1" size="sm" placeholder="Player 2"></b-form-input></div>
          <div class="spacing"><b-form-input v-model="white.player1" size="sm" placeholder="Player 3"></b-form-input></div>
          <div class="spacing"><b-form-input v-model="white.player1" size="sm" placeholder="Player 4"></b-form-input></div>
          <div class="spacing"><b-form-input v-model="white.player1" size="sm" placeholder="Player 5"></b-form-input></div>
        </div>
      </div>
      <div class="container-row dark">
        <div class="team">BLACK TEAM</div>
        <div class="container-column">
          <div class="spacing"><b-form-input v-model="black.player1" size="sm" placeholder="Player 1"></b-form-input></div>
          <div class="spacing"><b-form-input v-model="black.player1" size="sm" placeholder="Player 2"></b-form-input></div>
          <div class="spacing"><b-form-input v-model="black.player1" size="sm" placeholder="Player 3"></b-form-input></div>
          <div class="spacing"><b-form-input v-model="black.player1" size="sm" placeholder="Player 4"></b-form-input></div>
          <div class="spacing"><b-form-input v-model="black.player1" size="sm" placeholder="Player 5"></b-form-input></div>
        </div>
      </div>
    </b-form>
  </div>
</template>

<script>
export default {
  name: 'players',
  data () {
    return {
      value: 6,
      method: false,
      options: [
        { item: 0, name: 'Pick' },
        { item: 1, name: 'Random' }
      ],
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
      }
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
  -webkit-box-shadow: 2px 2px #CCC; 
  box-shadow: 2px 2px #CCC;
}

.container-column{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
</style>
