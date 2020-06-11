<template>
    <div class="ttest page">
        <h4>T Test (Combinations)</h4>
        Please discard results from Experiment B. 
        <select  v-model="active_dataset" @change="getFoldGrid">
            <option v-for="val, key in data" >{{key}}</option>
        </select>
        
        <table>
            <tr>
                <th>
                    Fold
                </th>
                <th v-for="val, combination in data[active_dataset].combinations">
                    {{combination}}
                </th>
            </tr>
            <tr v-for="t_val, t_key in data[active_dataset].combinations[Object.keys(data[active_dataset].combinations)[0]]">
                <td>{{t_key}}</td>
                <td v-for="b_val, b_key in data[active_dataset].combinations">{{data[active_dataset].combinations[b_key][t_key].accuracy.toFixed(2)}}</td>
            </tr>
            <tr>
                <td>
                    Mean
                </td>
                <td v-for="b_val, b_key in fold_grid">{{average(fold_grid[b_key]).toFixed(2)}}</td>
            </tr>
            <tr>
                <td>
                    P-Value 
                </td>
                <td v-for="b_val, b_key in fold_grid">{{applyTTest(fold_grid[0], fold_grid[b_key]).toFixed(2)}}</td>
            </tr>
            <tr>
                <td>
                    Valid
                </td>
                <td v-for="b_val, b_key in fold_grid">{{!isValid(fold_grid[0], fold_grid[b_key])}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
    import combinations from '@/scripts/combinations'
    import getDataset from '@/scripts/getDataset' 
    import getAllDatasets from '@/scripts/getAllDatasets'
    import datasetUtils from '@/scripts/datasetUtils'
    import average from '@/scripts/average'
    import ttest from 'ttest'



    export default {
        data: () => {
            return {
                data : {},
                active_dataset: "main-dataset/experiment-A/positive-negative/CNB/A/",
                fold_grid : []
            }
        },
        methods: {
            async getFoldGrid() {
                let fold_grid = datasetUtils.getFoldGrid(this.data, this.active_dataset);
                console.log(fold_grid);
                this.fold_grid = fold_grid;
                console.log(fold_grid);
            },
            applyTTest(sampleA, sampleB) {
                return ttest(sampleA, sampleB, { mu: 0 }).pValue();
            },
            isValid(sampleA, sampleB) {
                return ttest(sampleA, sampleB, { mu: 0 }).valid();
            },
            getDatasetCallback(i) {
                
            },
            average
        },
        async mounted() {
            let data = await getAllDatasets(this.getDatasetCallback);
            this.data = window.state.datasets;
            this.getFoldGrid();
        }
    }
</script>