<template>
  <div id="app">
    <header>
      <h3>AfriK</h3>
      <h6>Are you ready to be creative?</h6>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <span class="main-color">Developed by higorasilverio</span><span><b-icon icon="suit-club-fill"/></span>
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
  background-size: 110vh;
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
  height: 77vh;
  background-color: rgba(255, 255, 255, 0.95);
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  margin: 1vh 5%;
  width: 90%;
}

#app footer {
  background-color: #fff;
  -webkit-border-radius: 15px;
  -moz-border-radius: 15px;
  border-radius: 15px;
  width: 98%;
  margin: 1vh 1%;
  padding: 1vh 3vh;
  display: flex;
  flex: row;
  justify-content: space-between;
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
