<template>
  <div id="app">
    <header>
      <b-card bg-variant="dark" text-variant="white" title="AfriK">
        <b-card-text>
          Are you ready to play?
        </b-card-text>
      </b-card>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <b-card bg-variant="white" text-variant="dark" style="padding: 0 !important;">
        <b-card-text>
          Developed by higorasilverio
        </b-card-text>
      </b-card>
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
  background-repeat: no-repeat;
  background-position: center;
  background-color: #cccccc;
}

footer {
  position: absolute;
  background-color: #fff;
  width: 100%;
  bottom: 0;
  border-radius: 10px;
}

footer .card-body {
  padding: 2%;
  border-radius: 10px;
}
</style>
