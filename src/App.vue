<template>
  <div class="app">
    <app-topbar />
    <router-view />
  </div>
</template>

<script>
  import AppTopbar from '@/components/sections/AppTopbar'
  export default {
    name: 'App',
    data : () => {
      return {
        dataset_get_state : window.state
      }
    },
    components : {
      AppTopbar
    }
  }
</script>

<style lang="scss">
  @import './assets/css/milligram.css';

  .app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin: 0 auto;
  }

  .page {
    width: 920px;
    margin: 0 auto;
    margin-top: 80px;
  }
 
</style>
