const { workerData, parentPort } = require('worker_threads');

const computeNodeValue = (node, distances, minDistance) => {
  const outgoingEdges = Object.keys(distances[node]).reduce((acc, neighbor) => {
    if (distances[node][neighbor] < Infinity) {
      acc.push(distances[node][neighbor]);
    }
    return acc;
  }, []);
  const minOutgoingEdge = outgoingEdges.length > 0 ? Math.min(...outgoingEdges) : Infinity;
  return distances[node] + minOutgoingEdge;
};

const { nodes, distances, minDistance } = workerData;
const frontierNodes = [];

for (const node of nodes) {
  const nodeValue = computeNodeValue(node, distances, minDistance);
  if (nodeValue <= minDistance) {
    frontierNodes.push(node);
  }
}

parentPort.postMessage(frontierNodes);
