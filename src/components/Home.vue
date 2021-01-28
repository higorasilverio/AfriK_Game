<template>
  <div class="home">
    <div class="play">
      <h3>Let's play!</h3>
    </div>
    <div>
      <b-img 
        v-bind="imgProps" :src="require('../assets/play.png')" 
        fluid alt="play_button" v-on:click="goToPlayers ()"></b-img>
    </div>
    <div class="play">
      <b-button v-b-modal.game-instructions size="lg" variant="outline-dark">Instructions</b-button>
    </div>
    <b-modal id="game-instructions" title="Instructions" centered hide-footer>
      <div style="padding: 10px; height: 75vh; overflow: scroll;">
        <ul>
          <li>This game is intended to be played by 6 (six) or more players. However, it could be played with only 4 (four).</li>
          <li>The game consists on 2 (two) teams trying to guess words, writen by the players itself.</li>
          <li>Teams take turns between its members, and then between teams, in 3 (three) different rounds.</li>
          <li>Start by pressing the play button at the center of the main screen.</li>
          <li>The next screen will ask you to insert the players' nicknames and its teams: BLACK or WHITE.</li>
          <li>Once the teams are already setup, at the next screen each one of the players will insert 3 (three) words, which will be used hereafter.</li> 
          <li><b-icon icon="exclamation-triangle"/><strong> Nobody should tell the others the words they used!</strong></li>
          <li><b-icon icon="exclamation-triangle"/><strong> Players must write single words (no space allowed) in the agreed idiom!</strong></li>
          <li class="ends">In possession of all words, it is time to begin guessing!</li>
          <li class="rounds"><b-icon icon="dice1"/><strong> FIRST ROUND <b-icon icon="dice6"/></strong></li>
          <li>The first player of WHITE read the first word and make a phrase so his teamates guess wich word he got.</li>
          <li><b-icon icon="exclamation-triangle"/><strong> Players must tell only one single phrase to guide their teamates!</strong></li>
          <li>If the team guesses correctly, another player read the second word and make a phrase as well, continuing the game.</li>
          <li>The first team has 1 (one) minute to guess as much words as they can. At the end of this time, it is BLACK team's round, which will repeat the process: read a word and tell a phrase that leads his teamates to guees the word gotten.</li>
          <li class="ends">The game continues until all words are gone. The team that guesses more words win the first round.</li>
          <li class="rounds"><b-icon icon="dice2"/><strong> SECOND ROUND <b-icon icon="dice5"/></strong></li>
          <li>The second round uses the same words and its basically equal to the first one, with two differences: phrases are not allowed anymore and the BLACK team start playing! </li>
          <li><b-icon icon="exclamation-triangle"/><strong> Players must tell only one single word to guide their teamates!</strong></li>
          <li>Players take turns with their teamates, during 1 (one) minute again, trying to get the biggest amount of words possible. The remaining ones are left to the other team, which will follow the same rules to guess the words.</li>
          <li class="ends">With all words finished one more time, the second round is over and the team that hit the nail on the head more times win this round.</li>
          <li class="rounds"><b-icon icon="dice3"/><strong> THIRD ROUND <b-icon icon="dice4"/></strong></li>
          <li>The third and final round begins and, at this time, the game is much more trickier: no more words, just mime instead!</li> 
          <li><b-icon icon="exclamation-triangle"/><strong> Players can't say anything!</strong></li>
          <li><b-icon icon="exclamation-triangle"/><strong> The team who won the second round starts the third!</strong></li>
          <li>As made in the two previous rounds, the players take turns inside their teams to guess the words in 1 (one) minute.</li>
          <li>At the end of third round the game is over and it is declared winner the team who won two or more rounds.</li>
        </ul>
      </div>
    </b-modal>
  </div>
</template>

<script>
/* eslint-disable no-new */
export default {
  name: 'home',
  data () {
    return {
      imgProps: {
        center: true,
        width: 200
      },
      msg: 'Welcome to Your Vue.js PWA'
    }
  },
  methods: {
    goToPlayers () {
      this.$router.push('/players')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.home{
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

.play{
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

#game-instructions ul{
  padding: 0;
  list-style-type: none;
}

#game-instructions li{
  border-bottom: 1px dashed rgba(200, 200, 200, 0.8);
  padding: 2.5% 0;
  text-align: justify;
}

#game-instructions .rounds {
  text-align: center;
  font-weight: 600;
}

#game-instructions .ends {
  border-bottom: 1px solid rgba(200, 200, 200, 0.95);
}
</style>
