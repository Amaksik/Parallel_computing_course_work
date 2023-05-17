exports.divideGraph = (graph, numParts) => {
    const chunks = [];
    let start = 0;
    let chunk = graph[0].length / numParts;
    const leftover = Math.ceil(nodes.length / numParts);

    for (let i = 0; i < numParts; i++) {
        start = end;
        end += chunk;
        if(leftover > 0){
            end++;
            leftover--;
        };
        //створюємо об'єкт, що містить копію графу та вказівники на ту частину яку варто обробити воркеру
        let partion = {
            start: start,
            end: end,
            graph: graph
        };  
        chunks.push(partion);
    }
    return chunks;
};
