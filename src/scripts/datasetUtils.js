export default {
    getFoldGrid (all_data, data_path) {
        let report = all_data[data_path]; 
        let fold_grid = []
        for(let combination in report.combinations) {
           let combination_arr = [];
           for(let fold in report.combinations[combination]) {
               let accuracy = report.combinations[combination][fold].accuracy; 
               combination_arr.push(accuracy)
           }
           fold_grid.push(combination_arr);
        }
        return fold_grid;
    }
}