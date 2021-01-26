<template>
  <div id="app">
    <header>
      <span>AfriK</span>
    </header>
    <main>
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
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
}

header {
  height: 7vh;
  background: rgb(10,10,255);
  background: linear-gradient(90deg, rgba(10,10,255,1) 5%, rgba(170,170,255,1) 30%, rgba(170,170,255,1) 70%, rgba(10,10,255,1) 95%);
  border-bottom: 3px solid rgba(170,170,255,1);
  color: rgb(10,10,255);
  text-align: center;
}

header span {
  display: block;
  position: relative;
  font-size: 2rem;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
  font-weight: 600;
}
</style>
