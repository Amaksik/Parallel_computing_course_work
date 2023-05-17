const { Worker, isMainThread, workerData } = require('worker_threads');
const { divideGraph } = require('./divide-graph');


exports.dijkstra_parallel = (adjacencyMatrix, source, numWorkers) => {
  if (isMainThread) {
    const numWorkers = numWorkers;
    const dist = new Array(adjacencyMatrix.length).fill(Infinity);
    const visited = new Array(adjacencyMatrix.length).fill(false);
    const workers = [];

    // Розділяємо граф на частини
    let partions = divideGraph(adjacencyMatrix, numWorkers);

    // Функція обробки отриманих з воркерів даних
    function handleWorkerMessage(message) {
      dist[this.workerIndex] = message.dist;
      visited[this.workerIndex] = true;

      // запускаємо воркерів з новими фрагментами якщо ще є необроблені вершини
      const remainingWorkers = workers.filter((_, index) => !visited[index]);
      if (remainingWorkers.length > 0) {
        const nextPartition = remainingWorkers[0];
        const worker = new Worker(__filename, {
          workerData: nextPartition,
        });
        worker.on('message', handleWorkerMessage.bind(nextPartition.workerIndex));
        workers[nextPartition.workerIndex] = worker;
      } else {
        console.log('Dijkstra algorithm completed:', dist);
      }
    }

    // створюємо та запускаємо воркерів з початковими частинами
    for (let i = 0; i < partions.length; i++) {
      const worker = new Worker('./worker.js', {
        workerData: partions[i],
      });
      worker.on('message', processedPart=> handleWorkerMessage(processedPart));
      workers.push(worker);
    }
  } else {  }
};





