<template>
  <div class="play">
    <h2>Play</h2>
    <img src="@/assets/play.png" alt="play">
    <button>Instructions</button>
  </div>
</template>

<script>
export default {
  name: 'play',
  data () {
    return {
      msg: 'Welcome to Your Vue.js PWA'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h2 {
  font-weight: 600;
  font-size: 2em;
  color: rgb(10,10,255);
  margin: 0;
  padding: 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

img {
  width: 30%;
  margin: 0 auto;
}

button {
  width: 50%;
  height: 5vh;
  color: rgb(10,10,255);
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 auto;
}

.play {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 75%;
  background: rgb(10,10,255);
  background: linear-gradient(90deg, rgba(10,10,255,1) 5%, rgba(170,170,255,1) 30%, rgba(170,170,255,1) 70%, rgba(10,10,255,1) 95%);
}
</style>
