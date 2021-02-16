<template>
  <div id="app">
    <header v-if="$store.state.actualPage">
      <h3>AfriK</h3>
      <div style="display: flex; flex-direction: row; justify-content: space-between;">
        <span>Developed by higorasilverio</span>
        <span><b-icon icon="suit-club-fill"/></span>
      </div>
    </header>
    <main v-bind:class="[$store.state.actualPage ? 'littleMain' : 'bigMain']">
      <router-view></router-view>
    </main>
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
  background-color: #cccccc;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

#app header {
  height: 13vh;
  background-color: #343a40;
  color: #fff;
  -webkit-border-radius: 15px;
  -moz-border-radius: 15px;
  border-radius: 15px;
  width: 98%;
  margin: 1vh 1%;
  padding: 1vh 3vh;
  overflow: hidden;
}

#app main {
  background-color: rgba(255, 255, 255, 0.95);
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  margin: 2vh 2vw;
  width: 96vw;
}

.littleMain {
  height: 75vh;
}

.bigMain {
  height: 96vh;
}

#app h3, #app h6{
  margin: 0;
  padding: 0;
  padding-bottom: 1vh;
}

.main-color{
  color: #343a40;
}
</style>
