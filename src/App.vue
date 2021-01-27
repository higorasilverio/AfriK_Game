<template>
  <div id="app">
    <header>
      <h3>Afrik</h3>
      <h5>Are you ready to play?</h5>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <span>Developed by higorasilverio</span>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
body {
  background-image: url("assets/things_02.png");
  background-repeat: repeat;
  background-position: center;
  background-size: 100vh;
  background-color: #cccccc;
  height: 100%;
}

header {
  position: absolute;
  top: 0;
  height: 13vh;
  background-color: #000;
  color: #fff;
  -webkit-border-radius: 15px;
  -moz-border-radius: 15px;
  border-radius: 15px;
  width: 98%;
  margin: 1vh 1%;
  padding: 1vh 3vh;
}

main {
  position: absolute;
  height: 77vh;
  top: 14vh;
  background-color: rgba(255, 255, 255, 0.95);
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  margin: 1vh 5%;
  width: 90%;
}

footer {
  position: absolute;
  background-color: #fff;
  bottom: 0;
  -webkit-border-radius: 15px;
  -moz-border-radius: 15px;
  border-radius: 15px;
  width: 98%;
  margin: 1vh 1%;
  padding: 1vh 3vh;
}

</style>
