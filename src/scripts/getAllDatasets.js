import combinations from '@/scripts/combinations'
import getDataset from '@/scripts/getDataset' 

let all = []

function tree_search(combinations, out) {
    for(let key in combinations) {
        out.push(key)
        if(typeof(combinations[key]) == "object" ) {
            tree_search(combinations[key], out);
            out.pop();
        } else  {
            console.log(out);
            let temp = []
            for(var i = 0; i < out.length; i++) {
                temp.push(out[i])
            }
            all.push(temp);
            console.log("END!!!")
            out = out.pop();
        }
    }
}

async function getAllDatasets() {
    console.log("Getting all datasets")
    tree_search(combinations.experiments, [])
    console.log(all);
    let data = {}
    for(let i = 0; i < all.length; i++) {
        console.log("Loading " + i + " of " + all.length + " datasets")
        data[all[i].join("/")] = await getDataset(all[i][0], all[i][1], all[i][2], all[i][3], all[i][4]);
    }
    return data;
}

export default getAllDatasets