const { workerData, parentPort } = require('worker_threads')

// Тут, асинхронно виконуються основні обчислення



parentPort.postMessage({ hello: workerData })