const { Worker } = require('worker_threads');
var os = require('os');

const parallelDijkstra = (graph, startNode) => {
  return new Promise((resolve, reject) => {
    const distances = {};
    const unsettled = [];
    const settled = [];

    // Initialize distances
    for (const node in graph) {
      distances[node] = Infinity;
    }

    // Set distance of the start node to 0
    distances[startNode] = 0;
    unsettled.push(startNode);

    const numWorkers = Math.min(os.cpus().length, unsettled.length);
    let workersCompleted = 0;
    let minDistance = Infinity;
    let frontierNodes = [];

    const workerCallback = (result) => {
      frontierNodes.push(...result);

      workersCompleted++;
      if (workersCompleted === numWorkers) {
        settleFrontierNodes();
      }
    };

    const settleFrontierNodes = () => {
      for (const node of frontierNodes) {
        unsettled.splice(unsettled.indexOf(node), 1);
        settled.push(node);

        for (const neighbor in graph[node]) {
          const totalDistance = distances[node] + graph[node][neighbor];

          if (totalDistance < distances[neighbor]) {
            distances[neighbor] = totalDistance;
            if (!unsettled.includes(neighbor) && !settled.includes(neighbor)) {
              unsettled.push(neighbor);
            }
          }
        }
      }

      if (unsettled.length > 0) {
        calculateMinimumDistance();
        computeFrontierNodes();
      } else {
        resolve(distances);
      }
    };

    const calculateMinimumDistance = () => {
      minDistance = Infinity;
      for (const node of unsettled) {
        if (distances[node] < minDistance) {
          minDistance = distances[node];
        }
      }
    };

    const computeFrontierNodes = () => {
      frontierNodes = [];
      const nodesPerWorker = Math.ceil(unsettled.length / numWorkers);

      for (let i = 0; i < numWorkers; i++) {
        const start = i * nodesPerWorker;
        const end = Math.min((i + 1) * nodesPerWorker, unsettled.length);
        const workerData = {
          nodes: unsettled.slice(start, end),
          distances,
          minDistance,
        };

        const worker = new Worker('./worker.js', { workerData });
        worker.on('message', workerCallback);
        worker.on('error', reject);
        worker.on('exit', (code) => {
          if (code !== 0) {
            reject(new Error(`Worker stopped with exit code ${code}`));
          }
        });
      }
    };

    calculateMinimumDistance();
    computeFrontierNodes();
  });
};

module.exports = parallelDijkstra;