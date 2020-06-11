<template>
    <div class="ttest-expc-methods page">
        <h4>T Test (Exp A - Exp C)</h4>
        Select dataset group to compare
        <select v-model="target_dataset" @change="reload">
            <option>main-dataset</option>
        </select>
        Select base classifier to Compare
        <select v-model="target_classifier" @change="reload">
            <option>CNB</option>
            <option>MNB</option>
            <option>MLP</option>
        </select>
        Select classes
        <select v-model="target_classes" @change="reload">
            <option>positive-negative</option>
            <option>with-neutral</option>
        </select>
        Select comparison method
        <select v-model="target_comp_method" @change="reload">
            <option>proba</option>
            <option>log_proba</option>
            <option>log_proba-mean-normalized</option>
        </select>
        
        <h3>P-Value and Accuracy Increase</h3>
        (<b>Note:</b> Datasets are of different sizes)
        <table>
            <tr v-for="val, key in getFoldGridsBase()">
                <td>{{key}} <br /> {{base_data[target_classes][key]["balanced_data_length"]}}</td>
                <td v-for="fold, index in val" >
                    <span :class="{'allowed' : applyTTest(fold, getFoldGridsExpC()[key][index]).toFixed(5) < 0.05}">
                        {{applyTTest(fold, getFoldGridsExpC()[key][index]).toFixed(5)}} 
                    </span> 
                    <br /><br />
                    ({{( average( getFoldGridsExpC()[key][index]) - average(fold)).toFixed(3) }})   
                </td>
            </tr>
        </table>

    </div>
</template>

<style>
    .allowed {
        background-color: green;
        color: white;
        font-weight: bold;
        padding: 10px;
    }
</style>
<script>
    import combinations from '@/scripts/combinations'
    import getDataset from '@/scripts/getDataset' 
    import getAllDatasets from '@/scripts/getAllDatasets'
    import datasetUtils from '@/scripts/datasetUtils'
    import ttest from 'ttest'
    import average from '@/scripts/average'
    import getFoldGrid from '@/scripts/getFoldGrid'
    

    export default {
        data : () => {
            return {
                target_dataset: "main-dataset",
                target_classifier: "MLP",
                target_classes: "with-neutral",
                base_data : {},
                exp_c_data : {},
                datasets: [],
                target_comp_method: "proba"
            }
        },
        methods: {
            average: average,
            async load_by_dataset()  {
                this.reload()
            },
            async load_by_classifier() {
                this.reload()
            },
            async reload() {
                let self = this
                let target_classifier = this.target_classifier 
                let dgroup = this.target_dataset 
                let experiment = "experiment-A"
                let method = target_classifier

                for(var target_classes in combinations.experiments[dgroup][experiment]) {
                    let method_object = combinations.experiments[dgroup][experiment][target_classes][method]
                    this.$set(this.base_data, target_classes, {})
                    for(var dataset in method_object) {
                        if(this.datasets.indexOf(dataset) == -1)
                            this.datasets.push(dataset)
                        let data = await getDataset(dgroup, experiment, target_classes, method, dataset)
                        this.$set(this.base_data[target_classes], dataset, data)
                    }
                }

            },
            getFoldGrid(report) {
                let grid = []
                for(let combination in report.combinations) {
                    let accuracies = [] 
                    for(let fold in report.combinations[combination]) {
                        let acc_score = report.combinations[combination][fold]["accuracy"]
                        accuracies.push(acc_score)
                    }
                    grid.push(accuracies) 
                }
                return grid
            },
            getFoldGridsBase() {
                let fold_grids = {}
                for(var i = 0; i < this.datasets.length; i++) {
                    let dataset = this.datasets[i]; 
                    let fold_grid = this.getFoldGrid(this.base_data[this.target_classes][dataset])
                    fold_grids[dataset] = fold_grid
                }
                return fold_grids
            },
            getFoldGridsExpC() {
                let fold_grids = {}
                for(var i = 0; i < this.datasets.length; i++) {
                    let dataset = this.datasets[i]; 
                    let report = this.exp_c_data[this.target_classes][this.target_comp_method][dataset]
                    let fold_grid = this.getFoldGrid(report)
                    fold_grids[dataset] = fold_grid
                }
                return fold_grids
            },
            
            applyTTest(sampleA, sampleB) {
                return ttest(sampleA, sampleB, { mu: 0 }).pValue();
            },
            async load_exp_c_data() {
                let self = this
                let target_classifier = this.target_classifier 
                let dgroup = this.target_dataset 
                let experiment = "experiment-C"
                
                for(let target_classes in combinations.experiments[dgroup][experiment]) {
                    let classes_obj = combinations.experiments[dgroup][experiment][target_classes]
                    this.$set(this.exp_c_data, target_classes, {}); 
                    for(let method in classes_obj) {
                        let method_obj = classes_obj[method]
                        this.$set(this.exp_c_data[target_classes], method, {});
                        for(let dataset in method_obj) {
                            let data = await getDataset(dgroup, experiment, target_classes, method, dataset)
                            this.$set(this.exp_c_data[target_classes][method], dataset, data)
                        }
                    }
                }
            }
        },
        mounted() {
            this.reload()
            this.load_exp_c_data()
        }
    }
</script>