<template>
    <div class="raw-report-viewer page">
        <h4>Raw Report Viewer</h4>

        <DatasetSelector ref="dataset_selector" :combinations="combinations" @getData="getData" />

        <div class="viewer">
            <div v-if="loading_data">
                <h5>Loading Data...</h5>
            </div>
            <div v-else>
                <table>
                    <tr>
                        <td class="key">Dataset</td>
                        <td>{{report.dataset}}</td>
                    </tr>
                    <tr>
                        <td class="key">Original Dataset Length</td>
                        <td>{{report.original_data_length}}</td>
                    </tr>
                    <tr>
                        <td class="key">Filtered Dataset Length</td>
                        <td>{{report.filtered_data_length}}</td>
                    </tr>
                    <tr>
                        <td class="key">Balanced Dataset Length</td>
                        <td>{{report.balanced_data_length}}</td>
                    </tr>
                    <tr>
                        <td class="key">Samples per Class</td>
                        <td>{{report.balanced_data_length / report.target_labels.length }}</td>
                    </tr>
                    <tr>
                        <td class="key">Experiment Steps</td>
                        <td> 
                            <ul>
                                <li v-for="step in report.experiment_steps">{{step}}</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td class="key">Target Labels</td>
                        <td>
                            <ul>
                                <li v-for="label in report.target_labels">{{label}}</li>
                            </ul>
                        </td>
                    </tr>
                </table>
                <br /><br /><br />

                <h5>Summary</h5>
                <table>
                    <tr>
                        <th>Combination</th>
                        <th>Accuracy</th>
                        <th>Feature Size</th>
                    </tr>
                    <tr v-for="combination, key in report.summary">
                        <td>{{key}}</td>
                        <td>{{combination.acc.toFixed(5)}}</td>
                        <td>{{report.feature_size[key]}}</td>
                    </tr>
                </table>

                <h5>Per Fold Accuracy Report</h5>
                <table>
                    <tr>
                        <th>Fold</th>
                        <th v-for="val, key in report.combinations">{{key}}</th>
                    </tr>
                    <tr v-for="t_val, t_key in report.combinations[Object.keys(report.combinations)[0]]">
                        <td>{{t_key}}</td>
                        <td v-for="b_val, b_key in report.combinations">{{report.combinations[b_key][t_key].accuracy.toFixed(2)}}</td>
                    </tr>
                </table>

                <h5>Per Fold Confusion Matrix</h5>
                <table>
                    <tr>
                        <th>Fold</th>
                        <th v-for="val, key in report.combinations">{{key}}</th>
                    </tr>
                    <tr v-for="t_val, t_key in report.combinations[Object.keys(report.combinations)[0]]">
                        <td>{{t_key}}</td>
                        <td v-for="b_val, b_key in report.combinations">
                            <table>
                                <tr v-for="x in report.combinations[b_key][t_key].confusion_matrix">
                                    <td v-for="y in x">{{y}}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
                <!-- {{report}} -->
            </div>
            <br />
            <br />
        </div>
    </div>
</template>

<script>
    import DatasetSelector from '@/components/units/DatasetSelector'
    import combinations from '@/scripts/combinations'
    import getDataset from '@/scripts/getDataset'

    export default  {
        components: {
            DatasetSelector
        },
        data : () => {
            return {
                combinations, 
                loading_data: true,
                report : {}
            }
        },
        methods: {
            async getData() {
                this.loading_data = true
                let data = await getDataset(
                    this.$refs.dataset_selector.active_dgroup, 
                    this.$refs.dataset_selector.active_experiment, 
                    this.$refs.dataset_selector.active_classes, 
                    this.$refs.dataset_selector.active_method, 
                    this.$refs.dataset_selector.active_dataset
                )
                this.report = data
                console.log(this.report)
                this.loading_data = false
            }
        },
        mounted() {
            this.getData();
        }
    }
</script>

<style scoped>  
    table .key {
        width: 300px;
        font-weight: bold;
    }

</style>