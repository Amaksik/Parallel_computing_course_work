exports.divideGraph = (graph, numParts) => {
    const chunks = [];
    const nodes = Object.keys(graph);
    const chunkSize = Math.ceil(nodes.length / numParts);

    for (let i = 0; i < numParts; i++) {
        const start = i * chunkSize;
        const end = start + chunkSize;
        const chunk = {};

        for (let j = start; j < end; j++) {
            if (nodes[j]) {
                const node = nodes[j];
                chunk[node] = graph[node];
            }
        }
        for (let c = 0; c < start; c++) {
            if (nodes[c]) {
                const node = nodes[c];
                chunk[node] = {};
            }
        }
        for (let k = end; k < nodes.length; k++) {
            if (nodes[k]) {
                const node = nodes[k];
                chunk[node] = {};
            }
        }

        chunks.push(chunk);
    }

    return chunks;
    };
