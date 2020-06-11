import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AppPortal',
      component: require('@/components/AppPortal.vue').default
    }, 
    {
      path: '/dataset-report', 
      name: 'DatasetReport', 
      component: require('@/components/DatasetReport.vue').default
    }, 
    {
      path: '/raw-report-viewer', 
      name: 'RawReportViewer', 
      component: require('@/components/RawReportViewer').default
    }, 
    {
      path: "/ttest-combinations", 
      name: "TTestCombinations", 
      component: require('@/components/TTestCombinations').default
    }, 
    {
      path: "/ttest-expc-methods", 
      name: "TTestExpCMethods", 
      component: require('@/components/TTestExpCMethods').default
    }, 
    {
      path: "/ttest-expa-expc", 
      name: "TTestExpAExpC", 
      component: require('@/components/TTestExpAExpC').default
    }
  ]
})
