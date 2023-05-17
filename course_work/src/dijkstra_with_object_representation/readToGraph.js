const fs = require('fs');

exports.readToGraph = (filepath, startVertex = 0, targetVertex = 3)=> {
    let matrix;
    try {
    const data = fs.readFileSync(filepath, 'utf8');
    matrix = data.split("\n");
    console.log(matrix.length);
    } catch (err) {
    console.error(err);
    }
    let graph = {};

    for (let index = 0; index < matrix.length; index++) {
        const row = matrix[index];
        let weights = row.split("\t");
        let edges={};

        for (let i = 0; i < weights.length; i++) {
            if(weights[i] != 'Inf'){
                let currenEdgeDestination;
                if(i ==targetVertex){
                    currenEdgeDestination = 'finish';
                }
                else{
                    currenEdgeDestination = 'v' + i;
                }
                
                edges[currenEdgeDestination] = parseFloat(weights[i]);
            }
        }
        let currentVertex;
        if(index == startVertex || index ==targetVertex){
            currentVertex = index==startVertex? 'start' :'finish';
        }
        else{
            currentVertex = 'v' + index;
        }
        
        graph[currentVertex] = edges;
        
    }
    return graph;
};