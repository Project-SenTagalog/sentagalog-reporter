<template>
  <div class="app-portal page">
    <ul>
      <li><router-link to="dataset-report">Dataset Report</router-link></li>
      <li><router-link to="raw-report-viewer">Raw Report Viewer</router-link></li>
      <li><router-link to="ttest-combinations">T Test (Combinations)</router-link></li>
      <li><router-link to="ttest-expc-methods">T Test (Exp. C Methods)</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
    
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
