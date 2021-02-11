<template>
  <div class="words">
    <div class="background-hold">
      <h3 class="main-color">Insert your words:</h3>
    </div>
    <div class="background-hold">
      <h4 class="main-color"><b-icon icon="person"/> {{ currentPlayer }}</h4>
    </div>
    <div class="background-hold-words">
      <div class="spacing">
        <b-form-input class="alignment" v-model="words[0]" size="sm" placeholder="Word 1"></b-form-input>
      </div>
      <div class="spacing">
        <b-form-input class="alignment" v-model="words[1]" size="sm" placeholder="Word 2"></b-form-input>
      </div>
      <div class="spacing">
        <b-form-input class="alignment" v-model="words[2]" size="sm" placeholder="Word 3"></b-form-input>
      </div>
    </div>
    <div class="background-hold">
      <b-button variant="outline-dark" v-on:click="checkWords ()">Next player <b-icon icon="arrow-right"/></b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'words',
  data () {
    return {
      players: [],
      currentPlayer: '',
      currentNumber: 0,
      words: ['', '', ''],
      allWords: []
    }
  },
  mounted () {
    let blackTeam = this.$session.get('Teams').black
    let whiteTeam = this.$session.get('Teams').white
    this.players = whiteTeam.concat(blackTeam)
    this.currentPlayer = this.players[this.currentNumber]
  },
  methods: {
    checkWords () {
      for (let i = 0; i < 3; i++) {
        let control = this.words[i] === ''
        if (control) {
          this.missingWords()
          return
        }
      }
      this.allWords = this.allWords.concat(this.words)
      this.words = ['', '', '']
      if (this.currentNumber < this.players.length - 1) {
        this.currentNumber++
        this.currentPlayer = this.players[this.currentNumber]
      } else this.goToGame()
    },
    missingWords (append = false) {
      this.$bvToast.toast('Fill all words before continue!', {
        title: 'Missing words',
        autoHideDelay: 3500,
        toaster: 'b-toaster-bottom-center',
        solid: true,
        variant: 'danger',
        appendToast: append
      })
    },
    goToGame () {
      this.$session.set('Words', this.allWords)
      this.$router.push('/game')
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.words{
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

.background-hold-words{
  background-color: #FFF; 
  border-radius: 10px; 
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px; 
  width: 80%; 
  margin: 0 auto; 
  padding: 3vh 2vh; 
  -webkit-box-shadow: 5px 5px #CCC; 
  box-shadow: 5px 5px #CCC;
}

.main-color{
  color: #343a40;
}

.spacing{
  margin: 0.75vh;
  width: 100%;
}

.alignment{
  text-align: center;
}

.container-column{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
