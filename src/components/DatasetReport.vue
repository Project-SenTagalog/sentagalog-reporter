<template>
    <div class="dataset-report page">
        <h4>Dataset Report</h4>
        <hr />
        <h5>Dataset Length</h5>
        <table>
            <table>
                <tr>
                    <th>Dataset</th>
                    <th>Length</th>
                </tr>
                <tr v-for="length, dataset in dataset_report.dataset_length">
                    <td>{{dataset}}</td>
                    <td>{{length}}</td>
                </tr>
            </table>
        </table>
        <hr />
        <h5>Dataset Tally</h5>
        <table>
            <table>
                <tr>
                    <th>Dataset</th>
                    <th>Negative</th>
                    <th>Neutral</th>
                    <th>Positive</th>
                    <th>Indeterminate</th>
                    <th>NNP</th>
                    <th>NP</th>
                </tr>
                <tr v-for="tally, dataset in dataset_report.dataset_tally">
                    <td>{{dataset}}</td>
                    <td>{{tally.negative}}</td>
                    <td>{{tally.neutral}}</td>
                    <td>{{tally.positive}}</td>
                    <td>{{tally.indeterminate}}</td>
                    <td>{{tally.negative + tally.neutral + tally.positive}}</td>
                    <td>{{tally.negative + tally.positive}}</td>
                </tr>
            </table>
        </table>
    </div>
</template>

<script>
    import axios from 'axios' 

    function getDatasetReport() {
        return new Promise((resolve, reject) => {
            axios.get(BASE_URL + "static/data/reports/dataset-report.json")
                 .then(function(data){
                    resolve(data.data)
                 })
        });
    }

    export default {
        data: () => {
            return {
                dataset_report : {}
            }
        },
        async mounted() {
           let data = await getDatasetReport();
           console.log(data)
           this.dataset_report = data;
        }
    }   
</script>