<template>
    <div class="dataset-selector">
        <table>
            <tr>
                <th>Dataset Group</th>
                <th>Experiment</th>
                <th>Classes</th>
                <th>Classifier/Method</th>
                <th>Dataset</th>
            </tr>
            <tr>
                <!--Dataset-->
                <td>
                    <select v-model="active_dgroup" @change="getData">
                        <option v-for="val, dgroup in combinations.experiments">{{dgroup}}</option>
                    </select>
                </td>
                <!--Experiment-->
                <td>
                    <select v-model="active_experiment" @change="getData">
                        <option v-for="val, experiment in combinations.experiments[active_dgroup]">{{experiment}}</option>
                    </select>
                </td>
                <!--Classes-->
                <td>
                    <select v-model="active_classes" @change="getData">
                        <option v-for="val, classes in 
                            combinations.experiments[active_dgroup][active_experiment]">
                            {{classes}}
                        </option>
                    </select>
                </td>
                <!--Classifier/Method-->
                <td>
                    <select v-model="active_method" @change="getData">
                        <option v-for="val, method in 
                            combinations.experiments[active_dgroup][active_experiment][active_classes]">
                            {{method}}
                        </option>
                    </select>
                </td>
                <!--Dataset-->
                <td>
                    <select v-model="active_dataset" @change="getData">
                        <option v-for="val, dataset in 
                            combinations.experiments[active_dgroup][active_experiment][active_classes][active_method]">
                            {{dataset}}
                        </option>
                    </select>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        props: ["combinations"],
        data: () => {
           return {
                active_dgroup: "main-dataset",
                active_experiment: "experiment-A",
                active_classes: "positive-negative",
                active_method: "CNB",
                active_dataset: "A",
           }
        },
        methods: {
            getData() {
                this.$emit('getData');
            }
        }
    }
</script>