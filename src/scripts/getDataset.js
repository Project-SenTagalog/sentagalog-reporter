import axios from "axios"

function getDataset(dgroup, experiment, classes, method, dataset) {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + "static/data/reports/" + 
                  dgroup + "/" + classes + "/" +  experiment + "/" + method + "/" + dataset + ".json") 
             .then(data => {
                 resolve(data.data);
             })
             .catch(error => {
                 resolve({})
             });
    })
}

export default getDataset