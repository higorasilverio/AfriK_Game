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
  font-size: 1.8em;
  color: #fff;
  text-shadow: 2px 2px #555;
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
  width: 20vh;
  margin: 0 auto;
}

button {
  width: 160px;
  height: 5vh;
  color: #fff;
  border-radius: 10px;
  background-color: transparent;
  background-repeat: no-repeat;
  box-shadow: 1px 1px 10px #555;
  text-shadow: 1px 1px #555;
  border-color: #fff;
  font-size: 1.4em;
  font-weight: 600;
  margin: 0 auto;
}

.play {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 80vh;
  background: rgb(10,10,255);
  background: linear-gradient(90deg, rgba(10,10,255,1) 5%, rgba(170,170,255,1) 30%, rgba(170,170,255,1) 70%, rgba(10,10,255,1) 95%);
}
</style>
