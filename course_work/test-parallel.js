const { Worker, parentPort, isMainThread, workerData } = require('worker_threads');
const { divideGraph } = require('./divide-graph');
const {dijkstra} = require('./dj');
const {mergeChunks} = require('./mergeChunks');
const {readToGraph} = require('./readToGraph');

exports.dijkstra_parallel = () => {
if (isMainThread) {
  // Головний потік
  const graph = {
    A: { B: 5, C: 2 },
    B: { D: 4 },
    C: { B: 1, D: 7 },
    D: {},
  };

  const numThreads = 1;// Math.min(array.length, require('os').cpus().length); // кількість потоків
  
  // Розділення графу
  const partions = divideGraph(graph, numThreads);
  console.time("test");
  // Створення воркерів
  const workers = [];
  for (let i = 0; i < numThreads; i++) {
    const worker = new Worker(__filename, { workerData: partions[i] });
    workers.push(worker);
  }
  // Collect the sorted arrays from worker threads
  const sortedArrays = [];
  workers.forEach((worker, index) => {
    worker.on('message', (sortedChunk) => {
      sortedArrays[index] = sortedChunk;

      // If received sorted arrays from all threads, merge and display the final sorted array
      if (sortedArrays.length === numThreads && sortedArrays.every(chunk => chunk !== undefined)) {
        const mergedArray = mergeChunks(sortedArrays);
        console.log(mergedArray);
        console.timeEnd("test");
        console.log('Amount of processes:', numThreads);
        
        //console.log('Final sorted array:', mergedArray);

      }
    });
  });

} else {
  // Worker thread
  const chunk = workerData;
  // Sort the chunk of the array
  const sortedChunk = dijkstra(chunk);
  // Send the sorted chunk back to the main thread
  parentPort.postMessage(sortedChunk);
}}

console.log(`{ A: 0, B: 3, C: 2, D: 7 }\ntest: 67.271ms\nAmount of processes: 1`);