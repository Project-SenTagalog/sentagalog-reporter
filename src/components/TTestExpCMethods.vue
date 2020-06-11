<template>
    <div class="ttest-expc-methods page">
        <h4>T Test (Exp C - Methods)</h4>

        Select a Dataset Group, Target Classes, and a Dataset to Start:
        <table> 
            <tr>
                <th>Dataset Group</th>
                <th>Classes</th>
                <th>Dataset </th>
            </tr>
            <tr>
                <td>
                    <select v-model="active_dataset_group" @change="changeActive">
                        <option v-for="dataset in Object.keys(combinations.experiments)">{{dataset}}</option>
                    </select>
                </td> 
                <td>
                    <select v-model="active_classes" @change="changeActive">
                        <option v-for="dataset in Object.keys(combinations.experiments[active_dataset_group]['experiment-A'])">{{dataset}}</option>
                    </select>
                </td>
                <td>
                    <select v-model="active_dataset" @change="changeActive">
                        <option v-for="dataset in Object.keys(combinations.experiments[active_dataset_group]['experiment-A']['positive-negative']['CNB'])">{{dataset}}</option>
                    </select>
                </td>
            </tr>
        </table>

        Collapse per-fold accuracy: <input type="checkbox" v-model="collapse_folds" />
        
        <div class="combinations">
            <div v-for="val, combination in reports['proba'].combinations">
                <h5>For {{combination}}</h5>
                <table>
                    <tr>
                        <th>Fold</th>
                        <th v-for="a_val, a_key in reports">{{a_key}}</th>
                    </tr>
                    <tr v-if="!collapse_folds" v-for="b_val, b_key in reports['proba'].combinations['[0, 0, 0]']">
                        <td>{{b_key}}</td>
                        <td v-for="a_val, a_key in reports">{{reports[a_key].combinations[combination][b_key].accuracy.toFixed(2)}}</td>
                    </tr>
                    <tr>
                        <td>Average</td>
                        <td v-for="a_val, a_key in reports">{{average(getAccuracyScores(reports, a_key, combination)).toFixed(2)}}</td>
                    </tr>
                    <tr>
                        <td>P-Value</td>
                        <td v-for="a_val, a_key in reports">{{applyTTest(getAccuracyScores(reports, 'proba', combination), getAccuracyScores(reports, a_key, combination))}}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import combinations from '@/scripts/combinations'
    import getDataset from '@/scripts/getDataset' 
    import getAllDatasets from '@/scripts/getAllDatasets'
    import datasetUtils from '@/scripts/datasetUtils'
    import ttest from 'ttest'
    import average from '@/scripts/average'

    function getAccuracyScores(reports, method, combination) {
        let report = reports[method]
        console.log(report)
        let scores = []
        for(let fold in combinations[combination]) {
            scores.push(combinations[combination][fold].accuracy);
        }
        return scores
    }

    export default {
        data: () => {
            return {
                combinations,
                data : {},
                active_classes: "positive-negative",
                active_dataset_group : "main-dataset",
                active_dataset : "A",
                reports: {},
                collapse_folds: false
            }
        },
        methods: {
            async changeActive() {
                let methods = ["proba", "log_proba", "log_proba-mean-normalized"]; 
                let reports = {} 
                for(let method in methods) {
                    let method_ = methods[method];
                    reports[method_] = await getDataset(this.active_dataset_group, "experiment-C", this.active_classes, method_, this.active_dataset);
                }
                this.reports = reports;
            },
            applyTTest(sampleA, sampleB) {
                return ttest(sampleA, sampleB, { mu: 0 }).pValue();
            },
            isValid(sampleA, sampleB) {
                return ttest(sampleA, sampleB, { mu: 0 }).valid();
            },
            average,
            getAccuracyScores
        },
        async mounted() {
            this.changeActive();
        }
    }
</script>